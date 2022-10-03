import { ethers } from "hardhat";

async function deploy() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const contractFactory = await ethers.getContractFactory("Contract");
  const contract = await contractFactory.deploy();
  await contract.deployed();

  console.log("Contract address:", contract.address);
}

deploy();
