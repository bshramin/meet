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

// Type for the logs parameter in the onLogs callback
type IOrderPaidEvents = IOrderPaidEvent[];

function handleOrderPaidEvent(event: IOrderPaidEvent) {
  console.log("OrderPaid event received:", event);
}

export { handleOrderPaidEvent };

export type { IOrderPaidEvents, IOrderPaidEvent, IOrderPaidEventArgs };
