

import createContract from '../../contract-creator';
//import retrieveAddress from '../retrieve-address';
import { toBigNumber } from '../../../utils/multiply-amount';

import exposedWeb3 from '../../exposedWeb3';
import abiManager from '../../../../../src/abiManager';
import Notify from "bnc-notify";
import { notify } from '../../../../components/core/Notifier';
import _const from 'methods/_const';



const getAllBalances = (addressOwner: string,chainId:any) => {

	return async (dispatch: Function) => {

		try {
		  
          console.log("TRY TO GET ALL BALANCES");
          const resUSDT = await getUSDTBalances(addressOwner);
          const resBUSD = await getBUSDBalances(addressOwner);
          const resUSDC = await getUSDCBalances(addressOwner);
          
        dispatch({
            type: _const.USDTBALANCE,
            payload: { usdtBalance: resUSDT}
        })

        dispatch({
            type: _const.BUSDBALANCE,
            payload: { busdBalance: resBUSD}
        })

        dispatch({
            type: _const.USDCBALANCE,
            payload: { usdcBalance: resUSDC}
        })
        dispatch({
            type: _const.CONWALLETADD,
            payload: { address: addressOwner, chainId:chainId }
        })
      
		} catch (e) {
			console.log(e)
		}

	}
}




async function getUSDTBalances(addressOwner:string) {
    try {

        const ownerAddress = addressOwner;
        
        const usdtContract = await createContract(abiManager.USDT, "0x55d398326f99059fF775485246999027B3197955");

        if (usdtContract) {
        const usdtBalanceCoin = await usdtContract.methods.balanceOf(ownerAddress).call();      
  
        let web3 = window.APPWEB3
        const FinalUSDBalance = web3.utils.fromWei(usdtBalanceCoin.toString(), 'ether');  
        console.log("GETING USDT BALANCE Final",FinalUSDBalance);    
        return FinalUSDBalance;
        }else{
            return 0
        }
         

    } catch (err :any) {
        console.log(err);
        return {
            status: false,
            message: err.message
        };
    }
}

async function getBUSDBalances(addressOwner:string) {
    try {

        const ownerAddress = addressOwner;
        
        const busdContract = await createContract(abiManager.BUSD, "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56");

        if (busdContract) {
        const busdBalanceCoin = await busdContract.methods.balanceOf(ownerAddress).call();      
  
        let web3 = window.APPWEB3
        const FinalBUSDBalance = web3.utils.fromWei(busdBalanceCoin.toString(), 'ether');  
        console.log("GETING BUSD BALANCE Final",FinalBUSDBalance);    
        return FinalBUSDBalance;
        }else{
            return 0
        }

         

    } catch (err :any) {
        console.log(err);
        return {
            status: false,
            message: err.message
        };
    }
}

async function getUSDCBalances(addressOwner:string) {
    try {

        const ownerAddress = addressOwner;
        
        const usdcContract = await createContract(abiManager.USDC, "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d");

        if (usdcContract) {
        const usdcBalanceCoin = await usdcContract.methods.balanceOf(ownerAddress).call();      
  
        let web3 = window.APPWEB3
        const FinalUSDCBalance = web3.utils.fromWei(usdcBalanceCoin.toString(), 'ether');  
        console.log("GETING USDC BALANCE Final",FinalUSDCBalance);    
        return FinalUSDCBalance;
        }else{
            return 0
        }
         

    } catch (err :any) {
        console.log(err);
        return {
            status: false,
            message: err.message
        };
    }
}

export default getAllBalances;