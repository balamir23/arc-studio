const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Deploying NFTFactory...");

  const NFTFactory = await ethers.getContractFactory("NFTFactory");

  const factory = await NFTFactory.deploy();

  await factory.waitForDeployment();

  const address = await factory.getAddress();

  console.log("✅ NFTFactory deployed to:");
  console.log(address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});