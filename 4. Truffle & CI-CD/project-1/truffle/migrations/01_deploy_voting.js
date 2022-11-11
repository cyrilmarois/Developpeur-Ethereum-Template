// Import du SC
const Voting = artifacts.require("Voting");
const stepDuration = 0;

module.exports = (deployer) => {
  // Deploy SC
  deployer.deploy(Voting, stepDuration);
};
