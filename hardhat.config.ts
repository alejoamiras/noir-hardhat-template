import type { HardhatUserConfig } from "hardhat/config";
import { vars } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      viaIR: false,
    },
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
    },
    sepolia: {
      url: vars.get("SEPOLIA_URL_RPC"),
      accounts: [vars.get("SEPOLIA_PRIVATE_KEY")],
    },
  },
  etherscan: {
    apiKey: vars.get("ETHERSCAN_API_KEY")
  }
};

export default config;
