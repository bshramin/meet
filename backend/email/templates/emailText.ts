import { formatEthAmount } from "./format.ts";

export function getOrderPaidCustomerEmailText(
  orderId: string,
  amountEth: string,
  amountUsd: string
): string {
  return `Order Payment Confirmed

Order ID: ${orderId}
Amount: ${formatEthAmount(amountEth)} ETH (${amountUsd} USD)

Thank you for your payment! Your order has been successfully processed.`;
}

export function getOrderPaidMerchantEmailText(
  orderId: string,
  customerEmail: string,
  amountEth: string,
  amountUsd: string
): string {
  return `New Order Payment Received

Order ID: ${orderId}
Customer Email: ${customerEmail}
Amount: ${formatEthAmount(amountEth)} ETH (${amountUsd} USD)

A new order has been paid for and is ready for processing.`;
}

export function getOrderPaidAdminEmailText(
  orderId: string,
  customerEmail: string,
  merchantId: string,
  amountEth: string,
  amountUsd: string
): string {
  return `New Order Payment Processed

Order ID: ${orderId}
Customer Email: ${customerEmail}
Merchant ID: ${merchantId}
Amount: ${formatEthAmount(amountEth)} ETH (${amountUsd} USD)`;
}
