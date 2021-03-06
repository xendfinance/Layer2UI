import Web3 from "web3";
import { Asset } from "./assets";
import Notify from 'bnc-notify';
import createContract from "./contracts/contract-creator";
import { rehydrateVault } from "./hydrate";
import { notify } from "../components/core/Notifier";
import { getDappId } from "./deposit";
import { shortAmount } from "./bignumber-converter";
import { removeDecimals, toFixed } from "./get-balances";




interface IDepositAsset {
	amount: any
	asset: Asset
	client: string
}




export const withdrawAction = (data: IDepositAsset) => {
	return async (dispatch: Function) => {
		//
		try {

			const receipt = await withdraw(data)
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



export const withdraw = async ({
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

		const contract = await createContract(asset.protocolAbi, asset.protocolAddress);

		let share = await contract.methods['balanceOf'](client).call();
		const ppfs = await contract.methods[asset.ppfsMethod]().call();

		let divisor = Math.pow(10, asset.widthdrawDecimals);
		const totalDeposit = (Number(share) * Number(ppfs)) / Number(BigInt(divisor).toLocaleString('fullwide', { useGrouping: false }))
		let withdrawAmount: any = (Number(share) * Number(amount)) / totalDeposit;
		withdrawAmount = toFixed(withdrawAmount)

		if (asset.protocolName === 'xVault') {

			withdrawAmount = removeDecimals(withdrawAmount);

			return await contract.methods['withdraw'](String(withdrawAmount), client, 0)
				.send({ from: client })
				.on('transactionHash', hash => {
					notifyBNC.hash(hash)
				})
		}

		if (asset.protocolName === 'xAuto') {

			withdrawAmount = removeDecimals(withdrawAmount);

			if(asset.network == 137){
				const WithdrawGas = await getFastGasFeeMatic();
				return await contract.methods['withdraw'](String(withdrawAmount))
				.send({ from: client,gasPrice:WithdrawGas })
				.on('transactionHash', hash => {
					notifyBNC.hash(hash)
				})
			}else{
				return await contract.methods['withdraw'](String(withdrawAmount))
				.send({ from: client })
				.on('transactionHash', hash => {
					notifyBNC.hash(hash)
				})
			}

			

		}


	} catch (e: any) {
		console.error(e);
		return { status: false, message: e.message }
	}
}

async function getFastGasFeeMatic() {
	try {
	  const currentGasResult = await fetch('https://gasstation-mainnet.matic.network/v2')
	  const currentGasResultJson = await currentGasResult.json();
	  const res =  Web3.utils.toBN(parseInt(currentGasResultJson.fast.maxFee))
	  const currentGasInWei = Web3.utils.toWei((res),'gwei')
	  return currentGasInWei;
	  
	} catch (err) {
	  console.log(err);
	}
  }