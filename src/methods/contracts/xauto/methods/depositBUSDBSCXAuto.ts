import createContract from '../../contract-creator';
//import retrieveAddress from '../retrieve-address';
import { toBigNumber } from '../../../utils/multiply-amount';

import exposedWeb3 from '../../exposedWeb3';
import abiManager from '../../../../abiManager';
import Notify from "bnc-notify";
import { notify } from '../../../../components/core/Notifier';

async function DepositSavingsBUSDXAuto(amount: any,addressOwner:string,chainId:any) {
    try {

        const ownerAddress = addressOwner;

      

        const xVaultcontract = await createContract(abiManager.xvAutoBSCBUSD, "0x4b75C26aC7E7b3DB22a67b74741fC965427Ae7eb");
       

        const busdContract = await createContract(abiManager.BUSD, "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56");

       let notifyBNC :any;
   
        if(chainId == 56){
            notifyBNC = Notify({
                dappId: 'a7f90c48-943a-4d3a-a8df-6ca5d0f7522a',     
                networkId: 56,
                mobilePosition: 'bottom',
                desktopPosition: 'bottomRight', 
              });
        }
      
       
         await busdContract.methods
            .approve(xVaultcontract._address, toBigNumber(amount))
            .send({ from: ownerAddress })
            .on('transactionHash', (hash: string) => {
                console.log(hash, ' the transaction hash')
                notifyBNC.hash(hash);
            });
 

       return await xVaultcontract.methods.deposit(toBigNumber(amount))
            .send({ from: ownerAddress })
            .on('transactionHash', (hash: string) => {
                console.log(hash, ' the transaction hash')
                notifyBNC.hash(hash);
            })

    } catch (err :any) {
        console.log(err);
        return {
            status: false,
            message: err.message
        };
    }
}

export default DepositSavingsBUSDXAuto;