import { formatEthAmount } from "./format.ts";

export const orderPaidAdminTemplate = (
  orderId: string,
  customerEmail: string,
  merchantId: string,
  amountEth: string,
  amountUsd: string
) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body>
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
    <h2 style="color: #2c3e50; text-align: center;">New Order Payment Processed</h2>
    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 4px; margin: 15px 0;">
      <p style="margin: 5px 0;">Order ID: <strong>${orderId}</strong></p>
      <p style="margin: 5px 0;">Customer Email: <strong>${customerEmail}</strong></p>
      <p style="margin: 5px 0;">Merchant ID: <strong>${merchantId}</strong></p>
      <p style="margin: 5px 0;">Amount: <strong>${formatEthAmount(
        amountEth
      )} ETH (${amountUsd} USD)</strong></p>
    </div>
    <p style="color: #2c3e50; line-height: 1.6;">A new order payment has been processed successfully.</p>
    <div style="text-align: center; margin-top: 20px;">
      <p style="color: #7f8c8d; font-size: 0.9em;">This is an automated notification for administrative purposes.</p>
    </div>
  </div>
</body>
</html>
`;
