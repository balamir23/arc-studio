"use client";

import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

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
      <button
        disabled
        className="rounded-lg bg-zinc-700 px-5 py-3 opacity-50"
      >
        Loading...
      </button>
    );
  }

  if (isConnected) {
    return (
      <div className="space-y-3">
        <p className="text-green-400 font-semibold">
          Connected
        </p>

        <p className="break-all text-sm text-zinc-400">
          {address}
        </p>

        <button
          onClick={() => disconnect()}
          className="rounded-lg bg-red-600 px-5 py-3 hover:bg-red-700"
        >
          Disconnect
        </button>
      </div>
    );
  }

  const connector =
    connectors.find((c) => c.type === "injected") ?? connectors[0];

  return (
    <button
      onClick={() => connector && connect({ connector })}
      disabled={!connector || isPending}
      className="rounded-lg bg-blue-600 px-5 py-3 hover:bg-blue-700 disabled:opacity-50"
    >
      {isPending ? "Connecting..." : "Connect MetaMask"}
    </button>
  );
}