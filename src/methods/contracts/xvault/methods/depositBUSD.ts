import createContract from '../../contract-creator';
//import retrieveAddress from '../retrieve-address';
import { toBigNumber } from '../../../utils/multiply-amount';

import exposedWeb3 from '../../exposedWeb3';
import abiManager from '../../../../abiManager';
import Notify from "bnc-notify";
import { notify } from '../../../../components/core/Notifier';

async function DepositSavingsBUSD(amount: any,addressOwner:string,chainId:any) {
    try {

        const ownerAddress = addressOwner;

        console.log("DEPOSIT METHOD ",ownerAddress)

        const xVaultcontract = await createContract(abiManager.xvVaultBUSD, "0xE7e53128Bf23463F7B0B4F0aec1FCB50988c7E9E");
       

        const usdtContract = await createContract(abiManager.BUSD, "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56");

       let notifyBNC :any;
   
        if(chainId == 56){
            notifyBNC = Notify({
                dappId: 'a7f90c48-943a-4d3a-a8df-6ca5d0f7522a',     
                networkId: 56,
                mobilePosition: 'bottom',
                desktopPosition: 'bottomRight', 
              });
        }
        if(chainId == 137){
            notifyBNC = Notify({
                dappId: 'a7f90c48-943a-4d3a-a8df-6ca5d0f7522a',       
                networkId: 137,
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
           

        // const receipt = await contract.methods.deposit().send({ from: ownerAddress })

        // return receipt

       const res =  await xVaultcontract.methods.deposit(toBigNumber(amount))
            .send({ from: ownerAddress })
            .on('transactionHash', (hash: string) => {
                console.log(hash, ' the transaction hash')
                notifyBNC.hash(hash);
            })
       console.log("DEPOSIT FUNCTION TOTAL SHARE LOCKED IS  ",res)

    } catch (err :any) {
        console.log(err);
        return {
            status: false,
            message: err.message
        };
    }
}

export default DepositSavingsBUSD;