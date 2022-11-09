pragma solidity ^0.8.17;

contract Sample {

    mapping(address => uint256) balances;
    event depositSuccess(address to, uint256 amount);
    event depositFail(address to);

    fallback() payable external {
        require(msg.data.length == 0);
        emit depositFail(msg.sender);
    }

    receive() payable external {
        emit depositSuccess(msg.sender, msg.value);
    }

    function deposit() payable external {
        require(msg.sender != address(0));
        require(msg.value > 1 wei);
        balances[msg.sender] += msg.value;
        emit depositSuccess(msg.sender, msg.value);
    }
}