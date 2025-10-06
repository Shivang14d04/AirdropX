"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import HomeContent from "@/components/HomeContent";
import { useAccount } from "wagmi";
export default function Home() {
  const { isConnected } = useAccount();

  return (
    <div>
      {!isConnected ? (
        <div>Please connect your wallet to use the airdrop service.</div>
      ) : (
        <HomeContent />
      )}
    </div>
  );
}
