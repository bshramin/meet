import { Payment } from "../models/index.ts"; // adjust the path as needed
import type { PaymentAttributes } from "../models/payment.ts";
import type { IOrderPaidEvent } from "../web3/orderPaidEvent.ts";
import { formatUnits } from "viem";

export async function createPaymentRecord(
  event: IOrderPaidEvent
): Promise<PaymentAttributes> {
  let {
    address,
    blockNumber,
    transactionHash,
    transactionIndex,
    blockHash,
    logIndex,
    args: {
      payer,
      amount,
      orderId,
      recipient,
      recipientAmount,
      owner,
      ownerAmount,
      merchantPercentage,
    },
  } = event;

  // convert wei to eth
  const amountEth = formatUnits(amount, 18);
  const recipientAmountEth = formatUnits(recipientAmount, 18);
  const ownerAmountEth = formatUnits(ownerAmount, 18);

  try {
    const payment = await Payment.create({
      contractAddress: address,
      blockNumber: blockNumber,
      transactionHash: transactionHash,
      transactionIndex: transactionIndex,
      blockHash: blockHash,
      logIndex: logIndex,
      payer: payer,
      amount: amountEth,
      orderId: orderId,
      recipient: recipient,
      recipientAmount: recipientAmountEth,
      owner: owner,
      ownerAmount: ownerAmountEth,
      merchantPercentage: Number(merchantPercentage),
    });
    return payment.toJSON();
  } catch (error) {
    console.error("Error creating Payment record:", error);
    throw error;
  }
}
