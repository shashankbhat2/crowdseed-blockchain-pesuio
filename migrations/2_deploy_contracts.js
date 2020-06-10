const Crowdseed = artifacts.require("Crowdseed");

module.exports = function(deployer) {
  deployer.deploy(Crowdseed);
};
