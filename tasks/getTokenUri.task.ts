import { task } from 'hardhat/config'
import { abi } from '../artifacts/contracts/GisERC721Token.sol/GisERC721Token.json'


task("getTokenUri", "Get tokenURI")
    .addParam("contract", "Contract address")
    .addParam("tokenId", "The tokenId to fetch metadata for")
    .setAction(async (taskArgs, { ethers }) => {
        const [signer] = await ethers.getSigners()
        const contract = taskArgs.contract
        const tokenId = taskArgs.tokenId

        const gisToken = new ethers.Contract(
            contract,
            abi,
            signer
        )

        const tokenURI = await gisToken.tokenURI(tokenId)
        console.log("TokenURI: " + tokenURI)
    })