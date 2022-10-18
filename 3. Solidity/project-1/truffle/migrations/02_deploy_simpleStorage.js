// Import du SC
const SimpleStorage = artifacts.require("SimpleStorage");
const defaultValue = 1;

module.exports = (deployer) => {
  // Deploy SC
  deployer.deploy(SimpleStorage, defaultValue);
};
