import { ethers } from "hardhat";

async function main() {
  const Factory = await ethers.getContractFactory("ArcTestnetDegenNFT");
  const nft = await Factory.deploy();

  await nft.waitForDeployment();

  console.log("ArcTestnetDegenNFT:", await nft.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});