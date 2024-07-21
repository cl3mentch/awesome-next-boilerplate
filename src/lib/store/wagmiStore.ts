import { createStore } from "zustand/vanilla";
import { type GetAccountReturnType } from "@wagmi/core";
import { wagmiConfig } from "../web3/client";
import { getAccount, watchAccount } from "@wagmi/core";

export type WagmiState = {
  account: GetAccountReturnType;
};

export type WagmiAction = {
  setAccount: (account: GetAccountReturnType) => void;
};

export type WagmiStore = WagmiState & WagmiAction;

export const defaultInitState: WagmiState = {
  account: getAccount(wagmiConfig),
};

export const createWagmiStore = (initState: WagmiState = defaultInitState) => {
  return createStore<WagmiStore>()((set) => ({
    ...initState,
    setAccount: (account: GetAccountReturnType) => set({ account }),
  }));
};

// Watch for account changes and update the store
watchAccount(wagmiConfig, {
  onChange(data) {
    if (data) {
      const accountStore = createWagmiStore();
      accountStore.getState().setAccount(data);
    }
  },
});
