// Import du SC
const AlyraToken = artifacts.require("AlyraToken");
const initialSupply = 10000;

module.exports = (deployer) => {
  // Deploy SC
  deployer.deploy(AlyraToken, initialSupply);
};
