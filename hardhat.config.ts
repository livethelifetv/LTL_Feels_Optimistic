import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

import { chainIds, mnemonic, infuraApiKey, createEthereumTestnetConfig, createOptimismConfig } from "./utils/deployment-utils";
import "./tasks/accounts";
import "./tasks/clean";

import { resolve } from "path";
import { config as dotenvConfig } from "dotenv";

// Optimism related deps
import '@eth-optimism/hardhat-ovm';

dotenvConfig({ path: resolve(__dirname, "./.env") });

const config = {
  defaultNetwork: "hardhat",
  gasReporter: {
    currency: "USD",
    enabled: process.env.REPORT_GAS ? true : false,
    excludeContracts: [],
    src: "./contracts",
  },
  networks: {
    hardhat: {
      accounts: {
        mnemonic
      },
      chainId: chainIds.hardhat,
    },
    goerli: createEthereumTestnetConfig("goerli"),
    kovan: createEthereumTestnetConfig("kovan"),
    rinkeby: createEthereumTestnetConfig("rinkeby"),
    ropsten: createEthereumTestnetConfig("ropsten"),
    optimism: createOptimismConfig("optimism_local", 0)
  },
  ovm: {
    solcVersion: '0.7.6'
  },
  namedAccounts: {
    deployer: 0
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    version: "0.7.6",
    settings: {
      metadata: {
        // Not including the metadata hash
        // https://github.com/paulrberg/solidity-template/issues/31
        bytecodeHash: "none",
      },
      // You should disable the optimizer when debugging
      // https://hardhat.org/hardhat-network/#solidity-optimizer-support
      optimizer: {
        enabled: true,
        runs: 1200,
      },
    },
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
};

export default config;
