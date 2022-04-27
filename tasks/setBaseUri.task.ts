import { task } from 'hardhat/config'
import { abi } from '../artifacts/contracts/GisERC721Token.sol/GisERC721Token.json'


task("setBaseUri", "Set baseTokenURI")
    .addParam("contract", "Contract address")
    .addParam("baseUri", "The base of the tokenURI endpoint to set")
    .setAction(async (taskArgs, { ethers }) => {
        const [signer] = await ethers.getSigners()
        const contract = taskArgs.contract
        const baseURI = taskArgs.baseUri

        const gisToken = new ethers.Contract(
            contract,
            abi,
            signer
        )

        const tx = await gisToken.setBaseURI(baseURI)
        console.log(tx)
    })