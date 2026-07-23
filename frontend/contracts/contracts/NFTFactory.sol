// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "./NFTCollection.sol";

contract NFTFactory {
    event CollectionCreated(
        address indexed creator,
        address indexed collection,
        string name,
        string symbol
    );

    mapping(address => address[]) private userCollections;

    address[] public allCollections;

    function createCollection(
        string memory name_,
        string memory symbol_
    ) external returns (address) {
        NFTCollection collection = new NFTCollection(
            name_,
            symbol_,
            msg.sender
        );

        address collectionAddress = address(collection);

        userCollections[msg.sender].push(collectionAddress);
        allCollections.push(collectionAddress);

        emit CollectionCreated(
            msg.sender,
            collectionAddress,
            name_,
            symbol_
        );

        return collectionAddress;
    }

    function getCollectionsByOwner(
        address owner
    ) external view returns (address[] memory) {
        return userCollections[owner];
    }

    function getAllCollections()
        external
        view
        returns (address[] memory)
    {
        return allCollections;
    }
}