import Web3 from 'web3';
import CoinGecko from 'coingecko-api';


const web3 = new Web3('https://bsc-dataseed.binance.org/');
const web3Matic = new Web3('https://polygon-mainnet.g.alchemy.com/v2/A3s0YpUEWXboRTynlFb0jh4HcT0934ak');

export const xVaultBSCTvl = async (abi: any, address: string) => {
	try {
		const contract = new web3.eth.Contract(abi, address);
		let totalAssets = await contract.methods.totalAssets().call();
		totalAssets = web3.utils.fromWei(totalAssets.toString(), 'ether');
		return totalAssets;
	} catch (e) {
		console.error(e);
		return null;
	}
}


export const xAutoBSCTvl = async (abi: any, address: string, tokenName: string) => {
	try {
		const contract = new web3.eth.Contract(abi, address);
		let totalAssets = await contract.methods.calcPoolValueInToken().call();
		totalAssets = web3.utils.fromWei(totalAssets.toString(), 'ether');

		if (tokenName === 'BNB') {

			const coinGecko = new CoinGecko();
			const binanceCoin = await coinGecko.coins.fetch('binancecoin', {})
			let bnbPrice = parseFloat(binanceCoin.data.market_data.current_price.usd);
			totalAssets = (Number(totalAssets) * Number(bnbPrice));
		}

		return totalAssets;

	} catch (e) {
		console.error(e);
		return null;
	}
}



export const xAutoMATICTvl = async (abi: any, address: string, tokenName: string) => {
	try {

		const contract = new web3Matic.eth.Contract(abi, address);
		
		let totalAssets = await contract.methods.calcPoolValueInToken().call();
	
		if (tokenName === 'AAVE') {
			totalAssets = web3Matic.utils.fromWei(totalAssets.toString(), 'ether');
		} else if (tokenName === 'WBTC') {
			if(Number(totalAssets) > 0 ){
				totalAssets = Number(totalAssets) / Number(BigInt(1e8).toLocaleString('fullwide', { useGrouping: false }))
				
			}else{
				totalAssets = '0';
			}
			
		} else {
			totalAssets = web3Matic.utils.fromWei(totalAssets.toString(), 'mwei');
		}

		return totalAssets;

	} catch (e) {
		console.error(e);
		return null;
	}
}