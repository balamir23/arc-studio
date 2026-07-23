// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTCollection is ERC721 {
    uint256 public nextTokenId;
    address public owner;

    constructor(
        string memory name_,
        string memory symbol_,
        address owner_
    ) ERC721(name_, symbol_) {
        owner = owner_;
    }

    function mint(address to) external returns (uint256) {
        require(msg.sender == owner, "Only owner");

        uint256 tokenId = nextTokenId;

        _safeMint(to, tokenId);

        nextTokenId++;

        return tokenId;
    }
}