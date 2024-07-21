"use client";
import { Button } from "@/components/ui/button/button";
import { useWagmiStore } from "@/lib/store/wagmiStore";
import Web3Modal from "@/lib/web3/web3modal/web3modal";
import { toast } from "sonner";

export default function Home() {
  const account = useWagmiStore((state) => state.account);
  return (
    <main className="flex min-h-screen relative flex-col items-center justify-between p-24 bg-black">
      <Button
        onClick={() => {
          toast.success("This is a sonner toast");
        }}
      >
        click
      </Button>
      <Web3Modal />
    </main>
  );
}
