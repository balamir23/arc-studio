"use client";

import { useState } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";

import { TOKEN_FACTORY_ADDRESS } from "@/lib/contracts";
import { tokenFactoryAbi } from "@/lib/abi/TokenFactory";

export default function CreateToken() {
  const { isConnected } = useAccount();

  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [supply, setSupply] = useState("");

  const {
    data: hash,
    error,
    isPending,
    writeContract,
  } = useWriteContract();

  const {
    isLoading: confirming,
    isSuccess,
  } = useWaitForTransactionReceipt({
    hash,
  });

  function createToken() {
    if (!name || !symbol || !supply) return;

    writeContract({
      address: TOKEN_FACTORY_ADDRESS as `0x${string}`,
      abi: tokenFactoryAbi,
      functionName: "createToken",
      args: [
        name,
        symbol,
        BigInt(supply),
      ],
    });
  }

  return (
    <div className="space-y-4">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Token Name"
        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3"
      />

      <input
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        placeholder="Symbol"
        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3"
      />

      <input
        type="number"
        value={supply}
        onChange={(e) => setSupply(e.target.value)}
        placeholder="Total Supply"
        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3"
      />

      <button
        disabled={!isConnected || isPending || confirming}
        onClick={createToken}
        className="w-full rounded-lg bg-emerald-600 py-3 font-semibold hover:bg-emerald-700 disabled:opacity-50"
      >
        {isPending
          ? "Confirm in MetaMask..."
          : confirming
          ? "Waiting for confirmation..."
          : "Create Token"}
      </button>

      {hash && (
        <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-4">
          <p className="mb-2 text-sm text-zinc-400">
            Transaction Hash
          </p>

          <a
            href={`https://testnet.arcscan.app/tx/${hash}`}
            target="_blank"
            rel="noreferrer"
            className="break-all text-blue-400 hover:underline"
          >
            {hash}
          </a>
        </div>
      )}

      {isSuccess && (
        <div className="rounded-lg border border-green-600 bg-green-900/20 p-4">
          <p className="font-semibold text-green-400">
            ✅ Token created successfully!
          </p>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-600 bg-red-900/20 p-4">
          <p className="break-all text-red-400">
            {error.message}
          </p>
        </div>
      )}
    </div>
  );
}