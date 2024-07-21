"use client";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect } from "wagmi";

export default function Web3Modal() {
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return <w3m-button />;

  // if (isConnected)
  //   return <button onClick={() => disconnect()}>Disconnect</button>;
  // return <button onClick={() => open()}>open modal</button>;
}
