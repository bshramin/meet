import { getContract, decodeEventLog, parseEther, Address } from "viem";
import { getAccount, publicClient, walletClient } from "./client";
import paymentProcessorABI from "./paymentProcessorABI";

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const contract = getContract({
  address: contractAddress as Address,
  abi: paymentProcessorABI,
  client: { public: publicClient, wallet: walletClient },
});

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

function watchAndExecute(orderId: string, f: () => void) {
  contract.watchEvent.OrderPaid({
    onLogs(logs) {
      for (const log of logs) {
        // Decode the event log using viem's decodeEventLog function.
        const decoded = decodeEventLog({
          abi: paymentProcessorABI,
          data: log.data,
          topics: log.topics,
          eventName: "OrderPaid",
        });

        const args = decoded.args as unknown as IOrderPaidEventArgs;
        // Check if the decoded orderId matches the one we're looking for.
        if (args.orderId === orderId) {
          console.log("Matching OrderPaid event received:", decoded);
          f();
        }
      }
    },
  });
}

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

export { payOrder, watchAndExecute };
