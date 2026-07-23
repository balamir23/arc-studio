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
      args: [name, symbol, BigInt(supply)],
    });
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-xl p-8 shadow-xl">

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white">
          Create ERC-20 Token
        </h2>

        <p className="mt-2 text-zinc-400">
          Launch your own token on ARC Testnet in seconds.
        </p>
      </div>

      <div className="space-y-5">

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Token Name"
          className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-5 py-4 text-white placeholder:text-zinc-500 outline-none transition focus:border-emerald-500"
        />

        <input
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Token Symbol"
          className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-5 py-4 text-white placeholder:text-zinc-500 outline-none transition focus:border-emerald-500"
        />

        <input
          type="number"
          value={supply}
          onChange={(e) => setSupply(e.target.value)}
          placeholder="Total Supply"
          className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-5 py-4 text-white placeholder:text-zinc-500 outline-none transition focus:border-emerald-500"
        />

        <button
          disabled={!isConnected || isPending || confirming}
          onClick={createToken}
          className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 py-4 text-lg font-bold text-white transition hover:scale-[1.01] hover:shadow-lg disabled:opacity-50"
        >
          {isPending
            ? "Confirm in MetaMask..."
            : confirming
            ? "Waiting for Confirmation..."
            : "Create Token"}
        </button>

      </div>

      {hash && (
        <div className="mt-8 rounded-xl border border-zinc-800 bg-black/30 p-5">

          <p className="mb-3 text-sm uppercase tracking-wide text-zinc-500">
            Transaction
          </p>

          <a
            href={`https://testnet.arcscan.app/tx/${hash}`}
            target="_blank"
            rel="noreferrer"
            className="break-all text-cyan-400 hover:underline"
          >
            {hash}
          </a>

        </div>
      )}

      {isSuccess && (
        <div className="mt-6 rounded-xl border border-emerald-600 bg-emerald-500/10 p-5">

          <p className="font-semibold text-emerald-400">
            ✅ Token created successfully.
          </p>

        </div>
      )}

      {error && (
        <div className="mt-6 rounded-xl border border-red-600 bg-red-500/10 p-5">

          <p className="break-all text-red-400">
            {error.message}
          </p>

        </div>
      )}

    </div>
  );
}