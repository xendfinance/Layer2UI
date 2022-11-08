
import Web3 from 'web3';


const web3 = new Web3('https://bsc-dataseed.binance.org/');
const web3Matic = new Web3('https://polygon-mainnet.public.blastapi.io');



export const xVaultUserBalance = async (abi: any, address: string, userAddress: string) => {
	try {
		       
		const contract = new web3.eth.Contract(abi, address);
		const balance = await contract.methods.balanceOf(userAddress).call()
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




export const xAutoMATICUserBalance = async (
	abi: any,
	address: string,
	userAddress: string,
	tokenName: string) => {
	try {

		const contract = new web3Matic.eth.Contract(abi, address);
		let balance = await contract.methods.balanceOf(userAddress).call()
		if (tokenName === 'AAVE') {
			balance = web3Matic.utils.fromWei(balance.toString(), 'ether');
		} else if (tokenName === 'WBTC') {
			balance = Number(balance) / Number(BigInt(1e8).toLocaleString('fullwide', { useGrouping: false }))
		} else {
			balance = web3Matic.utils.fromWei(balance.toString(), 'mwei');
		}
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

		if (tokenName === 'BNB') {
			let balance = await web3.eth.getBalance(user);
			balance = web3.utils.fromWei(balance.toString(), 'ether')
			return balance;
		}

	} catch (e) {
		console.error(e)
		return '0'
	}
}



export const polygonTokenBalance = async (
	tokenName: string,
	abi: any,
	tokenAddress: string,
	user: string) => {

	try {

		const token = new web3Matic.eth.Contract(abi, tokenAddress);
		let balance = await token.methods.balanceOf(user).call();

		if (tokenName === 'AAVE') {
			balance = web3Matic.utils.fromWei(balance.toString(), 'ether')
		} else if (tokenName === 'WBTC') {
			balance = Number(balance) / Number(BigInt(1e8).toLocaleString('fullwide', { useGrouping: false }))
		} else {
			balance = web3Matic.utils.fromWei(balance.toString(), 'mwei')
		}

		return balance;

	} catch (e) {
		console.error(e)
		return '0'
	}
}








export const toFixed = (x) => {
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


export const removeDecimals = (x: any) => {
	return String(x).split('.')[0]
}