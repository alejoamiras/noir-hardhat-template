import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { UltraHonkBackend } from "@aztec/bb.js";
import { CompiledCircuit, Noir } from "@noir-lang/noir_js";
import main from "../circuits/step5/target/step5.json";
// import publicInputs from "../circuits/step5/target/public_inputs_fields.json";
import path from "path";
import fs from "fs";


describe("SimpleCounter", function () {
  async function deploySimpleCounterFixture() {

    const noir = new Noir(main as CompiledCircuit);
    const backend = new UltraHonkBackend(main.bytecode, { threads: 4 });
    const verifier = await hre.viem.deployContract("HonkVerifierKeccak");
    const simpleCounter = await hre.viem.deployContract("SimpleCounter", [verifier.address]);
    const publicClient = await hre.viem.getPublicClient();

    return {
      noir,
      backend,
      verifier,
      simpleCounter,
      publicClient,
    };
  }

  
  describe("Generate Dinamic Proofs", function () {
    beforeEach(async function () {
      this.fixtureVariables = await loadFixture(deploySimpleCounterFixture);
    });
    it.only("should generate several valid proofs and update the counter", async function () {
      const { noir, backend, verifier, simpleCounter } = this.fixtureVariables as {
        noir: Noir;
        backend: UltraHonkBackend;
        verifier: any;
        simpleCounter: any; // Replace 'any' with your actual contract type if available
      };

      let currentCounter = await simpleCounter.read.counter();
      expect(currentCounter).to.equal(0n);

      for(let i = 1; i < 11; i++) {
        // console.log("Defining input...");
        const input = { x: i, y: i + 1 };
        // console.log("Generating witness...");
        const { witness } = await noir.execute(input);
        // console.log("Generating proof...");
        const proof = await backend.generateProof(witness, { keccak: true});
        const verification = await backend.verifyProof(proof, { keccak: true})
        expect(verification).to.equal(true);
        
        // Convert proof to hex string with 0x prefix
        const proofHex = '0x' + Array.from(proof.proof)
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');
        
        await simpleCounter.write.updateCounterIfVerified([proofHex, proof.publicInputs]);
        
      }

      currentCounter = await simpleCounter.read.counter();
      expect(currentCounter).to.equal(10n);
    });
  });

  describe("Static Proofs", function () {
    beforeEach(async function () {
      this.fixtureVariables = await loadFixture(deploySimpleCounterFixture);
    });
    it("should validate proof and update the counter", async function () {
      const { backend, simpleCounter } = this.fixtureVariables as {
        backend: UltraHonkBackend;
        simpleCounter: any; // Replace 'any' with your actual contract type if available
      };

      let currentCounter = await simpleCounter.read.counter();
      expect(currentCounter).to.equal(0n);

      const proofBuffer = fs.readFileSync(path.join(__dirname, '../circuits/step5/target/proof'));
      const proof = '0x' + proofBuffer.toString('hex');

      // The proof needs to be a hex string with 0x prefix for the contract call
      // But needs to be a Uint8Array without 0x prefix for verification
      const proofBytes = Buffer.from(proof.startsWith('0x') ? proof.slice(2) : proof, 'hex');
      
      // const verification = await backend.verifyProof({ 
      //   proof: proofBytes,
      //   publicInputs
      // });
      // console.log('verified?', verification);

      // For contract call, keep proof as hex string with 0x prefix
      // await simpleCounter.write.updateCounterIfVerified([
      //   proof,
      //   publicInputs
      // ]);

      currentCounter = await simpleCounter.read.counter();
      expect(currentCounter).to.equal(1n);
    });
  });
});
