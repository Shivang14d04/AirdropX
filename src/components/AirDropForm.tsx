"use client";
import InputField from "./ui/InputField";
import { useState, useMemo } from "react";
import { useChainId, useConfig, useAccount, useWriteContract } from "wagmi";
import { readContract, waitForTransactionReceipt } from "@wagmi/core";
import { chainsToTSender, tsenderAbi, erc20Abi } from "@/constants";
import calculateTotal from "@/utils/calculateTotal/calculateTotal";

export default function AirDropForm() {
  const [tokenAddress, setTokenAddress] = useState("");
  const [recipients, setRecipients] = useState("");
  const [amount, setAmount] = useState("");
  const chainId = useChainId();
  const config = useConfig();
  const account = useAccount();
  const total: number = useMemo(() => calculateTotal(amount), [amount]);
  const { data: hash, isPending, writeContractAsync } = useWriteContract();

  async function getApprovedAmount(
    tSenderAddress: string | null
  ): Promise<number> {
    if (!tSenderAddress) {
      console.log("No address found, please use a supported network");
      return 0;
    }
    const response = await readContract(config, {
      abi: erc20Abi,
      address: tokenAddress as `0x${string}`,
      functionName: "allowance",
      args: [account.address, tSenderAddress as `0x${string}`],
    });
    return Number(response);
  }

  async function handleSubmit() {
    const tSenderAddress = chainsToTSender[chainId]["tsender"];
    const approvedAmount = await getApprovedAmount(tSenderAddress);
    if (approvedAmount < total) {
      const approvedHash = await writeContractAsync({
        abi: erc20Abi,
        address: tokenAddress as `0x${string}`,
        functionName: "approve",
        args: [tSenderAddress as `0x${string}`, BigInt(total)],
      });
      const approvalReceipt = await waitForTransactionReceipt(config, {
        hash: approvedHash,
      });
      console.log("Approved Hash:", approvedHash);
      await writeContractAsync({
        abi: tsenderAbi,
        address: tSenderAddress as `0x${string}`,
        functionName: "airdropERC20",
        args: [
          tokenAddress,
          // Comma or new line separated
          recipients
            .split(/[,\n]+/)
            .map((addr) => addr.trim())
            .filter((addr) => addr !== ""),
          amount
            .split(/[,\n]+/)
            .map((amt) => amt.trim())
            .filter((amt) => amt !== ""),
          BigInt(total),
        ],
      });
    } else {
      await writeContractAsync({
        abi: tsenderAbi,
        address: tSenderAddress as `0x${string}`,
        functionName: "airdropERC20",
        args: [
          tokenAddress,
          // Comma or new line separated
          recipients
            .split(/[,\n]+/)
            .map((addr) => addr.trim())
            .filter((addr) => addr !== ""),
          amount
            .split(/[,\n]+/)
            .map((amt) => amt.trim())
            .filter((amt) => amt !== ""),
          BigInt(total),
        ],
      });
    }
  }

  return (
    <div className="flex justify-center items-center py-10 px-4">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          ERC20 Airdrop Form
        </h2>

        <InputField
          label="Token Address"
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
          placeholder="0x..."
        />

        <InputField
          label="Recipients"
          value={recipients}
          onChange={(e) => setRecipients(e.target.value)}
          placeholder="0x...,0x...,0x..."
          type="text"
          large={true}
        />

        <InputField
          label="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="100,200,300"
          type="text"
          large={true}
        />

        <div className="mt-4 text-gray-700">
          Total Amount:{" "}
          <span className="font-semibold text-blue-600">{total}</span>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isPending}
          className={`w-full mt-6 py-3 rounded-lg font-medium text-white 
            ${
              isPending
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } 
            transition duration-200`}
        >
          {isPending ? "Processing..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
