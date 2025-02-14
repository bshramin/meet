import { getContract, parseEther, Address } from "viem";
import { getAccount, publicClient, walletClient } from "./client";
import paymentProcessorABI from "./paymentProcessorABI";

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const contract = getContract({
  address: contractAddress as Address,
  abi: paymentProcessorABI,
  client: { public: publicClient, wallet: walletClient },
});

contract.watchEvent.OrderPaid({
  onLogs(logs) {
    console.log("OrderPaid event received:", logs);
  },
});

async function payOrder(
  merchantWallet: string,
  orderID: string,
  orderTotalAmount: number,
  merchantPercentage: number
) {
  const account = await getAccount();

  // Convert the order amount to wei (assuming orderTotalAmount is in ETH)
  const amountInWei = parseEther(orderTotalAmount.toString());
  console.log("amountInWei", amountInWei);
  return contract.write.payOrder(
    [merchantWallet, orderID, merchantPercentage],
    {
      account,
      value: amountInWei,
    }
  );
}

export { payOrder };
