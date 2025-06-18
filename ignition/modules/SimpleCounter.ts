import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const VerifierModule = buildModule("VerifierModule", (m) => {
  const verifier = m.contract("HonkVerifierKeccak", [], {});
  return { verifier };
});

const SimpleCounterModule = buildModule("SimpleCounterModule", (m) => {
  const { verifier } = m.useModule(VerifierModule);

  const simpleCounter = m.contract("SimpleCounter", [verifier], {});

  return { simpleCounter };
});

export default SimpleCounterModule;
