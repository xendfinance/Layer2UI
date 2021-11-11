
import abiManager from '../../abiManager';
import _const from '../_const';

const Web3 = require('web3');
const web3 = new Web3('https://bsc-dataseed.binance.org/');

const web3Matic = new Web3('https://polygon-mainnet.g.alchemy.com/v2/A3s0YpUEWXboRTynlFb0jh4HcT0934ak');


const getAllBalances = (addressOwner: string,chainId:any) => {

	return async (dispatch: Function) => {

		try {		  
         
         
            const resUSDT = Number(await getUSDTBalances(addressOwner)).toFixed(2);
            const resBUSD = Number(await getBUSDBalances(addressOwner)).toFixed(2);
            const resUSDC = Number(await getUSDCBalances(addressOwner)).toFixed(2);

            const resBNBWallet = Number(await getBNBBalanceUser(addressOwner)).toFixed(6);
            
  
            const totalDepositedBUSD = Number(await getXVaultUserDepositBUSD(addressOwner)).toFixed(2);
            const totalDepositedUSDT = Number(await getXVaultUserDepositUSDT(addressOwner)).toFixed(2);
            const totalDepositedUSDC = Number(await getXVaultUserDepositUSDC(addressOwner)).toFixed(2);

            const totalDepositedBNBXAuto = Number(await getXAutoUserDepositBNBBSC(addressOwner)).toFixed(2);
            const totalDepositedBUSDXAuto = Number(await getXAutoUserDepositBUSDBSC(addressOwner)).toFixed(2);
            const totalDepositedUSDTXAuto = Number(await getXAutoUserDepositUSDTBSC(addressOwner)).toFixed(2);
            const totalDepositedUSDCXAuto = Number(await getXAutoUserDepositUSDCBSC(addressOwner)).toFixed(2);
  
           
            
          dispatch({
              type: _const.USDTBALANCE,
              payload: { usdtBalance: resUSDT}
          })

      
               
          dispatch({
            type: _const.BNBBALANCE,
            payload: { bnbBalance: resBNBWallet}
          })
  
          dispatch({
              type: _const.BUSDDEPOSITBALANCE,
              payload: { busdDepositBalance: totalDepositedBUSD}
          })

          dispatch({
            type: _const.USDTDEPOSITBALANCE,
            payload: { usdtDepositBalance: totalDepositedUSDT}
          })

          dispatch({
            type: _const.USDCDEPOSITBALANCE,
            payload: { usdcDepositBalance: totalDepositedUSDC}
        })

        //XAuto
        dispatch({
            type: _const.userBUSDDEPOSITBALANCEXAuto,
            payload: { userBusdDepositBalanceXAuto: totalDepositedBUSDXAuto}
        })

        dispatch({
          type: _const.userUSDTDEPOSITBALANCEXAuto,
          payload: { userUsdtDepositBalanceXAuto: totalDepositedUSDTXAuto}
        })

        dispatch({
          type: _const.userUSDCDEPOSITBALANCEXAuto,
          payload: { userUsdcDepositBalanceXAuto: totalDepositedUSDCXAuto}
        })

        dispatch({
            type: _const.userBNBDEPOSITBALANCEXAuto,
            payload: { userBnbDepositBalanceXAuto: totalDepositedBNBXAuto}
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
          

            const resUSDTMatic = Number(await getUSDTBalancesMatic(addressOwner)).toFixed(2);
            const resAAVE = Number(await getAAVEBalancesMatic(addressOwner)).toFixed(6);
            const resUSDCMatic = Number(await getUSDCBalancesMatic(addressOwner)).toFixed(2);
            const resWBTC = Number(await getWBTCBalancesMatic(addressOwner)).toFixed(6);

            const totalDepositedAAVE = Number(await getXAutoUserDepositAAVE(addressOwner)).toFixed(6);
            const totalDepositedWBTC = Number(await getXAutoUserDepositWBTC(addressOwner)).toFixed(6);
            const totalDepositedUSDTMatic = Number(await getXAutoUserDepositUSDT(addressOwner)).toFixed(2);
            const totalDepositedUSDCMatic = Number(await getXAutoUserDepositUSDC(addressOwner)).toFixed(2);

            dispatch({
                type: _const.USDTBALANCEMatic,
                payload: { usdtBalanceMatic: resUSDTMatic}
            })

            dispatch({
                type: _const.USDCBALANCEMatic,
                payload: { usdcBalanceMatic: resUSDCMatic}
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
                type: _const.USDCDEPOSITBALANCEMatic,
                payload: { usdcDepositBalanceMatic: totalDepositedUSDCMatic}
            })
            dispatch({
                type: _const.USDTDEPOSITBALANCEMatic,
                payload: { usdtDepositBalanceMatic: totalDepositedUSDTMatic}
            })

            dispatch({
                type: _const.AAVEDEPOSITBALANCEMatic,
                payload: { aaveDepositBalanceMatic: totalDepositedAAVE}
            })

            dispatch({
                type: _const.WBTCDEPOSITBALANCEMatic,
                payload: { wbtcDepositBalanceMatic: totalDepositedWBTC}
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



//Get Balances Matic
async function getUSDTBalancesMatic(addressOwner:string) {
    try {
      
        const ownerAddress = addressOwner;
        
        const usdtContract = new web3Matic.eth.Contract(abiManager.USDTMatic, "0xc2132D05D31c914a87C6611C10748AEb04B58e8F");

        if (usdtContract) {
        const usdtBalanceCoin = await usdtContract.methods.balanceOf(ownerAddress).call();  
       
        const FinalUSDBalance = web3Matic.utils.fromWei(usdtBalanceCoin.toString(), 'mwei');   
       
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



async function getUSDCBalancesMatic(addressOwner:string) {
    try {
      
        const ownerAddress = addressOwner;
        
        const usdtContract = new web3Matic.eth.Contract(abiManager.USDCMatic, "0x2791bca1f2de4661ed88a30c99a7a9449aa84174");

        if (usdtContract) {
        const usdtBalanceCoin = await usdtContract.methods.balanceOf(ownerAddress).call();      
       
       
        const FinalUSCBalance = web3Matic.utils.fromWei(usdtBalanceCoin.toString(), 'mwei');  
      
        return FinalUSCBalance;;
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
        
        const aaveContract = new web3Matic.eth.Contract(abiManager.AAVEMatic, "0xd6df932a45c0f255f85145f286ea0b292b21c90b");

        if (aaveContract) {
        const aaveBalanceCoin = await aaveContract.methods.balanceOf(ownerAddress).call(); 
       
        const FinalAAVEBalance = web3Matic.utils.fromWei(aaveBalanceCoin.toString(), 'ether');  
        
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
        
        const wbtcContract = new web3Matic.eth.Contract(abiManager.WBTCMatic, "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6");

        if (wbtcContract) {
        const wbtcBalanceCoin = await wbtcContract.methods.balanceOf(ownerAddress).call();      
         
        
        const FinalWBTCBalance = wbtcBalanceCoin / Math.pow(10,8);
          
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
        
        const usdtContract = new web3.eth.Contract(abiManager.USDT, "0x55d398326f99059fF775485246999027B3197955");

        if (usdtContract) {
        const usdtBalanceCoin = await usdtContract.methods.balanceOf(ownerAddress).call();    
        
        const FinalUSDBalance = web3.utils.fromWei(usdtBalanceCoin.toString(), 'ether');  
        
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
        
        const busdContract = new web3.eth.Contract(abiManager.BUSD, "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56");

        if (busdContract) {
        const busdBalanceCoin = await busdContract.methods.balanceOf(ownerAddress).call();      
  
        
        const FinalBUSDBalance = web3.utils.fromWei(busdBalanceCoin.toString(), 'ether');  
        
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
        
        const usdcContract = new web3.eth.Contract(abiManager.USDC, "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d");

        if (usdcContract) {
        const usdcBalanceCoin = await usdcContract.methods.balanceOf(ownerAddress).call();      
  
       
        const FinalUSDCBalance = web3.utils.fromWei(usdcBalanceCoin.toString(), 'ether');  
           
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

async function getBNBBalanceUser(addressOwner:string) {
    try {

       
        const resBalance = await web3.eth.getBalance(addressOwner);
        if(resBalance){
            const FinalBNBBalance = web3.utils.fromWei(resBalance.toString(), 'ether');  
      
            return FinalBNBBalance;
        }else{
            return 0;
        }
       
      

    } catch (err :any) {
        console.log(err);
        return {
            status: false,
            message: err.message
        };
    }
}



//XAuto Balances User 
async function  getXAutoUserDepositBUSDBSC(addressOwner :string) {

    try {
        const xvVaultBusd = new web3.eth.Contract(abiManager.xvAutoBSCBUSD, '0xa25dec88B81a94Ca951f3a4ff4AAbC32B3759E6C');
        
        if (xvVaultBusd) {
       
        const usdtBalanceCoin = await xvVaultBusd.methods.balanceOf(addressOwner).call(); 
        const FinalUserBusdBalance = web3.utils.fromWei(usdtBalanceCoin.toString(), 'ether');     
    
        return FinalUserBusdBalance;
       }


       
    } catch (e) {
        console.log(e)
    }

}



//XAuto Balances User 
async function  getXAutoUserDepositUSDTBSC(addressOwner :string) {

    try {
        const xvVaultBusd = new web3.eth.Contract(abiManager.xvAutoBSCUSDT, '0x525A55eBd9464c1081077BCc1d7a53C1c431BD26');
        
        if (xvVaultBusd) {
       
        const usdtBalanceCoin = await xvVaultBusd.methods.balanceOf(addressOwner).call(); 
        const FinalUserBusdBalance = web3.utils.fromWei(usdtBalanceCoin.toString(), 'ether');     
    
        return FinalUserBusdBalance;
       }


       
    } catch (e) {
        console.log(e)
    }

}


//XAuto Balances User 
async function  getXAutoUserDepositUSDCBSC(addressOwner :string) {

    try {
        const xvVaultBusd = new web3.eth.Contract(abiManager.xvAutoBSCUSDC, '0x3058d344C8F845754F0C356881772788c128eA22');
        
        if (xvVaultBusd) {
       
        const usdtBalanceCoin = await xvVaultBusd.methods.balanceOf(addressOwner).call(); 

        
        const FinalUserBusdBalance = web3.utils.fromWei(usdtBalanceCoin.toString(), 'ether');     
        
        return FinalUserBusdBalance;
       }


       
    } catch (e) {
        console.log(e)
    }

}


//XAuto Balances User 
async function  getXAutoUserDepositBNBBSC(addressOwner :string) {

    try {
        const xvVaultBusd = new web3.eth.Contract(abiManager.xvAutoBSCBNB, '0x2dABAeB84cACFEF30e95896301CEF65cb24b3176');
        
        if (xvVaultBusd) {
        const usdtBalanceCoin = await xvVaultBusd.methods.balanceOf(addressOwner).call(); 
        const FinalUserBusdBalance = web3.utils.fromWei(usdtBalanceCoin.toString(), 'ether');     
    
        return FinalUserBusdBalance;
       }


       
    } catch (e) {
        console.log(e)
    }

}


//XVault Balances User 
async function  getXVaultUserDepositBUSD(addressOwner :string) {

    try {
        const xvVaultBusd = new web3.eth.Contract(abiManager.xvVaultBUSD, '0xE7e53128Bf23463F7B0B4F0aec1FCB50988c7E9E');
        
        if (xvVaultBusd) {
       
        const usdtBalanceCoin = await xvVaultBusd.methods.balanceOf(addressOwner).call(); 
        const FinalUserBusdBalance = web3.utils.fromWei(usdtBalanceCoin.toString(), 'ether');     
    
        return FinalUserBusdBalance;
       }


       
    } catch (e) {
        console.log(e)
    }

}


//XVault Balances User 
async function  getXVaultUserDepositUSDT(addressOwner :string) {

    try {
        const xvVaultUSDT = new web3.eth.Contract(abiManager.xvVaultUSDT, '0xF8604eE08c70389856242dF88b4CCA90a70733a7');
        
        if (xvVaultUSDT) {
       
        const usdtBalanceCoin = await xvVaultUSDT.methods.balanceOf(addressOwner).call(); 

        //Times Price Per Full Share 
        const FinalUserUSDTBalance = web3.utils.fromWei(usdtBalanceCoin.toString(), 'ether');     
    
        return FinalUserUSDTBalance;
       }


       
    } catch (e) {
        console.log(e)
    }

}


//XVault Balances User 
async function  getXVaultUserDepositUSDC(addressOwner :string) {

    try {
        const xvVaultUSDC = new web3.eth.Contract(abiManager.xvVaultUSDC, '0x48190f88a6d62cF3EEFDe000B8b8D1B99951b07a');
        
        if (xvVaultUSDC) {
       
        const usdcBalanceCoin = await xvVaultUSDC.methods.balanceOf(addressOwner).call(); 
        const FinalUserUSDCBalance = web3.utils.fromWei(usdcBalanceCoin.toString(), 'mwei');     
    
        return FinalUserUSDCBalance;
       }


       
    } catch (e) {
        console.log(e)
    }

}


//XAuto Balances User 
async function  getXAutoUserDepositUSDT(addressOwner :string) {

    try {
        const xvAutoUSDT = new web3Matic.eth.Contract(abiManager.xvAutoUSDT, '0x6842E453ad9e7847a566876B8A2967FE9d155485');
        
        if (xvAutoUSDT) {
       
        const usdtBalanceCoin = await xvAutoUSDT.methods.balanceOf(addressOwner).call(); 
        const FinalUserUSDTBalance = web3Matic.utils.fromWei(usdtBalanceCoin.toString(), 'mwei');     
    
        return FinalUserUSDTBalance;
       }


       
    } catch (e) {
        console.log(e)
    }

}

async function  getXAutoUserDepositUSDC(addressOwner :string) {

    try {
        const xvAutoUSDC = new web3Matic.eth.Contract(abiManager.xvAutoUSDC, '0x418b8D697e72B90cBdF5Cb58015384b9016794F9');
        
        if (xvAutoUSDC) {
       
        const usdcBalanceCoin = await xvAutoUSDC.methods.balanceOf(addressOwner).call(); 
        const FinalUserUSDCBalance = web3Matic.utils.fromWei(usdcBalanceCoin.toString(), 'mwei');     
    
        return FinalUserUSDCBalance;
       }


       
    } catch (e) {
        console.log(e)
    }

}

async function  getXAutoUserDepositAAVE(addressOwner :string) {

    try {
        const xvAutoAAVE = new web3Matic.eth.Contract(abiManager.xvAutoAAVE, '0x0B12E60084816ed83c519a1fFd01022d5A50fcaC');
        
        if (xvAutoAAVE) {
       
        const aaveBalanceCoin = await xvAutoAAVE.methods.balanceOf(addressOwner).call(); 
        const FinalUserAAVEBalance = web3Matic.utils.fromWei(aaveBalanceCoin.toString(), 'ether');     
    
        return FinalUserAAVEBalance;
       }


       
    } catch (e) {
        console.log(e)
    }

}

async function  getXAutoUserDepositWBTC(addressOwner :string) {

    try {
        const xvAutoWBTC = new web3Matic.eth.Contract(abiManager.xvAutoWBTC, '0x5b208c6Ed9c95907DC7E1Ef34F0Cac52dd22b9dc');
        
        if (xvAutoWBTC) {
       
        const wbtcBalanceCoin = await xvAutoWBTC.methods.balanceOf(addressOwner).call(); 
        const FinalWBTCBalance = wbtcBalanceCoin / Math.pow(10,8);  
    
        return FinalWBTCBalance;
       }


       
    } catch (e) {
        console.log(e)
    }

}



export default getAllBalances;