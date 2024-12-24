require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");

const SEPOLIA_URL = "https://sepolia.infura.io/v3/6852b93fa3354387b0c897bcee431332";
const SEPOLIA_PRIVATE_KEY = "eb89a7787f29c6e07b292ec63b3ad2bee6f9c98ac0aa837b916b7d8e63ca5a52";  // Replace with your actual Sepolia private key

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
  },
  paths: {
    sources: "./contracts",
    artifacts: "./client/src/artifacts",
  },
};