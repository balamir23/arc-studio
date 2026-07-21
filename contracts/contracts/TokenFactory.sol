// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "./ForgeToken.sol";

contract TokenFactory {

    event TokenCreated(
        address indexed creator,
        address indexed token,
        string name,
        string symbol,
        uint256 supply
    );

    mapping(address => address[]) private userTokens;

    address[] public allTokens;

    function createToken(
        string memory name_,
        string memory symbol_,
        uint256 supply_
    ) external returns (address) {

        ForgeToken token = new ForgeToken(
            name_,
            symbol_,
            supply_,
            msg.sender
        );

        address tokenAddress = address(token);

        userTokens[msg.sender].push(tokenAddress);

        allTokens.push(tokenAddress);

        emit TokenCreated(
            msg.sender,
            tokenAddress,
            name_,
            symbol_,
            supply_
        );

        return tokenAddress;
    }

    function getTokensByOwner(
        address owner
    ) external view returns (address[] memory) {
        return userTokens[owner];
    }

    function getAllTokens()
        external
        view
        returns (address[] memory)
    {
        return allTokens;
    }
}