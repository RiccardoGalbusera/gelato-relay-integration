import * as Ethers from "ethers";
import { ethers } from "hardhat";

import { GelatoRelaySDK } from "@gelatonetwork/relay-sdk";
import { Web3Auth } from "@web3auth/web3auth";

const contractAddress = "0x06D7Fde0E75d042F99Ab034ec4D09B49143d6467";

// async function relayWithSponsoredUserAuthCall() {
//   const web3auth = new Web3Auth({
//     clientId: process.env.CLIENT_ID!, // get it from Web3Auth Dashboard
//     chainConfig: {
//       chainNamespace: "eip155",
//       chainId: "0x89", // hex of 137, Polygon mainnet
//       rpcTarget:
//         "https://polygon-mainnet.g.alchemy.com/v2/" +
//         process.env.ALCHEMY_POLYGON,
//     },
//   });
//   await web3auth.initModal();

//   const web3authProvider = web3auth.connect();

//   const [caller] = await ethers.getSigners();
//   const contract = await ethers.getContractAt("Contract", contractAddress);
//   const { data } = await contract.populateTransaction.counter();
//   const provider = new Ethers.providers.Web3Provider(web3authProvider);

//   const request = {
//     chainId: 137,
//     target: contract.address,
//     data: data as Ethers.BytesLike,
//     user: caller.address,
//   };

//   const sponsorApiKey = process.env.SPONSOR_API_KEY || "";

//   const response = await GelatoRelaySDK.relayWithSponsoredUserAuthCall(
//     request,
//     provider,
//     sponsorApiKey
//   );

//   console.log(response);
// }

async function rechargeContract() {
  const [caller] = await ethers.getSigners();

  // recharge contract
  caller.sendTransaction({
    to: contractAddress,
    value: ethers.utils.parseEther("0.01"),
  });
}

async function relayWithSyncFee() {
  const [caller] = await ethers.getSigners();
  console.log("caller balance", await caller.getBalance());
  const contract = await ethers.getContractAt("Contract", contractAddress);
  const { data } = await contract.populateTransaction.counter();
  const provider = new Ethers.providers.JsonRpcProvider(
    "https://polygon-mainnet.g.alchemy.com/v2/" + process.env.ALCHEMY_POLYGON
  );

  const feeToken = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

  const request = {
    chainId: 137,
    target: contract.address,
    data: data as Ethers.BytesLike,
    feeToken,
  };

  const response = await GelatoRelaySDK.relayWithSyncFee(request);

  console.log(response);
  console.log("caller balance", await caller.getBalance());
}

async function checkExecution() {
  const contract = await ethers.getContractAt("Contract", contractAddress);
  const count = await contract.count();
  console.log("counter", count);
  console.log("caller", await contract.senders(count));
}

checkExecution();
