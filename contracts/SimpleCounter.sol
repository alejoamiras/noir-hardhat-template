// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import { IVerifier } from "./VerifierKeccak.sol";

contract SimpleCounter {
    IVerifier public verifier;
    uint256 public counter;

    constructor(address _verifier) {
        verifier = IVerifier(_verifier);
    }

    function updateCounterIfVerified(bytes calldata _proof, bytes32[] calldata _publicInputs) external {
        bool valid = verifier.verify(_proof, _publicInputs);
        if (valid) {
            counter += 1;
        }
    }
}