import { Chain, PublicClient, WalletClient } from "viem";

// Declare Client for blockchain interaction
export let walletClient: WalletClient;
export let publicClient: PublicClient;

// Define chain
export let chains: Chain[];
