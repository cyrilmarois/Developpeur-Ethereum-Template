// SPDX-License-Identifier: GPL-3.0

pragma solidity >= 0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Voting is Ownable {

    uint8 _stepDuration = 100;              // Expressed in blocknumber
    uint256 _countdown;                     // blocknumber when the step begins
    uint256 _winningProposalId;             // id of the winning proposal
    uint256 _proposalIds;                   // index to increment

    WorkflowStatus public currentStep;    // step of the process

    address[] _addresses;
    Proposal[] public proposals;

    // mapping from address to voter
    mapping(address => Voter) public voters;

    // mapping from voter's address to proposal ids
    mapping(address => uint256[]) public voterProposals;

    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint votedProposalId;
    }

    struct Proposal {
        string description;
        uint256 voteCount;
    }

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
    event ProposalRegisteredEvent(uint proposalId);
    event VotedEvent(address voter, uint proposalId);

    /// @notice check if registered voter has been already registered
    modifier onlyRegistered() {
        require(voters[msg.sender].isRegistered, "Unauthorized ! U must registered !");
        _;
    }

    /// @notice check if registered voter has not been registered yet
    modifier onlyUnregistered(address _address) {
        require(!voters[_address].isRegistered, "Forbidden, U can't registered twice !");
        _;
    }

    /// @notice check step process
    modifier checkStep(WorkflowStatus _workflowStatus) {
        require(_workflowStatus == currentStep, "Forbidden, invalid current step");
        _;
    }

    modifier countDownValidity() {
        uint256 currentBlockNumber = _getCurrentBlockNumber();
        require(_countdown > currentBlockNumber, "Time's up ! U R too late");
        _;
    }


    /// @param _initStepDuration the default step duration
    constructor(uint8 _initStepDuration) Ownable() {
        if (_initStepDuration != 0) {
            _stepDuration = _initStepDuration;
        }
        _initializeStep();
        _initializeCountdown();
    }

    /// @notice register voters in a list
    /// @param _address address of the voter
    function addVoter(address _address) public onlyOwner checkStep(WorkflowStatus.RegisteringVoters) onlyUnregistered(_address) countDownValidity {
        voters[_address] = Voter({
            isRegistered: true,
            hasVoted: false,
            votedProposalId: 0
        });
        _addresses.push(_address);

        emit VoterRegisteredEvent(_address);
    }

    /// @notice register a proposal
    /// @param _description the proposal's description
    function addProposal(string memory _description) public checkStep(WorkflowStatus.ProposalsRegistrationStarted) onlyRegistered countDownValidity
    {
        Proposal memory tmpProposal = Proposal({
            description: _description,
            voteCount: 0
        });
        proposals.push(tmpProposal);
        uint256 pId = _proposalIds;
        voterProposals[msg.sender].push(pId);

        emit ProposalRegisteredEvent(pId);
        _proposalIds++;
    }

    /// @notice vote for the proposals
    /// @param _proposalId the index of the proposal
    function vote(uint _proposalId) public checkStep(WorkflowStatus.VotingSessionStarted) onlyRegistered countDownValidity {
        Voter storage tmpVoter = voters[msg.sender];
        require(!tmpVoter.hasVoted, "Forbidden, U have already voted");
        tmpVoter.votedProposalId = _proposalId;
        tmpVoter.hasVoted = true;
        proposals[_proposalId].voteCount++;

        emit VotedEvent(msg.sender, _proposalId);
    }

    /// @notice get the proposalId who wins with the greater number of vote
    /// @return the id of proposal winner !
    function getWinninProposalId() public view checkStep(WorkflowStatus.VotesTallied) onlyRegistered returns (uint256) {
        return _winningProposalId;
    }

    /**
    * To allow multiple winners we should count twice
    * Then during the second count, we should only register proposals
    * which equals to max tmpVoteCount defined during the first round
    */
    function voteTallied() public onlyOwner checkStep(WorkflowStatus.VotesTallied) {
        uint256 tmpVoteCount;
        for(uint i; i < proposals.length; i++) {
            if (proposals[i].voteCount > tmpVoteCount) {
                _winningProposalId = i;
                tmpVoteCount = proposals[i].voteCount;
            }
        }
    }

    /// @notice get voter data
    /// @param _address voter's adress
    /// @return Voter the voter
    function getVoterInfo(address _address) public view onlyRegistered returns (Voter memory) {
        return voters[_address];
    }

    /// @notice get the remaining duration
    function getRemainingDuration() public view returns (uint256) {
        uint256 currentBlockNumber = _getCurrentBlockNumber();
        return _countdown - currentBlockNumber;
    }

    /// @notice activate voter registration step
    function activateVotersRegistration() public onlyOwner {
        WorkflowStatus _previousStatus = currentStep;
        _setCurrentStep(WorkflowStatus.RegisteringVoters);
        _initializeCountdown();
        emit WorkflowStatusChangeEvent(_previousStatus, currentStep);
    }

    /// @notice desactivate voter registration step
    function desactivateVotersRegistration() public onlyOwner {
        WorkflowStatus _previousStatus = currentStep;
        _setCurrentStep(WorkflowStatus.ProposalsRegistrationEnded);
        emit WorkflowStatusChangeEvent(_previousStatus, currentStep);
    }

    /// @notice activate Proposal registration step
    function activateProposalsRegistration() public onlyOwner {
        WorkflowStatus _previousStatus = currentStep;
        _setCurrentStep(WorkflowStatus.ProposalsRegistrationStarted);
        _initializeCountdown();
        emit WorkflowStatusChangeEvent(_previousStatus, currentStep);
    }

    /// @notice desactivate Proposal registration step
    function desactivateProposalsRegistration() public onlyOwner {
        WorkflowStatus _previousStatus = currentStep;
        _setCurrentStep(WorkflowStatus.ProposalsRegistrationEnded);
        emit WorkflowStatusChangeEvent(_previousStatus, currentStep);
    }

    /// @notice activate voting sesion step
    function activateVotingSession() public onlyOwner {
        WorkflowStatus _previousStatus = currentStep;
        _setCurrentStep(WorkflowStatus.VotingSessionStarted);
        _initializeCountdown();
        emit WorkflowStatusChangeEvent(_previousStatus, currentStep);
    }

    /// @notice activate voting tallied step
    function activateVotingTallied() public onlyOwner {
        WorkflowStatus _previousStatus = currentStep;
        _setCurrentStep(WorkflowStatus.VotesTallied);
        emit WorkflowStatusChangeEvent(_previousStatus, currentStep);
    }

    /// @notice reset voting project
    function reset() public onlyOwner {
        // reset voter Status
        _resetVoters();
        // reset proposals count
        _resetProposals();
        // reset step to allow new votes
        _setCurrentStep(WorkflowStatus.RegisteringVoters);
    }

    /// @notice set current step
    function _setCurrentStep(WorkflowStatus _newStatus) private {
        currentStep = _newStatus;
    }

    /// @notice initialize first step
    function _initializeStep() private {
        _setCurrentStep(WorkflowStatus.RegisteringVoters);
    }

    /// @notice get current block number
    function _getCurrentBlockNumber() private view returns (uint256) {
        return block.number;
    }

    /// @notice set the countdown for a step
    function _initializeCountdown() private {
        _countdown = block.number + _stepDuration;
    }

    /// @notice reset voters
    function _resetVoters() private {
        for(uint i = _addresses.length; i > 0 ; i--) {
            voters[_addresses[i-1]].isRegistered = false;
            voters[_addresses[i-1]].hasVoted = false;
            voters[_addresses[i-1]].votedProposalId = 0;
        }
    }

    /// @notice reset proposals
    function _resetProposals() private {
        for (uint i = proposals.length; i > 0; i--) {
            Proposal storage tmpProposal = proposals[i-1];
            tmpProposal.description = '';
            tmpProposal.voteCount = 0;
        }
    }
}