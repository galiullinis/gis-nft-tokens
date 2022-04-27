import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

describe("GisERC721Token", () => {
    let owner: SignerWithAddress;
    let nftToken: Contract;

    const tokenName = "GisERC721Token"
    const tokenSymbol = "GNFT"

    beforeEach(async () => {
        [owner] = await ethers.getSigners()
        const GisERC721Token = await ethers.getContractFactory("GisERC721Token", owner)
        
        nftToken = await GisERC721Token.deploy(tokenName, tokenSymbol)
        await nftToken.deployed()
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
})