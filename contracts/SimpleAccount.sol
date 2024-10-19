// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import "@account-abstraction/contracts/core/EntryPoint.sol";
import "@account-abstraction/contracts/interfaces/IAccount.sol";

contract SimpleAccount is IAccount {
    address owner;
    uint256 _count;

    constructor(address _owner) {
        owner = _owner;
    }

    function validateUserOp(
        UserOperation calldata,
        bytes32,
        uint256
    ) public pure returns (uint256 validationData) {
        return 0;
    }

    function execute() external {
        _count++;
    }
}

contract AccountFactory {
    function createAccount(address owner) external returns (address) {
        SimpleAccount account = new SimpleAccount(owner);
        return address(account);
    }
}
