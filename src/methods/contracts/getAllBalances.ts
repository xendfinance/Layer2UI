

import createContract from './contract-creator';
import { toBigNumber } from '../utils/multiply-amount';
import exposedWeb3 from './exposedWeb3';
import abiManager from '../../abiManager';
import Notify from "bnc-notify";
import { notify } from '../../components/core/Notifier';
import _const from 'methods/_const';
import DepositSavingsUSDTMatic from './xauto/methods/depositUSDTMaticXAuto';
import DepositSavingsUSDCMatic from './xauto/methods/depositUSDCMaticXAuto';
import DepositSavingsAAVEMatic from './xauto/methods/depositAAVEMaticXAuto';
import DepositSavingsWBTCMatic from './xauto/methods/depositWBTCMaticXAuto';
import WithdrawSavingsUSDTMatic from './xauto/methods/withdrawUSDTMaticXAuto';
import WithdrawSavingsUSDCMatic from './xauto/methods/withdrawUSDCMaticXAuto';
import WithdrawSavingsAAVEMatic from './xauto/methods/withdrawAAVEMaticXAuto';
import WithdrawSavingsWBTCMatic from './xauto/methods/withdrawWBTCMaticXAuto';



const getAllBalances = (addressOwner: string,chainId:any) => {

	return async (dispatch: Function) => {

		try {		  
         
          if(chainId == 56){
            const resUSDT = Number(await getUSDTBalances(addressOwner)).toFixed(2);
            const resBUSD = Number(await getBUSDBalances(addressOwner)).toFixed(2);
            const resUSDC = Number(await getUSDCBalances(addressOwner)).toFixed(2);
  
            const totalDepositedBUSD = Number(await getXVaultUserDepositBUSD(addressOwner)).toFixed(2);
  
            console.log("TOTAL LOCKED BUSD IS",totalDepositedBUSD)
            
          dispatch({
              type: _const.USDTBALANCE,
              payload: { usdtBalance: resUSDT}
          })
  
          dispatch({
              type: _const.BUSDDEPOSITBALANCE,
              payload: { busdDepositBalance: totalDepositedBUSD}
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
          }else{

            const resUSDT = Number(await getUSDTBalancesMatic(addressOwner)).toFixed(2);
            const resAAVE = Number(await getAAVEBalancesMatic(addressOwner)).toFixed(2);
            const resUSDC = Number(await getUSDTBalancesMatic(addressOwner)).toFixed(2);
            const resWBTC = Number(await getWBTCBalancesMatic(addressOwner)).toFixed(2);

            dispatch({
                type: _const.USDTBALANCEMatic,
                payload: { usdtBalanceMatic: resUSDT}
            })

            dispatch({
                type: _const.USDCBALANCEMatic,
                payload: { usdcBalanceMatic: resUSDC}
            })

            dispatch({
                type: _const.AAVEBALANCEMatic,
                payload: { aaveBalanceMatic: resAAVE}
            })

            dispatch({
                type: _const.WBTCBALANCEMatic,
                payload: { wbtcBalanceMatic: resWBTC}
            })

            dispatch({
                type: _const.CONWALLETADD,
                payload: { address: addressOwner, chainId:chainId }
            })
           
          }
         
        
		} catch (e) {
			console.log(e)
		}

	}
}



//Get Balances Matic
async function getUSDTBalancesMatic(addressOwner:string) {
    try {
      
        const ownerAddress = addressOwner;
        
        const usdtContract = await createContract(abiManager.USDTMatic, "0xc2132D05D31c914a87C6611C10748AEb04B58e8F");

        if (usdtContract) {
        const usdtBalanceCoin = await usdtContract.methods.balanceOf(ownerAddress).call();      
        //const usdtBalanceCoin = await usdtContract.methods.proxyOwner().call();      
  
        console.log("Result OF Balance Is",usdtBalanceCoin)
        let web3 = window.APPWEB3
        const FinalUSDBalance = web3.utils.fromWei(usdtBalanceCoin.toString(), 'mwei');   
        console.log("GETING USDT BALANCE Final",FinalUSDBalance);    
        return "";;
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



async function getUSDCBalancesMatic(addressOwner:string) {
    try {
      
        const ownerAddress = addressOwner;
        
        const usdtContract = await createContract(abiManager.USDCMatic, "0x2791bca1f2de4661ed88a30c99a7a9449aa84174");

        if (usdtContract) {
        const usdtBalanceCoin = await usdtContract.methods.balanceOf(ownerAddress).call();      
        //const usdtBalanceCoin = await usdtContract.methods.proxyOwner().call();      
  
        console.log("Result OF Balance Is",usdtBalanceCoin)
        let web3 = window.APPWEB3
        const FinalUSDBalance = web3.utils.fromWei(usdtBalanceCoin.toString(), 'mwei');  
        console.log("GETING USDT BALANCE Final",FinalUSDBalance);    
        return "";;
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



async function getAAVEBalancesMatic(addressOwner:string) {
    try {
      
        const ownerAddress = addressOwner;
        
        const aaveContract = await createContract(abiManager.AAVEMatic, "0xd6df932a45c0f255f85145f286ea0b292b21c90b");

        if (aaveContract) {
        const aaveBalanceCoin = await aaveContract.methods.balanceOf(ownerAddress).call();      
        //const usdtBalanceCoin = await usdtContract.methods.proxyOwner().call();      
  
        console.log("Result OF Balance Is",aaveBalanceCoin)
        let web3 = window.APPWEB3
        const FinalAAVEBalance = web3.utils.fromWei(aaveBalanceCoin.toString(), 'ether');  
        console.log("GETING AAVE BALANCE Final",FinalAAVEBalance);    
        return FinalAAVEBalance;
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


async function getWBTCBalancesMatic(addressOwner:string) {
    try {
      
        const ownerAddress = addressOwner;
        
        const wbtcContract = await createContract(abiManager.WBTCMatic, "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6");

        if (wbtcContract) {
        const wbtcBalanceCoin = await wbtcContract.methods.balanceOf(ownerAddress).call();      
            
  
        console.log("Result OF Balance Is",wbtcBalanceCoin)
        
        const FinalWBTCBalance = wbtcBalanceCoin / Math.pow(10,8);
        console.log("GETING WBTC BALANCE Final",FinalWBTCBalance);    
        return FinalWBTCBalance;;
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




//Get Balances BSC
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




//XVault Balances User 
async function  getXVaultUserDepositBUSD(addressOwner :string) {

    try {
        const web3Needed = window.APPWEB3;

        const xvVaultBusd = await createContract(abiManager.xvVaultBUSD, '0xE7e53128Bf23463F7B0B4F0aec1FCB50988c7E9E');
        
        if (xvVaultBusd) {
       
        const usdtBalanceCoin = await xvVaultBusd.methods.balanceOf(addressOwner).call(); 
        const FinalUserBusdBalance = web3Needed.utils.fromWei(usdtBalanceCoin.toString(), 'ether');     
    
        return FinalUserBusdBalance;
       }


       
    } catch (e) {
        console.log(e)
    }

}

//USDT,USDC needed

export default getAllBalances;