import { create } from "zustand";
import { type GetAccountReturnType } from "@wagmi/core";
import { wagmiConfig } from "../web3/client";
import { getAccount, watchAccount } from "@wagmi/core";

export type WagmiState = {
  account: GetAccountReturnType | null;
};

export type WagmiAction = {
  setAccount: (account: GetAccountReturnType) => void;
};

export type WagmiStore = WagmiState & WagmiAction;

export const defaultInitState: WagmiState = {
  account: getAccount(wagmiConfig),
};

export const useWagmiStore = create<WagmiStore>((set) => ({
  ...defaultInitState,
  setAccount: (account: GetAccountReturnType) => {
    set({ account });
  },
}));

watchAccount(wagmiConfig, {
  onChange(data) {
    useWagmiStore.getState().setAccount(data); // Update Zustand hook
  },
});
