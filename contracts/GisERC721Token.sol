// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract GisERC721Token is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private currentTokenId;
    string public baseTokenURI;
    
    constructor(string memory tokenName, string memory tokenSymbol) ERC721(tokenName, tokenSymbol) {
        baseTokenURI = "";
    }

    
    function mint(address recipient) public returns (uint256){
        currentTokenId.increment();
        uint256 newItemId = currentTokenId.current();
        _safeMint(recipient, newItemId);
        return newItemId;
    }

    function _baseURI() internal view override returns(string memory){
        return baseTokenURI;
    }

    function setBaseURI(string memory _URI) public {
        baseTokenURI = _URI;
    }
}
