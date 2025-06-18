# Noir + Hardhat Template 🚀

A comprehensive boilerplate that seamlessly integrates [Noir](https://noir-lang.org/) zero-knowledge circuits with [Hardhat](https://hardhat.org/) for Ethereum smart contract development. This template provides everything you need to build, test, and deploy ZK applications with enterprise-grade CI/CD pipelines.

## ✨ Features

- **🔒 Zero-Knowledge Circuit Development** - Write and test Noir circuits with full TypeScript integration
- **⚡ Hardhat Integration** - Leverage Hardhat's powerful development environment for smart contracts
- **🧪 Comprehensive Testing** - TypeScript tests for both circuits and smart contracts with dynamic proof generation
- **🚀 CI/CD Pipeline** - Automated testing, building, and validation with GitHub Actions
- **📦 Multiple Proof Formats** - Handle proofs in JSON, binary, and Solidity-compatible formats
- **🌐 Deployment Ready** - Hardhat Ignition integration for seamless Sepolia deployment
- **📋 Code Quality** - Commitlint + Husky for conventional commits and code standards
- **🔧 Development Tools** - Hot reloading, error handling, and debugging support

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
```

## 🔄 CI/CD Pipeline

Our GitHub Actions pipeline ensures code quality and functionality across all components:

### **Automated Workflows**

- **🔍 Commit Validation** - Enforces conventional commit standards on all PRs and pushes
- **🔧 Circuit Build** - Compiles Noir circuits and caches artifacts  
- **🧪 Circuit Testing** - Runs all circuit tests with Noir toolchain
- **🔐 Proof Generation & Verification** - Full prove/verify cycle validation
- **📝 Contract Compilation** - Compiles Solidity contracts with optimizations
- **⚡ Integration Testing** - End-to-end tests with proof verification on contracts

### **Quality Assurance**

- **Parallel Execution** - Jobs run concurrently for faster feedback
- **Artifact Caching** - Optimized build times with intelligent caching
- **Multi-Environment** - Consistent testing across different Node.js versions
- **Fail-Fast** - Early detection of issues with comprehensive error reporting

## 💡 Understanding the SimpleCounter Example

The **SimpleCounter** demonstrates a complete ZK application workflow:

### **The Circuit** (`circuit/src/main.nr`)
```noir
// Verifies that x + y = result
fn main(x: Field, y: Field, result: pub Field) {
    assert(x + y == result);
}
```

### **The Smart Contract** (`contracts/SimpleCounter.sol`)
- Stores a counter value on-chain
- Accepts zero-knowledge proofs to increment the counter
- Verifies proofs using the auto-generated Solidity verifier
- Emits events for successful verifications

### **The Tests** (`test/SimpleCounter.ts`)
- Dynamically generates proofs for different input values
- Tests both valid and invalid proof scenarios
- Demonstrates proof format conversion (binary ↔ JSON)
- Verifies end-to-end integration between circuits and contracts

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
- ✅ State management and rollback capabilities
- ✅ Multi-network deployment support

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
