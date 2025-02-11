// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract PaymentProcessor is Ownable {
    // Events
    event PaymentReceived(address payer, uint256 amount);
    event OrderPaid(
        address payer,
        uint256 amount,
        string orderId,
        address recipient,
        uint256 recipientAmount,
        address owner,
        uint256 ownerAmount,
        uint256 merchantPercentage // Represents percentage * 100 (2 decimal places)
    );

    constructor() Ownable(msg.sender) {}

    // Function to pay for an order
    function payOrder(
        address payable recipient,
        string memory orderId,
        uint256 merchantPercentage
    ) external payable {
        require(msg.value > 0, "Must send ETH");
        require(recipient != address(0), "Invalid recipient address");
        require(merchantPercentage <= 10000, "Percentage cannot exceed 100%"); // 10000 corresponds to 100.00%

        uint256 recipientAmount = (msg.value * merchantPercentage) / 10000;
        uint256 ownerAmount = msg.value - recipientAmount;

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
        
        recipient.transfer(recipientAmount);
        payable(owner()).transfer(ownerAmount);
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
