import { loadFixture } from '@nomicfoundation/hardhat-toolbox-viem/network-helpers';
import { expect } from 'chai';
import hre from 'hardhat';
import { UltraHonkBackend } from '@aztec/bb.js';
import { CompiledCircuit, Noir } from '@noir-lang/noir_js';
import main from '../circuit/target/num_diff.json';
import proofJson from '../circuit/target/proof_fields.json';
import publicInputsJson from '../circuit/target/public_inputs_fields.json';
import path from 'path';
import fs from 'fs';

describe('SimpleCounter', function () {
  async function deploySimpleCounterFixture() {
    const noir = new Noir(main as CompiledCircuit);
    const backend = new UltraHonkBackend(main.bytecode, { threads: 4 });
    const verifier = await hre.viem.deployContract('HonkVerifier');
    const simpleCounter = await hre.viem.deployContract('SimpleCounter', [verifier.address]);
    const publicClient = await hre.viem.getPublicClient();

    return {
      noir,
      backend,
      verifier,
      simpleCounter,
      publicClient,
    };
  }

  describe('Generate Dinamic Proofs', function () {
    beforeEach(async function () {
      this.fixtureVariables = await loadFixture(deploySimpleCounterFixture);
    });
    it('should generate several valid proofs and update the counter', async function () {
      const { noir, backend, simpleCounter } = this.fixtureVariables as {
        noir: Noir;
        backend: UltraHonkBackend;
        simpleCounter: any; // Replace 'any' with your actual contract type if available
      };

      let currentCounter = await simpleCounter.read.counter();
      expect(currentCounter).to.equal(0n);

      for (let i = 1; i < 11; i++) {
        const input = { x: i, y: i + 1, z: i };

        const { witness } = await noir.execute(input);

        const proof = await backend.generateProof(witness, { keccak: true });
        const verification = await backend.verifyProof(proof, { keccak: true });
        expect(verification).to.equal(true);

        const proofHex = '0x' + Buffer.from(proof.proof).toString('hex');

        await simpleCounter.write.updateCounterIfVerified([proofHex, proof.publicInputs]);
      }

      currentCounter = await simpleCounter.read.counter();
      expect(currentCounter).to.equal(10n);
    });
  });

  describe('Static Proofs', function () {
    beforeEach(async function () {
      this.fixtureVariables = await loadFixture(deploySimpleCounterFixture);
    });
    describe('reading from jsons', function () {
      it.only('should validate proof and update the counter', async function () {
        const { backend, simpleCounter } = this.fixtureVariables as {
          backend: UltraHonkBackend;
          simpleCounter: any;
        };

        let currentCounter = await simpleCounter.read.counter();
        expect(currentCounter).to.equal(0n);

        // Convert proof fields array to Uint8Array for verification
        const proofHex = proofJson.map((field) => field.slice(2)).join('');
        const proofBuffer = Buffer.from(proofHex, 'hex');

        const verification = await backend.verifyProof(
          {
            proof: proofBuffer,
            publicInputs: publicInputsJson,
          },
          { keccak: true }
        );
        expect(verification).to.equal(true);

        // For contract call, keep proof as hex string with 0x prefix
        await simpleCounter.write.updateCounterIfVerified(['0x' + proofHex, publicInputsJson]);

        currentCounter = await simpleCounter.read.counter();
        expect(currentCounter).to.equal(1n);
      });
    });
    describe('reading from bytes', function () {
      it('should validate proof and update the counter', async function () {
        const { backend, simpleCounter } = this.fixtureVariables as {
          backend: UltraHonkBackend;
          simpleCounter: any;
        };

        let currentCounter = await simpleCounter.read.counter();
        expect(currentCounter).to.equal(0n);

        const proofBuffer = fs.readFileSync(path.join(__dirname, '../circuit/target/proof'));
        const proof = '0x' + proofBuffer.toString('hex');

        const publicInputsBuffer = fs.readFileSync(
          path.join(__dirname, '../circuit/target/public_inputs')
        );
        const publicInputsArray = Array.from(
          { length: Math.floor(publicInputsBuffer.length / 32) },
          (_, i) => '0x' + publicInputsBuffer.subarray(i * 32, (i + 1) * 32).toString('hex')
        );

        const verification = await backend.verifyProof(
          {
            proof: proofBuffer,
            publicInputs: publicInputsArray,
          },
          { keccak: true }
        );
        expect(verification).to.equal(true);

        await simpleCounter.write.updateCounterIfVerified([proof, publicInputsArray]);

        currentCounter = await simpleCounter.read.counter();
        expect(currentCounter).to.equal(1n);
      });
    });
  });
});
