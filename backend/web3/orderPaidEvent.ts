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
import { MerchantAttributes } from "../models/merchant.ts";
import { PaymentAttributes } from "../models/payment.ts";

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
  const payment = (await createPaymentRecord(event)) as PaymentAttributes;
  const order = (await getOrderByOrderId(payment.orderId)) as OrderAttributes;
  const merchant = (await getMerchantById(
    order.merchantId
  )) as MerchantAttributes;
  if (order) {
    const thirtyMinutesInMs = 30 * 60 * 1000;
    const orderAge = Date.now() - order.createdAt.getTime();
    if (orderAge > thirtyMinutesInMs) {
      console.error(
        `Order ${order.id} is older than 30 minutes. Payment rejected.`
      );
      return;
    }
    if (
      order.totalAmountEth == payment.amount &&
      payment.recipient == merchant.wallet &&
      merchant.percentage == payment.merchantPercentage
    ) {
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
