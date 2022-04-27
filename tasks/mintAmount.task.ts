import { task } from 'hardhat/config'
import { abi } from '../artifacts/contracts/GisERC1155Token.sol/GisERC1155Token.json'


task("mintAmount", "Mint tokens with amount")
    .addParam("contract", "Contract address")
    .addParam("account", "Recipient address")
    .addParam("amount", "Tokens amount")
    .setAction(async (taskArgs, { ethers }) => {
        const [signer] = await ethers.getSigners()
        const contract = taskArgs.contract
        const account = taskArgs.account
        const amount = taskArgs.amount
        const gisToken1155 = new ethers.Contract(
            contract,
            abi,
            signer
        )

        const tx = await gisToken1155.mint(account, amount)
        console.log(tx)
    })