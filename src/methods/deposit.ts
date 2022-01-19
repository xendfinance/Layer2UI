import { Asset } from "./assets";
import Notify from 'bnc-notify';
import createContract from "./contracts/contract-creator";
import Web3 from "web3";
import { rehydrateVault } from "./hydrate";
import { notify } from "../components/core/Notifier";


interface IDepositAsset {
	amount: any
	asset: Asset
	client: string
}


export const depositAction = (data: IDepositAsset) => {
	return async (dispatch: Function) => {
		try {
			const receipt = await depositAsset(data);

			const properties = Object.keys(receipt);

			if (properties.includes('status') && receipt.status) {
				dispatch(rehydrateVault());
			} else {
				notify('error', 'Something went wrong')
			}


			if (receipt.message == 'User rejected the transaction' || receipt.message == 'User canceled') {
				notify('error', 'Transaction Rejected');
			}

		} catch (e) {
			console.error(e);
			notify('error', 'Transaction failed');
		}
	}
}



export const depositAsset = async ({
	amount,
	asset,
	client }: IDepositAsset) => {

	try {

		let notifyBNC = Notify({
			dappId: getDappId(asset.network),
			networkId: asset.network,
			mobilePosition: 'bottom',
			desktopPosition: 'bottomRight'
		})

		const token = await createContract(asset.tokenAbi, asset.tokenAddress);
		const contract = await createContract(asset.protocolAbi, asset.protocolAddress);

		if(asset.name !== 'BNB'){
			await token.methods['approve'](asset.protocolAddress, formatAmount(amount, asset.network, asset.name))
			.send({ from: client })
			.on('transactionHash', hash => {
				notifyBNC.hash(hash)
			})

				// deposit
			return await contract.methods['deposit'](formatAmount(amount, asset.network, asset.name))
			.send({ from: client })
			.on('transactionHash', hash => {
				notifyBNC.hash(hash)
			})
		}else{
			return await contract.methods['deposit']()
            .send({ from: client,
                    value:formatAmount(amount, asset.network, asset.name) })
            .on('transactionHash', (hash: string) => {
                console.log(hash, ' the transaction hash')
                notifyBNC.hash(hash);
            })
		}

	
		// approve
	

	


	} catch (e: any) {
		console.error(e);
		return { status: false, message: e.message }
	}
}




export const getDappId = (network: number) => {
	switch (network) {
		case 56: return 'a7f90c48-943a-4d3a-a8df-6ca5d0f7522a';
		case 137: return 'a7f90c48-943a-4d3a-a8df-6ca5d0f7522a';
		default: return '';
	}
}


export const formatAmount = (
	amount: any,
	network: number,
	assetName: string) => {

	if (network == 56) {
		return Web3.utils.toWei(amount, 'ether');
	} else if (network == 137) {

		if (assetName === 'WBTC') {
			return parseFloat(amount) * Math.pow(10, 8);
		}
		if (assetName === 'AAVE') {
			return Web3.utils.toWei(amount, 'ether');
		}
		return Web3.utils.toWei(amount, 'mwei')
	} else return amount;

}