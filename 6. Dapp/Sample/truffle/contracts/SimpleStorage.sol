// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SimpleStorage is ERC20 {
  uint256 value;
  string greeter;

  event valueChanged(uint256 _val);

  constructor() ERC20('Alyra', 'ALY') {

  }

  function mint() external {
    _mint(msg.sender, 100000);
  }

  receive() external payable {}

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
