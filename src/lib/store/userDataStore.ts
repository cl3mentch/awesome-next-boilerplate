import { Address, zeroAddress } from "viem";
import { createStore } from "zustand/vanilla";

export type UserDataState = {
  username: string;
  web3_address: Address;
  downline: number;
};

export type UserDataAction = {
  setUser: (user: UserDataState) => void;
};

export type UserDataStore = UserDataState & UserDataAction;

export const defaultInitState: UserDataState = {
  username: "",
  web3_address: zeroAddress as Address,
  downline: 0,
};

export const createAccountStore = (
  initState: UserDataState = defaultInitState
) => {
  return createStore<UserDataStore>()((set) => ({
    ...initState,
    setUser: (user: UserDataState) => set(() => ({ ...user })),
  }));
};
