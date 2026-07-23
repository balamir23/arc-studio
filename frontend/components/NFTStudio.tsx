"use client";

import { useState } from "react";
import {
  useAccount,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { parseAbi } from "viem";
import {
  NFT_FACTORY_ADDRESS,
  DEGEN_NFT_ADDRESS,
} from "@/lib/contracts";

const abi = parseAbi([
  "function createCollection(string name_, string symbol_) returns (address)",
]);

const degenAbi = parseAbi([
  "function mint()",
  "function totalMinted() view returns (uint256)",
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
  const {
  writeContract: mintContract,
  isPending: isMintPending,
  isSuccess: isMintSuccess,
  error: mintError,
} = useWriteContract();

const { data: totalMinted } = useReadContract({
  address: DEGEN_NFT_ADDRESS as `0x${string}`,
  abi: degenAbi,
  functionName: "totalMinted",
});

  function createCollection() {
  if (!name || !symbol) return;

  writeContract({
    address: NFT_FACTORY_ADDRESS as `0x${string}`,
    abi,
    functionName: "createCollection",
    args: [name, symbol],
  });
}

function mintDegenNFT() {
  mintContract({
    address: DEGEN_NFT_ADDRESS as `0x${string}`,
    abi: degenAbi,
    functionName: "mint",
  });
}

  if (!isConnected) {
    return (
      <div className="rounded-xl border p-6">
        Connect your wallet first.
      </div>
    );
  }

  return (
    <div className="rounded-xl border p-6 space-y-4">
      <h2 className="text-2xl font-bold">NFT Studio</h2>

      <input
        className="w-full rounded-lg border p-3 bg-transparent"
        placeholder="Collection Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="w-full rounded-lg border p-3 bg-transparent"
        placeholder="Collection Symbol"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />

      <button
        onClick={createCollection}
        disabled={isPending}
        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white"
      >
        {isPending ? "Creating..." : "Create Collection"}
      </button>

      {isSuccess && (
        <div className="rounded-lg border border-green-600 p-3 text-green-500">
          ✅ Collection created successfully.
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-600 p-3 text-red-500 break-all">
          {error.message}
        </div>
      )}
      <hr className="my-6 border-zinc-700" />

<div className="rounded-xl border border-zinc-700 p-6 space-y-4">
  <h3 className="text-xl font-bold">
    ARC Testnet Degen NFT
  </h3>

  <p className="text-sm text-zinc-400">
    Unlimited free community NFT on Arc Testnet.
  </p>

  <div className="rounded-lg bg-zinc-900 p-4">
    <p className="text-sm text-zinc-400">
      Total Minted
    </p>

    <p className="text-3xl font-bold">
  {totalMinted ? totalMinted.toString() : "0"}
</p>
  </div>

  <button
    onClick={mintDegenNFT}
    disabled={isMintPending}
    className="w-full rounded-lg bg-purple-600 py-3 font-semibold text-white hover:bg-purple-700"
  >
    {isMintPending ? "Minting..." : "Mint Free NFT"}
  </button>

  {isMintSuccess && (
    <div className="rounded-lg border border-green-600 p-3 text-green-500">
      ✅ NFT minted successfully.
    </div>
  )}

  {mintError && (
    <div className="rounded-lg border border-red-600 p-3 text-red-500 break-all">
      {mintError.message}
    </div>
  )}
</div>
    </div>
  );
}