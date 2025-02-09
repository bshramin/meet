// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";

contract PaymentProcessor is Ownable {
    // Events
    event PaymentReceived(address payer, uint256 amount);
    event OrderPaid(
        address payer,
        uint256 amount,
        uint256 orderId,
        address recipient,
        uint256 recipientAmount,
        address owner,
        uint256 ownerAmount,
        uint256 merchantPercentage
    );

    constructor() Ownable(msg.sender) {}

    // Function to pay for an order
    function payOrder(
        address payable recipient,
        uint256 orderId,
        uint256 merchantPercentage
    ) external payable {
        require(msg.value > 0, "Must send ETH");
        require(recipient != address(0), "Invalid recipient address");
        require(merchantPercentage <= 100, "Percentage cannot exceed 100");

        uint256 recipientAmount = (msg.value * merchantPercentage) / 100;
        uint256 ownerAmount = msg.value - recipientAmount;

        // Send recipient's share
        (bool successRecipient, ) = recipient.call{value: recipientAmount}("");
        require(successRecipient, "Failed to send ETH to recipient");

        // Send owner's share
        (bool successOwner, ) = payable(owner()).call{value: ownerAmount}("");
        require(successOwner, "Failed to send ETH to owner");

        emit OrderPaid(
            msg.sender,
            msg.value,
            orderId,
            recipient,
            recipientAmount,
            owner(),
            ownerAmount,
            merchantPercentage
        );
    }

    // Fallback and receive functions to accept ETH
    receive() external payable {
        emit PaymentReceived(msg.sender, msg.value);
    }

    fallback() external payable {
        emit PaymentReceived(msg.sender, msg.value);
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
