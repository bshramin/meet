"use client";

import { createPublicClient, createWalletClient, http, custom } from "viem";
import { mainnet, sepolia } from "viem/chains";
import { MetaMaskInpageProvider } from "@metamask/providers";

const RPC_URL = process.env.NEXT_PUBLIC_BLOCKCHAIN_RPC_URL;
const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID;
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

// https://stackoverflow.com/a/72081301/11553370
declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

const publicClient = createPublicClient({
  chain: CHAIN_ID === "1" ? mainnet : sepolia,
  transport: http(RPC_URL),
});

// const walletClient = createWalletClient({
//   chain: CHAIN_ID === "1" ? mainnet : sepolia,
//   transport: custom(window.ethereum!),
// });

function getWalletClient() {
  return createWalletClient({
    chain: CHAIN_ID === "1" ? mainnet : sepolia,
    transport: custom(window.ethereum!),
  });
}

async function getAccount() {
  const [address] = await getWalletClient().requestAddresses();
  return address;
}

export {
  publicClient,
  // walletClient,
  getAccount,
  RPC_URL,
  CHAIN_ID,
  CONTRACT_ADDRESS,
  getWalletClient,
};
