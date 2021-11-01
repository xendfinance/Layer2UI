import createContract from '../../contract-creator';
import abiManager from '../../../../abiManager';
import Notify from "bnc-notify";
import { GetWithdrawAmountPerFullShare } from 'methods/bignumber-converter';

async function WithdrawSavingsUSDT(amount: any,addressOwner:string,chainId:any) {
    try {

        const ownerAddress = addressOwner;

        const xVaultcontract = await createContract(abiManager.xvVaultUSDT, "0xF8604eE08c70389856242dF88b4CCA90a70733a7");
     

       let notifyBNC :any;
   
        if(chainId == 56){
            notifyBNC = Notify({
                dappId: 'a7f90c48-943a-4d3a-a8df-6ca5d0f7522a',     
                networkId: 56,
                mobilePosition: 'bottom',
                desktopPosition: 'bottomRight', 
              });
        }

       const pricePerShare = await xVaultcontract.methods.pricePerShare().call();     
       const amountWithdraw = Number(amount) * Math.pow(10, 18)
       const pricePerShareConverted = Number(pricePerShare);

       const shares = GetWithdrawAmountPerFullShare(amountWithdraw,pricePerShareConverted);
      
     
        return await xVaultcontract.methods.withdraw(shares,ownerAddress,0)
        .send({ from: ownerAddress })
        .on('transactionHash', (hash: string) => {
           
            notifyBNC.hash(hash);
        });
   
    } catch (err :any) {
        console.log(err);
        return {
            status: false,
            message: err.message
        };
    }
}

export default WithdrawSavingsUSDT;