// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {Test, console} from "forge-std/Test.sol";
import {PaymentProcessor} from "../src/PaymentProcessor.sol";

contract PaymentProcessorTest is Test {
    PaymentProcessor public processor;
    address payable public recipient;
    address payable public owner;
    address public payer;
    uint256 public orderId;

    event PaymentReceived(address payer, uint256 amount);
    event OrderPaid(
        address payer,
        uint256 amount,
        uint256 orderId,
        address recipient,
        uint256 recipientAmount,
        address owner,
        uint256 ownerAmount,
        uint256 recipientPercentage
    );

    function setUp() public {
        // Setup accounts with labels for better trace output
        owner = payable(makeAddr("owner"));
        recipient = payable(makeAddr("recipient"));
        payer = makeAddr("payer");
        vm.label(owner, "owner");
        vm.label(recipient, "recipient");
        vm.label(payer, "payer");

        // Deploy contract as owner
        vm.prank(owner);
        processor = new PaymentProcessor();

        // Fund payer account
        vm.deal(payer, 100 ether);
        orderId = 1;
    }

    function test_InitialOwnership() public view {
        assertEq(processor.owner(), owner);
    }

    function test_SuccessfulPayment() public {
        uint256 paymentAmount = 1 ether;
        uint256 recipientPercentage = 90;

        uint256 expectedRecipientAmount = (paymentAmount *
            recipientPercentage) / 100;
        uint256 expectedOwnerAmount = paymentAmount - expectedRecipientAmount;

        uint256 initialRecipientBalance = recipient.balance;
        uint256 initialOwnerBalance = owner.balance;

        vm.prank(payer);
        vm.expectEmit(true, true, true, true);
        emit OrderPaid(
            payer,
            paymentAmount,
            orderId,
            recipient,
            expectedRecipientAmount,
            owner,
            expectedOwnerAmount,
            recipientPercentage
        );

        processor.payOrder{value: paymentAmount}(
            recipient,
            orderId,
            recipientPercentage
        );

        assertEq(
            recipient.balance,
            initialRecipientBalance + expectedRecipientAmount
        );
        assertEq(owner.balance, initialOwnerBalance + expectedOwnerAmount);
    }

    function testFuzz_PaymentWithDifferentAmounts(
        uint96 paymentAmount,
        uint256 recipientPercentage
    ) public {
        // Bound the percentage to valid ranges
        recipientPercentage = bound(recipientPercentage, 1, 100);
        // Ensure payment amount is not 0
        vm.assume(paymentAmount > 0);

        uint256 expectedRecipientAmount = (uint256(paymentAmount) *
            recipientPercentage) / 100;
        uint256 expectedOwnerAmount = uint256(paymentAmount) -
            expectedRecipientAmount;

        uint256 initialRecipientBalance = recipient.balance;
        uint256 initialOwnerBalance = owner.balance;

        vm.deal(payer, uint256(paymentAmount));

        vm.prank(payer);
        processor.payOrder{value: paymentAmount}(
            recipient,
            orderId,
            recipientPercentage
        );

        assertEq(
            recipient.balance,
            initialRecipientBalance + expectedRecipientAmount
        );
        assertEq(owner.balance, initialOwnerBalance + expectedOwnerAmount);
    }

    function test_ReceiveFallback() public {
        uint256 paymentAmount = 1 ether;

        vm.prank(payer);
        vm.expectEmit(true, true, true, true);
        emit PaymentReceived(payer, paymentAmount);

        (bool success, ) = address(processor).call{value: paymentAmount}("");
        assertTrue(success);
    }

    function test_MultiplePayments() public {
        uint256[] memory amounts = new uint256[](3);
        amounts[0] = 0.5 ether;
        amounts[1] = 1 ether;
        amounts[2] = 2 ether;

        uint256[] memory percentages = new uint256[](3);
        percentages[0] = 90;
        percentages[1] = 80;
        percentages[2] = 95;

        for (uint256 i = 0; i < amounts.length; i++) {
            uint256 expectedRecipientAmount = (amounts[i] * percentages[i]) /
                100;
            uint256 expectedOwnerAmount = amounts[i] - expectedRecipientAmount;

            uint256 initialRecipientBalance = recipient.balance;
            uint256 initialOwnerBalance = owner.balance;

            vm.prank(payer);
            processor.payOrder{value: amounts[i]}(
                recipient,
                orderId + i,
                percentages[i]
            );

            assertEq(
                recipient.balance,
                initialRecipientBalance + expectedRecipientAmount
            );
            assertEq(owner.balance, initialOwnerBalance + expectedOwnerAmount);
        }
    }

    function test_OwnershipTransfer() public {
        address payable newOwner = payable(makeAddr("newOwner"));

        vm.prank(owner);
        processor.transferOwnership(newOwner);

        assertEq(processor.owner(), newOwner);

        // Test payment with new owner
        uint256 paymentAmount = 1 ether;
        uint256 recipientPercentage = 90;

        uint256 expectedRecipientAmount = (paymentAmount *
            recipientPercentage) / 100;
        uint256 expectedOwnerAmount = paymentAmount - expectedRecipientAmount;

        vm.prank(payer);
        processor.payOrder{value: paymentAmount}(
            recipient,
            orderId,
            recipientPercentage
        );

        // Verify funds went to new owner
        assertEq(newOwner.balance, expectedOwnerAmount);
    }

    function test_RevertIf_ZeroPayment() public {
        vm.prank(payer);
        vm.expectRevert(); // Expect the transaction to revert
        processor.payOrder{value: 0}(recipient, orderId, 90);
    }

    function test_RevertIf_InvalidRecipient() public {
        vm.prank(payer);
        vm.expectRevert(); // Expect the transaction to revert
        processor.payOrder{value: 1 ether}(payable(address(0)), orderId, 90);
    }

    function test_RevertIf_InvalidPercentage() public {
        vm.prank(payer);
        vm.expectRevert(); // Expect the transaction to revert
        processor.payOrder{value: 1 ether}(recipient, orderId, 101);
    }

    function test_RevertIf_NonOwnerTransfer() public {
        address payable newOwner = payable(makeAddr("newOwner"));

        vm.prank(payer);
        vm.expectRevert(); // Expect the transaction to revert
        processor.transferOwnership(newOwner);
    }
}
