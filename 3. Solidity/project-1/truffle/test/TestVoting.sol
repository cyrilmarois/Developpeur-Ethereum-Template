pragma solidity >= 0.8.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Voting.sol";

contract TestVoting {
    uint8 stepDuration;

    function beforeAll() public {
        stepDuration = 100;
    }
    function testGetRemainingDuration() public {
        Voting voting = Voting(DeployedAddresses.Voting());

        Assert.equal(stepDuration, voting.getRemainingDuration(), "Default countdown must be 100");
    }
}