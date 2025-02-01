import { createPublicClient, http } from "viem";
import { mainnet, sepolia } from "viem/chains";

const RPC_URL = process.env.NEXT_PUBLIC_BLOCKCHAIN_RPC_URL;
const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID;
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

const client = createPublicClient({
  chain: CHAIN_ID === "1" ? mainnet : sepolia,
  transport: http(RPC_URL),
});

const blockNumber = Number(await client.getBlockNumber());

export { blockNumber, RPC_URL, CHAIN_ID, CONTRACT_ADDRESS };
