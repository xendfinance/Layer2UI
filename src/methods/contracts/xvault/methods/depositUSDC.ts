import createContract from '../../contract-creator';
//import retrieveAddress from '../retrieve-address';
import { toBigNumber } from '../../../utils/multiply-amount';

import exposedWeb3 from '../../exposedWeb3';
import abiManager from '../../../../abiManager';
import Notify from "bnc-notify";
import { notify } from '../../../../components/core/Notifier';

async function DepositSavingsUSDC(amount: any,addressOwner:string,chainId:any) {
    try {

        const ownerAddress = addressOwner;

        console.log("DEPOSIT METHOD ",ownerAddress)

        const xVaultcontract = await createContract(abiManager.xvVaultUSDC, "0x48190f88a6d62cF3EEFDe000B8b8D1B99951b07a");
       

        const usdtContract = await createContract(abiManager.USDC, "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d");

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

export default DepositSavingsUSDC;