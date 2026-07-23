"use client";

import { useReadContract, useReadContracts } from "wagmi";
import { formatUnits } from "viem";
import { TOKEN_FACTORY_ADDRESS } from "@/lib/contracts";
import { tokenFactoryAbi } from "@/lib/abi/TokenFactory";
import { erc20Abi } from "@/lib/abi/ERC20";

export default function Explorer() {
  const {
    data: tokenAddresses = [],
    isLoading,
    refetch,
  } = useReadContract({
    address: TOKEN_FACTORY_ADDRESS,
    abi: tokenFactoryAbi,
    functionName: "getAllTokens",
    query: {
      refetchInterval: 5000,
    },
  });

  const contracts = (tokenAddresses as `0x${string}`[]).flatMap((token) => [
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
  ]);

  const { data: tokenData = [] } = useReadContracts({
    contracts,
    query: {
      enabled: contracts.length > 0,
    },
  });

  async function copyAddress(value: string) {
    await navigator.clipboard.writeText(value);
    alert("Adres kopyalandı.");
  }

  if (isLoading) {
    return (
      <div className="rounded-xl border p-6 mt-6">
        <h2 className="text-2xl font-bold mb-4">Explorer</h2>
        <p>Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border p-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Explorer</h2>

        <button
          onClick={() => refetch()}
          className="rounded bg-black px-3 py-2 text-white"
        >
          Refresh
        </button>
      </div>

      {(tokenAddresses as `0x${string}`[]).length === 0 ? (
        <p>Henüz oluşturulmuş token bulunmuyor.</p>
      ) : (
        <div className="space-y-4">
          {(tokenAddresses as `0x${string}`[]).map((token, index) => {
            const offset = index * 4;

            const name = tokenData[offset]?.result as string;
            const symbol = tokenData[offset + 1]?.result as string;
            const totalSupply = tokenData[offset + 2]?.result as bigint;
            const decimals = tokenData[offset + 3]?.result as number;

            return (
              <div
                key={token}
                className="rounded-lg border p-4 space-y-3"
              >
                <h3 className="text-lg font-bold">
                  {name || "Unknown"} ({symbol || "---"})
                </h3>

                <div className="text-sm break-all">
                  {token}
                </div>

                <div>
                  <strong>Supply:</strong>{" "}
                  {totalSupply !== undefined &&
                  decimals !== undefined
                    ? formatUnits(totalSupply, decimals)
                    : "-"}
                </div>

                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => copyAddress(token)}
                    className="rounded bg-blue-600 px-3 py-2 text-white"
                  >
                    Copy Address
                  </button>

                  <a
                    href={`https://sepolia.arcscan.io/address/${token}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded bg-gray-700 px-3 py-2 text-white"
                  >
                    Explorer
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}