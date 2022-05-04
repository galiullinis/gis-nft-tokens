import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { Interface } from "ethers/lib/utils";
import { ethers } from "hardhat";

describe("GisERC721Token", () => {
    let owner: SignerWithAddress;
    let account1: SignerWithAddress;
    let nftToken: Contract;

    const tokenName = "GisERC721Token"
    const tokenSymbol = "GNFT"

    beforeEach(async () => {
        [owner, account1] = await ethers.getSigners()
        const GisERC721Token = await ethers.getContractFactory("GisERC721Token", owner)
        
        nftToken = await GisERC721Token.deploy(tokenName, tokenSymbol)
        await nftToken.deployed()
        nftToken.grantRole(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("MINTER_ROLE")), owner.address)
    })

    it("should mint onlyMinter", async () => {
        await expect(nftToken.connect(account1).mint(owner.address)).to.be.revertedWith("don't have minter role.")
    })

    it("should correct mint", async () => {
        await expect(nftToken.mint(owner.address)).to.emit(nftToken, "Transfer").withArgs(ethers.constants.AddressZero, owner.address, 1)
    })

    it("check baseURI", async () => {
        const baseUri = "https://example.com/"
        await nftToken.setBaseURI(baseUri)
        expect(await nftToken.baseTokenURI()).to.eq(baseUri)
    })

    it(("check token URI"),async () => {
        const baseUri = "https://example.com/"
        const id = 1

        await nftToken.setBaseURI(baseUri)
        await nftToken.mint(owner.address)
        expect(await nftToken.tokenURI(id)).to.eq(baseUri + id)
    })

    it("get support interface", async () => {
        const functions = [
            "function mint(address _to) external returns (uint256)"
        ]
        const iface = new Interface(functions)

        expect(await nftToken.supportsInterface(iface.getSighash("mint"))).to.eq(true)
    })
})