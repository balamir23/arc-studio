"use client";

import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

function shortenAddress(address: string) {
  return `${address.slice(0, 8)}...${address.slice(-6)}`;
}
export default function WalletConnect() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  if (!mounted) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-xl p-6">
        <button
          disabled
          className="w-full rounded-xl bg-zinc-800 py-3 text-zinc-400"
        >
          Loading Wallet...
        </button>
      </div>
    );
  }

  if (isConnected) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-xl p-6 shadow-xl">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-xl font-bold text-white">
              Wallet
            </h2>

            <p className="mt-1 text-sm text-emerald-400 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              Connected
            </p>

          </div>

          <button
            onClick={() => disconnect()}
            className="rounded-xl bg-red-600 px-5 py-2 font-semibold text-white transition hover:bg-red-700"
          >
            Disconnect
          </button>

        </div>

        <div className="mt-6 rounded-xl border border-zinc-800 bg-black/30 p-4">

          <p className="text-xs uppercase tracking-widest text-zinc-500">
            Wallet Address
          </p>

          <p className="mt-2 break-all font-mono text-sm text-zinc-200">
            {address ? shortenAddress(address) : ""}
          </p>

        </div>

      </div>
    );
  }

  const connector =
    connectors.find((c) => c.type === "injected") ??
    connectors[0];

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-xl p-6 shadow-xl">

      <h2 className="text-xl font-bold text-white">
        Connect Wallet
      </h2>

      <p className="mt-2 text-zinc-400">
        Connect MetaMask to start creating ERC-20 tokens and NFT collections on ARC Network.
      </p>

      <button
        onClick={() => connector && connect({ connector })}
        disabled={!connector || isPending}
        className="mt-6 w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3 font-semibold text-white transition hover:scale-[1.02] hover:shadow-lg disabled:opacity-50"
      >
        {isPending
          ? "Connecting..."
          : "Connect MetaMask"}
      </button>

    </div>
  );
}