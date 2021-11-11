import createContract from '../../contract-creator';
import abiManager from '../../../../abiManager';
import Notify from "bnc-notify";
import { fromBigNumber, GetWithdrawAmountPerFullShare, GetWithdrawAmountPerFullShareMaticUSDT } from '../../../bignumber-converter';

async function WithdrawSavingsUSDTMatic(amount: any,addressOwner:string,chainId:any) {
    try {

        const ownerAddress = addressOwner;

        const xAutocontract = await createContract(abiManager.xvAutoUSDT, "0x6842E453ad9e7847a566876B8A2967FE9d155485");
     

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

export default WithdrawSavingsUSDTMatic;