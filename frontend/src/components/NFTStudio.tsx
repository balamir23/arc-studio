"use client";

import { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { parseAbi } from "viem";
import { NFT_FACTORY } from "@/lib/contracts";

const abi = parseAbi([
  "function createCollection(string name_, string symbol_) returns (address)"
]);

export default function NFTStudio() {
  const { isConnected } = useAccount();

  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");

  const {
    writeContract,
    isPending,
    isSuccess,
    error,
  } = useWriteContract();

  const createCollection = () => {
    if (!name || !symbol) return;

    writeContract({
      address: NFT_FACTORY as `0x${string}`,
      abi,
      functionName: "createCollection",
      args: [name, symbol],
    });
  };

  if (!isConnected) {
    return (
      <div className="rounded-xl border p-6">
        Connect your wallet first.
      </div>
    );
  }

  return (
    <div className="rounded-xl border p-6 space-y-4">

      <h2 className="text-xl font-bold">
        NFT Studio
      </h2>

      <input
        className="w-full rounded-lg border p-3"
        placeholder="Collection Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="w-full rounded-lg border p-3"
        placeholder="Symbol"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />

      <button
        onClick={createCollection}
        disabled={isPending}
        className="rounded-lg bg-black text-white px-5 py-3"
      >
        {isPending
          ? "Creating..."
          : "Create Collection"}
      </button>

      {isSuccess && (
        <div className="text-green-600">
          Collection created successfully.
        </div>
      )}

      {error && (
        <div className="text-red-600">
          {error.message}
        </div>
      )}

    </div>
  );
}