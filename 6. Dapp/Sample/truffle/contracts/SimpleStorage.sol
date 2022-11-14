// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SimpleStorage {
  uint256 value;
  string greeter;

  function read() public view returns (uint256) {
    return value;
  }

  function write(uint256 newValue) public {
    value = newValue;
  }

  function setGreeter(string memory _say) external {
    greeter = _say;
  }

  function getGreeter() view external returns (string memory) {
    return greeter;
  }
}
