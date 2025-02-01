// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract Counter {
    uint256 public number;

    // Events for counter changes
    event CounterIncreased(uint256 oldValue, uint256 newValue);
    event CounterSet(uint256 oldValue, uint256 newValue);

    function getCount() public view returns (uint256) {
        return number;
    }

    function setCounter(uint256 newNumber) public {
        uint256 oldValue = number;
        number = newNumber;
        emit CounterSet(oldValue, newNumber);
    }

    function increment() public {
        uint256 oldValue = number;
        number = number + 1;
        emit CounterIncreased(oldValue, number);
    }
}
