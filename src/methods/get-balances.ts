
import Web3 from 'web3';
import CoinGecko from 'coingecko-api';

const web3 = new Web3('https://bsc-dataseed.binance.org/');
const web3Matic = new Web3('https://polygon-rpc.com/');
// const web3Matic = new Web3('https://polygon-mainnet.g.alchemy.com/v2/A3s0YpUEWXboRTynlFb0jh4HcT0934ak');



export const xVaultUserBalance = async (abi: any, address: string, userAddress: string) => {
	try {

		const contract = new web3.eth.Contract(abi, address);
		const balance = await contract.methods.balanceOf(userAddress).call()
		console.log(address, ' the price addrss')
		const ppfs = await contract.methods.pricePerShare().call()

		const amount = (Number(ppfs) * Number(balance)) / Number(BigInt(1e36).toLocaleString('fullwide', { useGrouping: false }));

		return toFixed(amount)

	} catch (e) {
		console.error(e);
		return null

	}
}


export const xAutoBSCUserBalance = async (abi: any, address: string, userAddress: string) => {
	try {

		const contract = new web3.eth.Contract(abi, address);
		const balance = await contract.methods.balanceOf(userAddress).call()

		const ppfs = await contract.methods.getPricePerFullShare().call()

		const amount = (Number(ppfs) * Number(balance)) / Number(BigInt(1e36).toLocaleString('fullwide', { useGrouping: false }));

		return toFixed(amount)

	} catch (e) {
		console.error(e);
		return null

	}
}




export const xAutoMATICUserBalance = async (abi: any, address: string, userAddress: string) => {
	try {

		const contract = new web3Matic.eth.Contract(abi, address);
		console.log(address, ' thje')
		let balance = await contract.methods.balanceOf(userAddress).call()
		console.log(balance)
		balance = web3Matic.utils.fromWei(balance.toString(), 'ether');
		return toFixed(balance)

	} catch (e) {
		console.error(e);
		return null

	}
}




export const bscTokenBalance = async (
	tokenName: string,
	abi: any,
	tokenAddress: string,
	user: string) => {

	try {
		if (tokenName !== 'BNB') {

			const token = new web3.eth.Contract(abi, tokenAddress);
			let balance = await token.methods.balanceOf(user).call();
			balance = web3.utils.fromWei(balance.toString(), 'ether')
			return balance;
		}
	} catch (e) {
		console.error(e)
		return '0'
	}
}









function toFixed(x) {
	if (Math.abs(x) < 1.0) {
		var e = parseInt(x.toString().split('e-')[1]);
		if (e) {
			x *= Math.pow(10, e - 1);
			x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
		}
	} else {
		var e = parseInt(x.toString().split('+')[1]);
		if (e > 20) {
			e -= 20;
			x /= Math.pow(10, e);
			x += (new Array(e + 1)).join('0');
		}
	}
	return x;
}