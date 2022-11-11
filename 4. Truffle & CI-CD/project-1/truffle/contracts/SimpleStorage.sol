// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.17;

contract SimpleStorage {
    uint  storageData;

    constructor(uint _data){
        storageData=_data;
    }


    function get() public view returns(uint) {
        return storageData;
    }

    function set(uint n) public {
        storageData = n;
    }

}