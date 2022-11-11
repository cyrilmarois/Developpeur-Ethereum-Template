const hre = require("hardhat");

async function main() {
  const texte = "bonjour";

  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy(texte);

  await greeter.deployed();

  console.log(`voici le texte: ${texte} deployed to ${greeter.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
