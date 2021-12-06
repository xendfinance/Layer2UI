import Web3 from "web3";



const web3 = new Web3('https://bsc-dataseed.binance.org/');

export const getBSCXAutoAssetApy = async (tokenAddress: string) => {
	try {

		const contract = new web3.eth.Contract(poolContract.abi, poolContract.address);

		const apys = await contract.methods.recommend(tokenAddress).call();
		const apysOfInterest = [
			Number(apys._alpaca),
			Number(apys._fortube),
			Number(apys._venus)
		]

		const highestApy = Math.max.apply(null, apysOfInterest);
		const result = highestApy * Math.pow(10, -18)


		return result;

	} catch (e) {
		console.error(e);
		return 0
	}
}



const poolContract: any = {
	address: "0x21026da06d8979982D325Fd3321bdcf439cC3bD8",
	abi: [
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_token",
					"type": "address"
				}
			],
			"name": "recommend",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "_fulcrum",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_fortube",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_venus",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_alpaca",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	]
}