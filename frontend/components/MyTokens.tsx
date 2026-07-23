"use client";

import { useState } from "react";
import { formatUnits } from "viem";
import { useAccount, useReadContract, useReadContracts } from "wagmi";

import { TOKEN_FACTORY_ADDRESS } from "@/lib/contracts";
import { tokenFactoryAbi } from "@/lib/abi/TokenFactory";
import { erc20Abi } from "@/lib/abi/ERC20";

export default function MyTokens() {
  const { address, isConnected } = useAccount();
  const [isOpen, setIsOpen] = useState(false);

  const { data: tokenAddresses } = useReadContract({
    address: TOKEN_FACTORY_ADDRESS as `0x${string}`,
    abi: tokenFactoryAbi,
    functionName: "getTokensByOwner",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  const contracts =
    tokenAddresses?.flatMap((token) => [
      {
        address: token,
        abi: erc20Abi,
        functionName: "name",
      },
      {
        address: token,
        abi: erc20Abi,
        functionName: "symbol",
      },
      {
        address: token,
        abi: erc20Abi,
        functionName: "totalSupply",
      },
      {
        address: token,
        abi: erc20Abi,
        functionName: "decimals",
      },
    ]) ?? [];

  const { data } = useReadContracts({
    contracts,
    query: {
      enabled: contracts.length > 0 && isOpen,
    },
  });

  if (!isConnected) return null;

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left"
      >
        <h2 className="text-xl font-semibold">
          {isOpen ? "▼" : "▶"} My Tokens ({tokenAddresses?.length ?? 0})
        </h2>

        <span className="text-sm text-zinc-500">
          {isOpen ? "Hide" : "Show"}
        </span>
      </button>

      {isOpen && (
        <div className="mt-6">
          {!tokenAddresses?.length ? (
            <p className="text-zinc-400">
              You haven't created any tokens yet.
            </p>
          ) : (
            <div className="space-y-4">
              {tokenAddresses.map((token, index) => {
                const offset = index * 4;

                const name = data?.[offset]?.result as string | undefined;
                const symbol = data?.[offset + 1]?.result as string | undefined;
                const supply = data?.[offset + 2]?.result as bigint | undefined;
                const decimals = data?.[offset + 3]?.result as number | undefined;

                return (
                  <div
                    key={token}
                    className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold">
                          {name ?? "Loading..."}
                        </h3>

                        <p className="text-zinc-400">
                          {symbol ?? "..."}
                        </p>
                      </div>

                      <a
                        href={`https://testnet.arcscan.app/address/${token}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm transition-colors hover:bg-blue-700"
                      >
                        ArcScan
                      </a>
                    </div>

                    <div className="mt-5 space-y-2 text-sm">
                      <div>
                        <span className="text-zinc-500">
                          Address
                        </span>

                        <p className="break-all">
                          {token}
                        </p>
                      </div>

                      <div>
                        <span className="text-zinc-500">
                          Total Supply
                        </span>

                        <p>
                          {supply !== undefined &&
                          decimals !== undefined
                            ? Number(
                                formatUnits(
                                  supply,
                                  decimals
                                )
                              ).toLocaleString()
                            : "..."}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}