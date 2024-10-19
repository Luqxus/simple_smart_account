import { ethers } from "hardhat";


const deploy = async () => {
	const simpleAccount = ethers.deployContract("AccountFactory");

	(await simpleAccount).waitForDeployment();

	console.log("Account Factory Address : ", (await simpleAccount).target) 
}


deploy();