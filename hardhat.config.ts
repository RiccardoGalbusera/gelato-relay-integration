import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "dotenv/config";

module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      forking: {
        enabled: true,
        url: process.env.KEY || "",
        blockNumber: 15000000,
      },
    },
    polygon: {
      url:
        "https://polygon-mainnet.g.alchemy.com/v2/" +
          process.env.ALCHEMY_POLYGON || "",
      accounts: [process.env.KEY || ""],
    },
  },
};
