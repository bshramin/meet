import { getContract, Address } from "viem";
import { getAccount, publicClient, walletClient } from "./client";
import counterAbi from "./counterABI";

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const contract = getContract({
  address: contractAddress as Address,
  abi: counterAbi,
  client: { public: publicClient, wallet: walletClient },
});

contract.watchEvent.CounterIncreased({
  onLogs(logs) {
    console.log("Watch event received:", logs);
  },
});

function getCount() {
  return contract.read.getCount();
}

async function increment() {
  const account = await getAccount();
  return contract.write.increment([], { account });
}

export { getCount, increment };
