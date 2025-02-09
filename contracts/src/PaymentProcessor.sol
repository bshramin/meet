// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Address.sol";



contract PaymentProcessor is Ownable, ReentrancyGuard {
    using Address for address payable;

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
    ) external payable nonReentrant {
        require(msg.value > 0, "Must send ETH");
        require(recipient != address(0), "Invalid recipient address");
        require(merchantPercentage <= 100, "Percentage cannot exceed 100");

        uint256 recipientAmount = (msg.value * merchantPercentage) / 100;
        uint256 ownerAmount = msg.value - recipientAmount;

        // Safer ETH transfer to recipient
        recipient.sendValue(recipientAmount); // Uses Address.sendValue

        // Safer ETH transfer to owner
        payable(owner()).sendValue(ownerAmount); // Uses Address.sendValue

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
