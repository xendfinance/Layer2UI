import createContract from '../../contract-creator';
import abiManager from '../../../../abiManager';
import Notify from "bnc-notify";
import { GetWithdrawAmountPerFullShare } from 'methods/bignumber-converter';

async function WithdrawSavingsUSDC(amount: any,addressOwner:string,chainId:any) {
    try {

        const ownerAddress = addressOwner;

        const xVaultcontract = await createContract(abiManager.xvVaultUSDC, "0x48190f88a6d62cF3EEFDe000B8b8D1B99951b07a");
     

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
      
     
        const res= xVaultcontract.methods.withdraw(shares,ownerAddress,0)
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

export default WithdrawSavingsUSDC;