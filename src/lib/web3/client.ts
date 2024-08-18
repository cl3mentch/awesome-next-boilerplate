import { getPublicClient } from "@wagmi/core";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { createPublicClient, createWalletClient, custom, http, WalletClient } from "viem";
import { cookieStorage, createStorage } from "wagmi";
import { bsc, bscTestnet } from "wagmi/chains";

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
if (!projectId) throw new Error("Project ID is not defined");

const isProduction = process.env.NODE_ENV === "production";

const bscChain = isProduction ? bsc : bscTestnet;

export const wagmiConfig = defaultWagmiConfig({
  projectId,
  chains: [bscChain],
  metadata: {
    name: "My App",
    description: "My app description",
    url: "https://myapp.com",
    icons: ["https://myapp.com/favicon.ico"],
  },
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  client({ chain }) {
    return createPublicClient({ chain, transport: http() });
  },
});

// Declare Client for blockchain interaction
export let walletClient: WalletClient;
export const bscClient = getPublicClient(wagmiConfig, { chainId: bscChain.id });

// Remember to declare window.ethereum exist first or else program will crash !
if (typeof window !== "undefined" && window.ethereum) {
  walletClient = createWalletClient({
    chain: bscChain,
    transport: custom(window.ethereum!),
  });
}
