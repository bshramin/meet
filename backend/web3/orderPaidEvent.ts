import { sendEmail } from "../email/index.ts";
import { getMerchantById } from "../repository/merchants.ts";
import { getOrderByOrderId, updateOrderStatus } from "../repository/orders.ts";
import { createPaymentRecord } from "../repository/payments.ts";

type IOrderPaidEventArgs = {
  payer: string;
  amount: bigint;
  orderId: string;
  recipient: string;
  recipientAmount: bigint;
  owner: string;
  ownerAmount: bigint;
  merchantPercentage: bigint;
};

type IOrderPaidEvent = {
  eventName: "OrderPaid";
  args: IOrderPaidEventArgs;
  address: string;
  topics: string[];
  data: string;
  blockNumber: bigint;
  transactionHash: string;
  transactionIndex: number;
  blockHash: string;
  logIndex: number;
  removed: boolean;
};

export async function handleOrderPaidEvent(event: IOrderPaidEvent) {
  const payment = await createPaymentRecord(event);
  const order = await getOrderByOrderId(payment.orderId);
  if (order) {
    if (order.totalAmountEth === payment.amount) {
      updateOrderStatus(order.id, "paid");
      sendEmail(
        order.emailAddress,
        "Order Paid",
        `Your order with id ${order.id} has been paid for.`
      );
      const merchant = await getMerchantById(order.merchantId);
      if (merchant) {
        sendEmail(
          merchant.email,
          "Confirmed Order",
          `An order by ${order.email} with id ${order.id} has been paid for.` // TODO: Add order details, product, and quantity
        );
      } else {
        console.error(
          `Merchant not found for order: ${order.id} and sending email to merchant failed`
        );
      }
    }
  } else {
    console.error(`Order not found for payment: ${payment.id}`);
  }
}

// Type for the logs parameter in the onLogs callback
type IOrderPaidEvents = IOrderPaidEvent[];

export type { IOrderPaidEvents, IOrderPaidEvent, IOrderPaidEventArgs };
