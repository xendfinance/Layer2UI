import createContract from '../../contract-creator';
//import retrieveAddress from '../retrieve-address';
import { toBigNumber } from '../../../utils/multiply-amount';

import exposedWeb3 from '../../exposedWeb3';
import abiManager from '../../../../abiManager';
import Notify from "bnc-notify";
import { notify } from '../../../../components/core/Notifier';

async function DepositSavingsBNBXAuto(amount: any,addressOwner:string,chainId:any) {
    try {

        const ownerAddress = addressOwner;
      

        const xVaultcontract = await createContract(abiManager.xvAutoBSCBNB, "0x0682B619734f059c7255D3e08726DAb000dB4b62");
       

       const bnbContract = await createContract(abiManager.BNB, "0xB8c77482e45F1F44dE1745F52C74426C631bDD52");

       let notifyBNC :any;
   
        if(chainId == 56){
            notifyBNC = Notify({
                dappId: 'a7f90c48-943a-4d3a-a8df-6ca5d0f7522a',     
                networkId: 56,
                mobilePosition: 'bottom',
                desktopPosition: 'bottomRight', 
              });
        }

     const finalAmount = window.APPWEB3.utils.toWei(amount, 'ether') 

       return await xVaultcontract.methods.deposit()
            .send({ from: ownerAddress,
                    value:finalAmount })
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

export default DepositSavingsBNBXAuto;