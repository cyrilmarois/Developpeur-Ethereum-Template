// SPDX-License-Identifier: GPL-3.0

pragma solidity >= 0.8.17;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

contract Voting is Ownable {

    uint8 _stepDuration = 10;        // Expressed in blocknumber
    uint256 _blockNumberTimer;       // blocknumber when the step begins
    uint256 winningProposalId;      // id of the winning proposal

    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint votedProposalId;
    }

    struct Proposal {
        string description;
        uint256 voteCount;
    }

    WorkflowStatus private _currentStep;              // step of the process
    Proposal[] public proposals;

    // mapping from address to voter
    mapping(address => Voter) public voters;

    // mapping from address of the voter to proposals ids
    mapping(address => uint256[]) public voterProposals;

    enum WorkflowStatus {
        RegisteringVoters,
        ProposalsRegistrationStarted,
        ProposalsRegistrationEnded,
        VotingSessionStarted,
        VotingSessionEnded,
        VotesTallied
    }

    event VoterRegisteredEvent(address voterAddress);
    event WorkflowStatusChangeEvent(WorkflowStatus previousStatus, WorkflowStatus newStatus);
    event ProposalRegistedEvent(uint proposalId);
    event VotedEvent(address voter, uint proposalId);

    /// @param _initStepDuration the default step duration
    constructor(uint8 _initStepDuration) {
        if (_initStepDuration != 0) {
            _stepDuration = _initStepDuration;
        }
        _initializeStep();
    }

    /// @notice check if registered voter exists and is whitelisted
    modifier checkVoterAccess() {
        require(voters[msg.sender].isRegistered, "Forbidden, U must have been registered to continue");
        _;
    }

    /// @notice check step process
    modifier checkStep(WorkflowStatus _workflowStatus) {
        require(_workflowStatus == _currentStep, "Forbidden, U can't do this now");
        _;
    }

    /// @notice register voters in a list
    // function registerVoters() onlyOwner checkStep(WorkflowStatus.RegisteringVoters) public  {
    function registerVoters(address[] memory _addresses) public onlyOwner {
        while(_blockNumberTimer < _blockNumberTimer + _stepDuration) {
            for(uint i; i < _addresses.length; i++) {
                voters[_addresses[i]] = Voter({
                    isRegistered: true,
                    hasVoted: false,
                    votedProposalId: 0
                });

                emit VoterRegisteredEvent(_addresses[i]);
            }
        }
    }

    /// @notice register a proposal
    /// @param _description the description of the proposal
    function submitProposal(string memory _description) public checkVoterAccess checkStep(WorkflowStatus.ProposalsRegistrationStarted) {
        while(_blockNumberTimer < _blockNumberTimer + _stepDuration) {
            Proposal memory tmpProposal = Proposal({
                description: _description,
                voteCount: 0
            });
            proposals.push(tmpProposal);
            uint index = voterProposals[msg.sender].length + 1;
            voterProposals[msg.sender].push(index);


            emit ProposalRegistedEvent(index);
        }
    }

    /// @notice vote for the proposals
    /// @param _proposalId the index of the proposals
    function submitVote(uint _proposalId) public checkVoterAccess checkStep(WorkflowStatus.VotingSessionStarted) {
        require(!voters[msg.sender].hasVoted, "Forbidden, U have already voted");
        while(_blockNumberTimer < _blockNumberTimer + _stepDuration) {
            voters[msg.sender].votedProposalId = _proposalId;
            voters[msg.sender].hasVoted = true;
            proposals[_proposalId].voteCount++;

            emit VotedEvent(msg.sender, _proposalId);
        }
    }

    /// @notice get the proposalId who wins with the greater number of vote
    /// @return winningProposalId the id of proposal winner !
    function getWinner() public onlyOwner checkStep(WorkflowStatus.VotesTallied) returns (uint256) {
        uint256 tmpVoteCount;
        for(uint i; i < proposals.length; i++) {
            if (tmpVoteCount < proposals[i].voteCount
            ) {
                winningProposalId = i;
                tmpVoteCount = proposals[i].voteCount;
            }
        }

        return winningProposalId;
    }

    /// @notice change the step
    /// @param _previousStatus The old status to change
    /// @param _newStatus the new status to apply
    /// @return currentStep current step
    function changeStep(WorkflowStatus _previousStatus, WorkflowStatus _newStatus) public onlyOwner returns (WorkflowStatus currentStep){
        _setCurrentStep(_newStatus);
        _initializeBlockNumberTimer();
        emit WorkflowStatusChangeEvent(_previousStatus, _newStatus);
        return _newStatus;
    }

    /// @notice set current step
    function _setCurrentStep(WorkflowStatus _newStatus) private {
        _currentStep = _newStatus;
    }

    /// @notice initialize first step
    function _initializeStep() private {
        _setCurrentStep(WorkflowStatus.RegisteringVoters);
    }

    /// @notice set the timer for a step
    function _initializeBlockNumberTimer() private {
        _blockNumberTimer = block.number;
    }

    /// @notice return voters with proposal
    /// @param _address adress of the voter
    /// @return Voter the voter struct
    function getVoter(address _address) public view checkVoterAccess returns(Voter memory) {
        return voters[_address];
    }
}