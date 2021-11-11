import createContract from '../../contract-creator';
//import retrieveAddress from '../retrieve-address';
import { toBigNumber } from '../../../utils/multiply-amount';

import exposedWeb3 from '../../exposedWeb3';
import abiManager from '../../../../abiManager';
import Notify from "bnc-notify";
import { notify } from '../../../../components/core/Notifier';

async function DepositSavingsUSDTBSCXAuto(amount: any,addressOwner:string,chainId:any) {
    try {

        const ownerAddress = addressOwner;


        const xVaultcontract = await createContract(abiManager.xvAutoBSCUSDT, "0x525A55eBd9464c1081077BCc1d7a53C1c431BD26");
       

        const usdtContract = await createContract(abiManager.USDT, "0x55d398326f99059fF775485246999027B3197955");

       let notifyBNC :any;
   
        if(chainId == 56){
            notifyBNC = Notify({
                dappId: 'a7f90c48-943a-4d3a-a8df-6ca5d0f7522a',     
                networkId: 56,
                mobilePosition: 'bottom',
                desktopPosition: 'bottomRight', 
              });
        }
       
       
         await usdtContract.methods
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

export default DepositSavingsUSDTBSCXAuto;