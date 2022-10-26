require("dotenv").config();
const { MNEMONIC, INFURA_ID, ALCHEMY_ID } = process.env;
const HDWalletProvider = require("@truffle/hdwallet-provider");
module.exports = {
  dashboard: {
    port: 24012,
    host: "localhost",
    verbose: true,
  },
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
    goerli: {
      provider: () =>
        new HDWalletProvider(
          MNEMONIC,
          `https://goerli.infura.io/v3/${INFURA_ID}`
        ),
      network_id: 5,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    mumbai: {
      provider: () =>
        new HDWalletProvider(
          MNEMONIC,
          `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_ID}`
        ),
      network_id: 80001,
      // confirmations: 2,
      // timeoutBlocks: 200,
      // skipDryRun: true,
    },
  },
  mocha: {
    useColors: true,
    // reporter: "eth-gas-reporter",
    // reporterOptions: {
    //   gasPrice: 1,
    //   token: "ETH",
    //   showTimeSpent: true,
    // },
  },
  compilers: {
    solc: {
      version: "0.8.17",
      settings: {
        optimizer: {
          enabled: false,
          runs: 200,
        },
      },
    },
  },
  etherscan: {
    apiKey: "WS5MA84VDQJN8JX8BCRABIFDDZR7F6VNQS",
  },
};
