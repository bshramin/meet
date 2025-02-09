import { getContract, Address } from "viem";
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
  merchantPercentage: number
) {
  const account = await getAccount();
  return contract.write.payOrder(
    [merchantWallet, orderID, merchantPercentage],
    { account }
  );
}

export { payOrder };
