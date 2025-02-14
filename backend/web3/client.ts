import { createPublicClient, http } from "viem";
import type { PublicClient } from "viem";
import { mainnet, sepolia } from "viem/chains";

const CHAIN_ID = process.env.CHAIN_ID;

// Initialize Viem client
const publicClient: PublicClient = createPublicClient({
  chain: CHAIN_ID === "1" ? mainnet : sepolia,
  transport: http(), // TODO: modify to custom?
});

export { publicClient, CHAIN_ID };
