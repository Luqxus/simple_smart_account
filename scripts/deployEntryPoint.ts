import { ethers  } from "hardhat";

const deploy = async () => {
	
	const entryPoint = await ethers.deployContract("EntryPoint");

	await entryPoint.waitForDeployment()

	console.log("Entry Point Address : ", entryPoint.target);
}

deploy();