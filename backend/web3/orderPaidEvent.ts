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
    }
  } else {
    console.error(`Order not found for payment: ${payment.id}`);
  }
}

// Type for the logs parameter in the onLogs callback
type IOrderPaidEvents = IOrderPaidEvent[];

export type { IOrderPaidEvents, IOrderPaidEvent, IOrderPaidEventArgs };
