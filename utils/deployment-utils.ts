import { NetworkUserConfig } from "hardhat/types";

import { resolve } from "path";
import { config as dotenvConfig } from "dotenv";

dotenvConfig({ path: resolve(__dirname, "../.env") });

const chainIds = {
  ganache: 1337,
  goerli: 5,
  hardhat: 31337,
  kovan: 42,
  mainnet: 1,
  rinkeby: 4,
  ropsten: 3,
  optimism_local: 420,
  optimism_testnet: 69
};

const optimismEndpoints = {
  optimism_local: "http://127.0.0.1:8545",
  optimism_testnet: "https://kovan.optimism.io"
}

// Ensure that we have all the environment variables we need.
let mnemonic: string;
if (!process.env.MNEMONIC) {
  throw new Error("Please set your MNEMONIC in a .env file");
} else {
  mnemonic = process.env.MNEMONIC;
}

let infuraApiKey: string;
if (!process.env.INFURA_API_KEY) {
  throw new Error("Please set your INFURA_API_KEY in a .env file");
} else {
  infuraApiKey = process.env.INFURA_API_KEY;
}

function createEthereumTestnetConfig(network: keyof typeof chainIds): NetworkUserConfig {
  const url: string = "https://" + network + ".infura.io/v3/" + infuraApiKey;
  return {
    accounts: {
      count: 10,
      initialIndex: 0,
      mnemonic,
      path: "m/44'/60'/0'/0",
    },
    chainId: chainIds[network],
    url,
  };
}

function createOptimismConfig(endpoint: keyof typeof optimismEndpoints, gasPrice: number) {
  return {
    url: endpoint,
    accounts: {
      mnemonic: mnemonic
    },
    // This sets the gas price to 0 for all transactions on L2. We do this
    // because account balances are not automatically initiated with an ETH
    // balance
    gasPrice: gasPrice,
    ovm: true // This sets the network as using the ovm and ensure contract will be compiled against that
  }
}

export {chainIds, mnemonic, infuraApiKey, createEthereumTestnetConfig, createOptimismConfig}
