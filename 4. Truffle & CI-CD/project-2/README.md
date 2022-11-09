# Project 2

Those tests are based on the `Voting.sol` _smart contact_ build during the first project. They used the truffle suite https://trufflesuite.com/.

## Install the dependencies

```
$ > npm install
```

## Run the test

Be sure to have a ganache instance launched. If not go to https://www.npmjs.com/package/ganache to install it.

```
$ > npm run test
```

They performed tests on the full voting process.

1. Registering a voter
2. Add a proposal
3. Vote a proposal
4. Select the winning proposal

Default network is `development`. You can define a new one in `truffle-config.js`.

The gas report is activate by default. To deactivate the gas report, you should comment it in the config file.

NOTE: If there is any issue, please run `migrate --reset`

# Test report

| Solc version: 0.8.17+commit.8df45f5f | Optimizer enabled: false  | Runs: 200 | Block limit: 6718946 gas |         |             |               |
| ------------------------------------ | ------------------------- | --------- | ------------------------ | ------- | ----------- | ------------- |
| **Methods**                          |                           |           |                          |         |             |               |
| **Contract**                         | **Method**                | **Min**   | **Max**                  | **Avg** | **# calls** | **eur (avg)** |
| _Voting_                             | addProposal               | \_        | \_                       | 59484   |             |               |
| _Voting_                             | addVoter                  | \_        | \_                       | 50220   |             |               |
| _Voting_                             | endProposalsRegistering   | \_        | \_                       | 30599   |             |               |
| _Voting_                             | endVotingSession          | \_        | \_                       | 30533   |             |               |
| _Voting_                             | setVote                   | 60913     | 78013                    | 74593   |             |               |
| _Voting_                             | startProposalsRegistering | \_        | \_                       | 95032   |             |               |
| _Voting_                             | startVotingSession        | \_        | \_                       | 30554   |             |               |
| _Voting_                             | tallyVotes                | \_        | \_                       | 60661   |             |               |
| Deployments                          |                           |           |                          |         | % of limit  |               |
| Voting                               |                           |           |                          | 2077414 |             |               |

31 passing
