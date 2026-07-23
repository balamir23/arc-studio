// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract ArcTestnetDegenNFT is ERC721URIStorage {
    uint256 public nextTokenId;
    string public constant TOKEN_URI =
        "ipfs://REPLACE_WITH_METADATA_URI";

    constructor() ERC721("ARC Testnet Degen NFT", "DEGEN") {}

    function mint() external {
        uint256 tokenId = nextTokenId;

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, TOKEN_URI);

        unchecked {
            nextTokenId++;
        }
    }

    function totalMinted() external view returns (uint256) {
        return nextTokenId;
    }
}