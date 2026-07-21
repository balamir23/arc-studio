import { ethers } from "hardhat";

async function main() {
  console.log("🚀 Deploying TokenFactory...");

  const Factory = await ethers.getContractFactory("TokenFactory");

  const factory = await Factory.deploy();

  await factory.waitForDeployment();

  console.log("==================================");
  console.log("✅ TokenFactory deployed");
  console.log("Address:", await factory.getAddress());
  console.log("==================================");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});