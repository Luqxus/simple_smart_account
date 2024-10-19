import { ethers } from "hardhat";

const nonce = 1;

const execute = async () => {

	const [signer0] = await ethers.getSigners();
	const address0 = await signer0.getAddress();

	// const address0 = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

	console.log("==========================", signer0)
	console.log("----------------------------", address0);

	const accountFactoryAddr = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
	const entryPointAddr = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
	const sender =  ethers.getCreateAddress({
		from: accountFactoryAddr,
		nonce: nonce
	});	

	const entryPoint = await ethers.getContractAt("EntryPoint",entryPointAddr);

	const accountFactory = await ethers.getContractFactory("AccountFactory");
	const initCode = accountFactoryAddr + accountFactory.interface.encodeFunctionData("createAccount", [address0]).slice(2);
	const SimpleAccount = await ethers.getContractFactory("SimpleAccount");

	await entryPoint.depositTo(sender,{
		value: ethers.parseEther("100")
	})


	console.log("=======================TTTTT",sender);

	// const n = await entryPoint.getNonce(sender, 0);

	// console.log("iiiiiiiiiiiiiiiiiiiiiiiiii  Nonce ", n);
	

	const userOpt = {
		sender,
		nonce: 2,
		initCode,
		callData: SimpleAccount.interface.encodeFunctionData("execute"),
		callGasLimit: 200_000,
		verificationGasLimit: 200_000,
		preVerificationGas: 50_000,
		maxFeePerGas: ethers.parseUnits("10", "gwei"),
		maxPriorityFeePerGas: ethers.parseUnits("5", "gwei"),
		paymasterAndData: "0x",
		signature: "0x"
	}
	
	const tx = await entryPoint.handleOps([userOpt], address0);
	
	const receipt = await tx.wait();

	console.log(receipt);
}

execute();