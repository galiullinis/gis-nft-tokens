import hre from 'hardhat';
import "dotenv/config";

const ethers = hre.ethers
const uri = process.env.ERC1155_METADATA_URL

async function main() {
    const [signer] = await ethers.getSigners()
    const GisERC1155Token = await ethers.getContractFactory('GisERC1155Token', signer)
    const gisToken1155 = await GisERC1155Token.deploy(uri)
    await gisToken1155.deployed()
    console.log(gisToken1155.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });