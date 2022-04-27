// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract GisERC1155Token is ERC1155 {
    using Strings for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private currentTokenId;
    
    constructor(string memory baseUrl) ERC1155(baseUrl) {}

    function mint(address _to, uint256 _amount) public {
        mintF(_to, _amount, "");
    }

    function mintF(address _to, uint256 _amount, bytes memory _data) public {
        currentTokenId.increment();
        _mint(_to, currentTokenId.current(), _amount, _data);
    }

    function mintBatch(address _to, uint256[] memory _amounts) public {
        mintBatchF(_to, _amounts, "");
    }

    function mintBatchF(address _to, uint256[] memory _amounts, bytes memory _data) public {
        uint256[] memory _ids = new uint256[](_amounts.length);
        for(uint256 i = 0; i < _amounts.length; i++){
            currentTokenId.increment();
            _ids[i] = currentTokenId.current();
        }
        _mintBatch(_to, _ids, _amounts, _data);
    }

    function uri(uint256 _tokenId) public view override returns(string memory){
        return string(abi.encodePacked(super.uri(_tokenId), _tokenId.toString()));
    }

}
