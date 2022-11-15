// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SimpleStorage {
  uint256 value;
  string greeter;

  event valueChanged(uint256 _val);

  function read() public view returns (uint256) {
    return value;
  }

  function write(uint256 newValue) public {
    require(newValue != 5, "Invalid input, 5 is forbidden");
    value = newValue;
    emit valueChanged(newValue);
  }

  function setGreeter(string memory _say) external {
    greeter = _say;
  }

  function getGreeter() view external returns (string memory) {
    return greeter;
  }
}
