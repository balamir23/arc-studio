import WalletConnect from "@/components/WalletConnect";
import CreateToken from "@/components/CreateToken";
import MyTokens from "@/components/MyTokens";
import Explorer from "@/components/Explorer";
import NFTStudio from "@/components/NFTStudio";

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto p-8 space-y-8">
      <h1 className="text-4xl font-bold">ChainForge</h1>

      <WalletConnect />

      <CreateToken />

      <MyTokens />

      <Explorer />

      <NFTStudio />
    </main>
  );
}