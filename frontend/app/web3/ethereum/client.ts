import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

const client = createPublicClient({
  chain: mainnet,
  transport: http(), // TODO: Add the RPC URL from env
});

const blockNumber = Number(await client.getBlockNumber());

export default blockNumber;
