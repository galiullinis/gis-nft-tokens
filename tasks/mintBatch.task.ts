import { task } from 'hardhat/config'
import { abi } from '../artifacts/contracts/GisERC1155Token.sol/GisERC1155Token.json'


task("mintBatch", "Mint batch tokens")
    .addParam("contract", "Contract address")
    .addParam("account", "Recipient address")
    .addParam("amounts", "Amounts of tokens(numbers separated by comma without space)")
    .setAction(async (taskArgs, { ethers }) => {
        const [signer] = await ethers.getSigners()
        const contract = taskArgs.contract
        const account = taskArgs.account
        const amounts: number[] = String(taskArgs.amounts).split(',').map(Number)

        const gisToken = new ethers.Contract(
            contract,
            abi,
            signer
        )

        const tx = await gisToken.mintBatch(account, amounts)
        console.log(tx)
    })