import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { Interface } from "ethers/lib/utils";
import { ethers } from "hardhat";

describe("GisERC1155Token", () => {
    let owner: SignerWithAddress;
    let account1: SignerWithAddress
    let nftToken1155: Contract;

    const tokenBaseUrl = "https://bafybeiek3erxmgc3udrjwuuuoq6hktq2nw74xmqgvgcxdy5dcti7exc3ja.ipfs.nftstorage.link/ipfs/bafybeiek3erxmgc3udrjwuuuoq6hktq2nw74xmqgvgcxdy5dcti7exc3ja/"

    beforeEach(async () => {
        [owner, account1] = await ethers.getSigners()
        const GisERC1155Token = await ethers.getContractFactory("GisERC1155Token", owner)
        
        nftToken1155 = await GisERC1155Token.deploy(tokenBaseUrl)
        await nftToken1155.deployed()
        console.log(nftToken1155.address)

        nftToken1155.grantRole(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("MINTER_ROLE")), owner.address)
    })

    it("should mint onlyMinter", async () => {
        const mintAmount = 10
        const firstId = 1
        await expect(nftToken1155.connect(account1)["mint(address,uint256)"](owner.address, mintAmount)).to.be.revertedWith("don't have minter role.")
    })

    it("should correct mint", async () => {
        const mintAmount = 10
        const firstId = 1
        await nftToken1155["mint(address,uint256)"](owner.address, mintAmount)
        expect(await nftToken1155.balanceOf(owner.address, firstId)).to.eq(mintAmount)
    })

    it("check url for tokenId", async () => {
        const mintAmount = 10
        const firstId = 1
        await nftToken1155["mint(address,uint256)"](owner.address, mintAmount)
        expect(await nftToken1155.uri(firstId)).to.eq(tokenBaseUrl + firstId)
    })

    it("should correct mintBatch", async () => {
        const amounts = [1,2,10]
        const ids = [1,2,3]
        await nftToken1155["mintBatch(address,uint256[])"](owner.address, amounts)
        expect(await nftToken1155.balanceOf(owner.address, ids[0])).to.eq(amounts[0])
        expect(await nftToken1155.balanceOf(owner.address, ids[1])).to.eq(amounts[1])
        expect(await nftToken1155.balanceOf(owner.address, ids[2])).to.eq(amounts[2])
    })
    
    it("get support interface", async () => {
        const functions = [
            "function mint(address _to, uint256 _amount, bytes memory _data) external returns(uint256)",
            "function mintBatch(address _to, uint256[] _amounts, bytes _data) external returns(uint256[])"
        ]
        const iface = new Interface(functions)

        const interfaceId = ethers.BigNumber.from(iface.getSighash("mint")).xor(ethers.BigNumber.from(iface.getSighash("mintBatch")))
        expect(await nftToken1155.supportsInterface(interfaceId)).to.eq(true)
    })
})