import { task } from 'hardhat/config'
import { abi } from '../artifacts/contracts/GisERC721Token.sol/GisERC721Token.json'


task("mint", "Mint tokens")
    .addParam("contract", "Contract address")
    .addParam("account", "Recipient address")
    .setAction(async (taskArgs, { ethers }) => {
        const [signer] = await ethers.getSigners()
        const contract = taskArgs.contract
        const account = taskArgs.account

        const gisToken = new ethers.Contract(
            contract,
            abi,
            signer
        )

        const tx = await gisToken.mint(account)
        console.log(tx)
    })