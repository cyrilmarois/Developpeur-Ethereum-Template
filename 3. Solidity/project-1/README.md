# Voting projet

## Requirements

1. Run the `npm install` command to install openzeppelin smart contract dependencies
2. Deploy the contract

## How do I play with it ?

### The deployment

At the deployment, you can configure a duration (exprimed in **blocknumber**) to define how long a step can last.

### Register the voters (OnlyOwner)

When you deployed the **smart contract** (SC), the **registerVoters** step is initialized. You can immediately start to register some voters with their ethereum address thought the method **addVoter**.
A _voter_ can be registered only once.

### Submit a proposal

The owner should explicitely start the proposal registration thought the **activateProposalsRegistration** method (it ends the previous voter registration step). It also reset the countdown for this new step.

Only registered _voter_ is able to submit a proposal thought the **addProposal** method.
There is no limitation of proposal a _voter_ can submit.

### The voting

The owner of the _SC_, can start the voting sesssion with **activateVotingSession** method (it ends the previous proposal submit step). It also reset the countdown for this new step. The _voters_ can call the **vote** method with the id of the proposal.

**Attention**:

A _voter_ cannot vote twice, so choose wisely ;)

### The winner (OnlyOwner)

At last, the owner of the _SC_ can call the **activateVotingTallied** method to start the step, then with the **voteTallied** method, the tallied will began.

Finally the **getWinninProposalId** method allow to every registered _voter_ to see which proposal has won (only one)

---

| Method               | Argument  | Description                                                   |
| -------------------- | --------- | ------------------------------------------------------------- |
| getVoterInfo         | \_address | allow a register user to see info on another registered voter |
| getRemainingDuration | N/A       | allow to see how many bloc still left before a step end       |
|                      |           |                                                               |
