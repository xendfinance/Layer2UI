import abiManager from "../../../abiManager";
import { fromBigNumber } from "../../bignumber-converter";
import retrieveAddress from "../../retrieve-address";
import commas from "../../utils/commas";
import _const from "../../_const";
import createContract from "../../../methods/contracts/contract-creator";
import exposedWeb3 from "../../../methods/contracts/exposedWeb3";

const getNativeBalance = (address: string,chainId :any) => {

	return async (dispatch: Function) => {

		try {

			const web3 = await exposedWeb3();

			let balance = await web3.eth.getBalance(address);
			balance = commas(Number(balance) * Math.pow(10, -18), 2)
            let currency = chainId == 56?'BNB':'MATIC';
			dispatch({
				type: _const.NATIVE_BALANCE,
				payload: balance + ' ' + currency
			});
		} catch (e) {
			console.log(e)
		}

	}
}


export default getNativeBalance;


export const getAccountBalance = () => {
	return async (dispatch: Function) => {
		try {
			// const web3Instance = window.APPWEB3;
			// if (web3Instance) {
			// const tokenContract = await createContract(abiManager.BUSD_TOKEN, window.BUSD_TOKEN);

			// const clientsAddress = retrieveAddress();

			// const recipientBalance = await tokenContract.methods.balanceOf(clientsAddress).call();

			// dispatch({
			// 	type: _const.ACCOUNT_BALANCE,
			// 	payload: fromBigNumber(recipientBalance)
			// })
			// }else{
			// 	//console.log('Please Connect Wallet');
			// }
			

		} catch (e) {
			console.error(e);
			dispatch({
				type: _const.ACCOUNT_BALANCE,
				payload: '0'
			})

		}
	}
}