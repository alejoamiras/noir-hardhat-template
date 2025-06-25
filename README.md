# Noir + Hardhat Template 🚀

A comprehensive boilerplate that seamlessly integrates [Noir](https://noir-lang.org/) zero-knowledge circuits with [Hardhat](https://hardhat.org/) for Ethereum smart contract development. This template provides everything you need to build, test, and deploy ZK applications with enterprise-grade CI/CD pipelines.

## ✨ Features

- **🔒 Zero-Knowledge Circuit Development** - Write and test Noir circuits with full TypeScript integration
- **⚡ Hardhat Integration** - Leverage Hardhat's powerful development environment for smart contracts
- **🧪 Comprehensive Testing** - TypeScript tests for both circuits and smart contracts with dynamic proof generation
- **🚀 CI/CD Pipeline** - Automated testing, building, and validation
- **📦 Multiple Proof Formats** - Handle proofs in JSON and binary
- **🌐 Deployment Ready** - Hardhat Ignition integration for seamless deployment
- **📋 Code Quality** - ESLint, Solhint, Prettier, Commitlint + Husky for comprehensive code standards

## 🏗️ What You'll Learn

This template demonstrates a complete **SimpleCounter** example that showcases:

- **Circuit Development**: Create a Noir circuit that verifies arithmetic operations
- **Proof Generation**: Generate zero-knowledge proofs using the `bb` proving system
- **Smart Contract Verification**: Verify proofs on-chain using auto-generated Solidity verifiers
- **Full-Stack Integration**: TypeScript tests that create, verify, and submit proofs dynamically
- **Production Deployment**: Deploy and interact with your ZK application on Ethereum testnets

## 📋 Prerequisites

Before getting started, ensure you have:

- **Node.js** (v18 or later) and **Yarn**
- **Noir toolchain** - Install via [noirup](https://noir-lang.org/docs/getting_started/quick_start#installation)
- **Barretenberg** (`bb`) - Usually installed with Noir, or install separately
- **Git** for version control

```bash
# Install Noir toolchain
curl -L https://raw.githubusercontent.com/noir-lang/noirup/main/install | bash
noirup

# Verify installations
nargo --version
bb --version
```

## 🚀 Quick Start

1. **Clone and Install**

   ```bash
   git clone <repository-url>
   cd noir-hardhat-template
   yarn install
   ```

2. **Build the Circuit**

   ```bash
   yarn circuit:build
   ```

3. **Test Everything**

   ```bash
   # Test the Noir circuit
   yarn circuit:test

   # Test smart contracts with proof verification
   yarn contracts:test
   ```

4. **Generate and Verify Proofs**

   ```bash
   # Generate witness and verification key
   yarn circuit:witness
   yarn circuit:vk

   # Create and verify a proof
   yarn circuit:prove
   yarn circuit:verify
   ```

## 📁 Project Structure

```
noir-hardhat-template/
├── circuit/                    # Noir circuit source code
│   ├── src/main.nr            # Main circuit logic (SimpleCounter)
│   ├── Nargo.toml             # Circuit configuration
│   ├── Prover.toml            # Proving parameters
│   └── target/                # Compiled circuit artifacts
├── contracts/                  # Solidity smart contracts
│   ├── SimpleCounter.sol      # Main contract with ZK verification
│   └── VerifierKeccak.sol     # Auto-generated proof verifier
├── test/                      # TypeScript test suites
│   └── SimpleCounter.ts       # Comprehensive integration tests
├── ignition/                  # Hardhat Ignition deployment modules
│   └── modules/
│       └── SimpleCounter.ts   # Deployment configuration
├── .github/workflows/         # CI/CD pipeline configuration
└── hardhat.config.ts          # Hardhat configuration
```

## 🛠️ Available Scripts

### Circuit Operations

```bash
yarn circuit:build              # Compile Noir circuit
yarn circuit:test               # Run circuit tests
yarn circuit:witness           # Generate witness from inputs
yarn circuit:vk                # Generate verification key
yarn circuit:prove             # Generate zero-knowledge proof
yarn circuit:verify            # Verify generated proof
yarn circuit:solidity_verifier # Generate Solidity verifier contract
```

### Smart Contract Operations

```bash
yarn contracts:compile         # Compile Solidity contracts
yarn contracts:test           # Run smart contract tests
yarn contracts:deploy         # Deploy to Sepolia testnet
```

### Development Tools

```bash
yarn commitlint               # Validate commit messages
yarn commitlint:last          # Check last commit message
yarn lint                     # Run ESLint on TypeScript files
yarn lint:fix                 # Auto-fix ESLint issues
yarn format                   # Format code with Prettier
yarn format:check            # Check formatting without changes
yarn lint:all                # Run linting and format check
```

## 🎨 Code Quality

This template includes comprehensive linting and formatting tools to maintain code quality:

### **TypeScript Linting** (ESLint)

- Configured with TypeScript-specific rules and best practices
- Integrates with Prettier for consistent formatting
- Catches potential bugs and enforces coding standards
- Run with `yarn lint` or auto-fix with `yarn lint:fix`

### **Solidity Linting** (Solhint)

- Enforces Solidity best practices and security patterns
- Configured with recommended rules for modern Solidity development
- Run with `npx hardhat check`
- Auto-generated verifier contracts are excluded from linting

### **Code Formatting** (Prettier)

- Ensures consistent code style across TypeScript, Solidity, JSON, and Markdown
- Configured with sensible defaults for each file type
- Run with `yarn format` or check with `yarn format:check`

### **Pre-commit Hooks**

- Automatically runs linting and formatting on staged files
- Prevents committing code that doesn't meet quality standards
- Powered by Husky and lint-staged

### **CI Integration**

The CI pipeline includes dedicated jobs for:

- TypeScript linting
- Solidity linting
- Formatting verification
- Commit message validation

### **Noir Language Support**

Currently, there are no dedicated linting tools for Noir. However:

- VSCode users can install the `vscode-noir` extension for syntax highlighting and LSP support
- NeoVim users can use the `noir-nvim` plugin
- The Language Server Protocol (LSP) provides basic error checking via `nargo lsp`

## 🔄 CI/CD Pipeline

Our GitHub Actions pipeline ensures code quality and functionality across all components:

### **Automated Workflows**

- **🔍 Commit Validation** - Enforces conventional commit standards on all PRs and pushes
- **✨ TypeScript Linting** - ESLint checks for code quality and potential bugs
- **🔒 Solidity Linting** - Solhint enforces best practices and security patterns
- **🎨 Format Check** - Prettier ensures consistent code formatting
- **🔧 Circuit Build** - Compiles Noir circuits and caches artifacts
- **🧪 Circuit Testing** - Runs all circuit tests with Noir toolchain
- **🔐 Proof Generation & Verification** - Full prove/verify cycle validation
- **📝 Contract Compilation** - Compiles Solidity contracts with optimizations
- **⚡ Integration Testing** - End-to-end tests with proof verification on contracts

## 💡 Understanding the SimpleCounter Example

The **SimpleCounter** demonstrates a complete ZK application workflow:

### **The Circuit** (`circuit/src/main.nr`)

```noir
fn main(x: Field, y: pub Field, z: pub Field) {
    assert((x != y) & (y != z));
}

#[test]
fn test_main() {
    main(1, 2, 1);
}
```

This circuit implements a **uniqueness constraint verification**:

- **Private Input** (`x`): A secret value known only to the prover
- **Public Inputs** (`y`, `z`): Values that are publicly known and verified
- **Constraint**: Proves that `x` is different from `y` AND `y` is different from `z`
- **Use Case**: Demonstrates how to prove knowledge of a unique value without revealing it

### **The Smart Contract** (`contracts/SimpleCounter.sol`)

- Stores a counter value on-chain
- Accepts zero-knowledge proofs of uniqueness constraints
- Verifies proofs using the auto-generated Solidity verifier
- Increments the counter only when valid proofs are submitted

### **The Tests** (`test/SimpleCounter.ts`)

- Dynamically generates proofs with different combinations of `x`, `y`, `z` values
- Demonstrates proof format conversion (binary ↔ JSON)
- Verifies end-to-end integration between uniqueness circuits and smart contracts
- Shows how private values can remain hidden while proving constraints

## 🌐 Deployment

### **Environment Setup**

Configure your deployment environment:

```bash
# Set your private key and RPC URL
npx hardhat vars set SEPOLIA_PRIVATE_KEY
npx hardhat vars set SEPOLIA_URL_RPC
npx hardhat vars set ETHERSCAN_API_KEY
```

### **Deploy to Sepolia**

```bash
yarn contracts:deploy
```

The deployment uses **Hardhat Ignition** for:

- ✅ Reproducible deployments
- ✅ Automatic verification on Etherscan

## 🧪 Development Workflow

1. **Write your circuit** in `circuit/src/main.nr`
2. **Test circuit logic** with `yarn circuit:test`
3. **Generate verifier contract** with `yarn circuit:solidity_verifier`
4. **Write smart contract tests** in TypeScript
5. **Run full test suite** with `yarn contracts:test`
6. **Deploy and verify** on testnet

## 📚 Learn More

- **[Noir Documentation](https://noir-lang.org/docs)** - Learn zero-knowledge circuit development
- **[Hardhat Documentation](https://hardhat.org/docs)** - Master Ethereum development
- **[Barretenberg](https://github.com/AztecProtocol/aztec-packages/tree/master/barretenberg)** - Understanding the proving system

## 🤝 Contributing

Contributions are welcome! Please ensure:

- Follow conventional commit standards (enforced by our CI)
- Add tests for new features
- Update documentation as needed
- All CI checks pass

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

**Built with ❤️ for the Noir and Ethereum communities**
