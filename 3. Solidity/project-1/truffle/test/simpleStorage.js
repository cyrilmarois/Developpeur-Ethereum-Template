const SimpleStorage = artifacts.require("SimpleStorage");
const { BN, expectRevert, expectEvent } = require("@openzeppelin/test-helpers");
const { expect } = require("chai");
const constants = require("@openzeppelin/test-helpers/src/constants");

contract("SimpleStorage", (accounts) => {
  // accounts is the list of accounts provided when running ganache or whatever
  let owner = accounts[0];

  it("...should store the value 89.", async () => {
    const simpleStorageInstance = await SimpleStorage.deployed();

    // Set value of 89
    const uneTx = await simpleStorageInstance.set(89, { from: accounts[0] });

    // Get stored value
    const storedData = await simpleStorageInstance.get.call();

    assert.equal(storedData, 89, "The value 89 was not stored.");

    expect(storedData).to.be.bignumber.equal(new BN(89));
    await expectRevert(
      simpleStorageInstance.get(param, { from: owner }),
      "same error message returned by the SC"
    );
    expectEvent(uneTX, "eventName", { param1: value1, param2: value2 });
    console.log(`ceci est une ${variable}`);
  });
});
