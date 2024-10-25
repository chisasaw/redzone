import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_URL,
      accounts: [process.env.PRIVATE_KEY as string]
    }
  }
};

export default config; 