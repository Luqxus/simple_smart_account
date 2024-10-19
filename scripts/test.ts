import { ethers } from "hardhat";

const accountFactoryAddr = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const main = async () => {
	const simpleAccount = await ethers.getContractAt("SimpleAccount", accountFactoryAddr);

	const count = await simpleAccount.count();


}