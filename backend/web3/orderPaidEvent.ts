import { sendEmail } from "../email/index.ts";
import { getMerchantById } from "../repository/merchants.ts";
import { getOrderByOrderId, updateOrderStatus } from "../repository/orders.ts";
import { createPaymentRecord } from "../repository/payments.ts";
import { orderPaidCustomerTemplate } from "../email/templates/orderPaidCustomer.ts";
import { orderPaidMerchantTemplate } from "../email/templates/orderPaidMerchant.ts";
import { orderPaidAdminTemplate } from "../email/templates/orderPaidAdmin.ts";
import {
  getOrderPaidCustomerEmailText,
  getOrderPaidMerchantEmailText,
  getOrderPaidAdminEmailText,
} from "../email/templates/emailText.ts";
import type { OrderAttributes } from "../models/order.ts";

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
  const order = (await getOrderByOrderId(payment.orderId)) as OrderAttributes;
  if (order) {
    if (order.totalAmountEth === payment.amount) {
      updateOrderStatus(order.id, "paid");
      const shortOrderId = order.id.split("-")[0];
      const shorMerchantId = order.merchantId.split("-")[0];
      sendEmail(
        order.emailAddress,
        "Order Paid",
        getOrderPaidCustomerEmailText(
          shortOrderId,
          order.totalAmountEth.toString(),
          order.totalAmountUsd.toString()
        ),
        orderPaidCustomerTemplate(
          shortOrderId,
          order.totalAmountEth.toString(),
          order.totalAmountUsd.toString()
        )
      );
      const merchant = await getMerchantById(order.merchantId);
      if (merchant) {
        sendEmail(
          merchant.email,
          "New Order Confirmed",
          getOrderPaidMerchantEmailText(
            shortOrderId,
            order.emailAddress,
            order.totalAmountEth.toString(),
            order.totalAmountUsd.toString()
          ),
          orderPaidMerchantTemplate(
            shortOrderId,
            order.emailAddress,
            order.totalAmountEth.toString(),
            order.totalAmountUsd.toString()
          )
        );
      } else {
        console.error(
          `Merchant not found for order: ${shortOrderId} and sending email to merchant failed`
        );
      }

      // Send admin notification
      const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "contact@bashiri.info";
      sendEmail(
        ADMIN_EMAIL,
        "Order Payment Processed",
        getOrderPaidAdminEmailText(
          shortOrderId,
          order.emailAddress,
          shorMerchantId,
          order.totalAmountEth.toString(),
          order.totalAmountUsd.toString()
        ),
        orderPaidAdminTemplate(
          shortOrderId,
          order.emailAddress,
          shorMerchantId,
          order.totalAmountEth.toString(),
          order.totalAmountUsd.toString()
        )
      );
    }
  } else {
    console.error(`Order not found for payment: ${payment.id}`);
  }
}

// Type for the logs parameter in the onLogs callback
type IOrderPaidEvents = IOrderPaidEvent[];

export type { IOrderPaidEvents, IOrderPaidEvent, IOrderPaidEventArgs };
