import createContract from '../../contract-creator';
import abiManager from '../../../../abiManager';
import Notify from "bnc-notify";
import { GetWithdrawAmountPerFullShare, GetWithdrawAmountPerFullShareMaticUSDT } from 'methods/bignumber-converter';

async function WithdrawSavingsUSDCMatic(amount: any,addressOwner:string,chainId:any) {
    try {
        
        const ownerAddress = addressOwner;

        const xAutocontract = await createContract(abiManager.xvAutoUSDC, "0x3b1D848B20735B030D8ea85d2f516eb75c8e0e56");


       let notifyBNC :any;
   
    
        if(chainId == 137){
            notifyBNC = Notify({
                dappId: 'a7f90c48-943a-4d3a-a8df-6ca5d0f7522a',       
                networkId: 137,
                mobilePosition: 'bottom', 
                desktopPosition: 'bottomRight', 
              });
        }
      
        const pricePerShare = await xAutocontract.methods.getPricePerFullShare().call();  
       
        const amountWithdraw = Number(amount) * Math.pow(10, 6);
        const amountWithdrawFinal = amountWithdraw * Math.pow(10, 18);
        const pricePerShareConverted = Number(pricePerShare);
   
    
        const shares = GetWithdrawAmountPerFullShareMaticUSDT(amountWithdrawFinal,pricePerShareConverted);
        const finalShares = Math.round(shares);       
        
        return await xAutocontract.methods.withdraw(finalShares)
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

export default WithdrawSavingsUSDCMatic;

