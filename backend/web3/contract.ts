import { getContract } from "viem";
import type { Address } from "viem";
import { publicClient } from "./client.ts";
import paymentProcessorABI from "./paymentProcessorABI.ts";

const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = getContract({
  address: contractAddress as Address,
  abi: paymentProcessorABI,
  client: { public: publicClient },
});

type IOrderPaidArgs = {
  payer: string;
  amount: bigint;
  orderId: string;
  recipient: string;
  recipientAmount: bigint;
  owner: string;
  ownerAmount: bigint;
  merchantPercentage: bigint;
};

type IOrderPaidLog = {
  eventName: "OrderPaid";
  args: IOrderPaidArgs;
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

// Type for the logs parameter in the onLogs callback
type IOrderPaidLogs = IOrderPaidLog[];

export { contract };

export type { IOrderPaidLogs, IOrderPaidLog, IOrderPaidArgs };
