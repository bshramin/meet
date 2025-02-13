import { createPublicClient, http } from "viem";
import type { PublicClient } from "viem";
import { mainnet } from "viem/chains";

// Types and interfaces
type ChainlinkResponse = [
  roundId: bigint,
  answer: bigint,
  startedAt: bigint,
  updatedAt: bigint,
  answeredInRound: bigint
];

// Initialize Viem client
const client: PublicClient = createPublicClient({
  chain: mainnet,
  transport: http(), // TODO: modify to custom?
});

// Constants
const CHAINLINK_ETH_USD_FEED: `0x${string}` =
  "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419";
const PRICE_BUFFER_PERCENTAGE: number = 1.5;
const CACHE_DURATION: number = 30 * 1000; // 30 seconds

// Cache variables
let cachedPrice: number | null = null;
let lastFetchTime: number = 0;

const chainlinkAbi = [
  {
    inputs: [],
    name: "latestRoundData",
    outputs: [
      { name: "roundId", type: "uint80" },
      { name: "answer", type: "int256" },
      { name: "startedAt", type: "uint256" },
      { name: "updatedAt", type: "uint256" },
      { name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

async function getLatestEthPrice(): Promise<number> {
  const now: number = Date.now();

  // Return cached price if still valid
  if (cachedPrice && now - lastFetchTime < CACHE_DURATION) {
    return cachedPrice;
  }

  try {
    // Get latest round data from Chainlink price feed
    const result = (await client.readContract({
      address: CHAINLINK_ETH_USD_FEED,
      abi: chainlinkAbi,
      functionName: "latestRoundData",
    })) as ChainlinkResponse;

    // Chainlink price feed returns price with 8 decimals
    const price: number = Number(result[1]) / 1e8;

    // Update cache
    cachedPrice = price;
    lastFetchTime = now;

    return price;
  } catch (error) {
    console.error("Error fetching ETH price:", error);
    throw new Error("Failed to fetch ETH price");
  }
}

async function calculateEthAmount(usdAmount: number): Promise<number> {
  try {
    const ethPrice: number = await getLatestEthPrice();
    const baseEthAmount: number = usdAmount / ethPrice;
    return baseEthAmount * (1 + PRICE_BUFFER_PERCENTAGE / 100);
  } catch (err) {
    throw err;
  }
}

export { calculateEthAmount, getLatestEthPrice };
