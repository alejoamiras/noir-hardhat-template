import type { HardhatUserConfig } from 'hardhat/config';
import { vars } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox-viem';
import '@nomiclabs/hardhat-solhint';

const shouldLoadEnvVars = !(
  process.argv.includes('compile') ||
  process.argv.includes('test') ||
  process.argv.includes('check')
);

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.28',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: false,
    },
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
    },
    // Only load external network vars when not running compile/test tasks
    ...(!shouldLoadEnvVars
      ? {}
      : {
          sepolia: {
            url: vars.get('SEPOLIA_URL_RPC'),
            accounts: [vars.get('SEPOLIA_PRIVATE_KEY')],
          },
        }),
  },
  // Only load etherscan config when needed
  ...(!shouldLoadEnvVars
    ? {}
    : {
        etherscan: {
          apiKey: vars.get('ETHERSCAN_API_KEY'),
        },
      }),
};

export default config;
