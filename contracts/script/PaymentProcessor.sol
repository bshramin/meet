// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {Script, console} from "forge-std/Script.sol";
import {PaymentProcessor} from "../src/PaymentProcessor.sol";

contract PaymentProcessorScript is Script {
    PaymentProcessor public processor;

    function setUp() public {}

    function run() public {
        // Retrieve private key from environment
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        // Deploy the contract
        processor = new PaymentProcessor();

        // Log the deployment address
        console.log("PaymentProcessor deployed to:", address(processor));

        vm.stopBroadcast();
    }
}
