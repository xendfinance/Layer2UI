import createContract from '../../contract-creator';
import abiManager from '../../../../abiManager';
import Notify from "bnc-notify";
import { GetWithdrawAmountPerFullShare, GetWithdrawAmountPerFullShareMaticUSDT } from '../../../bignumber-converter';

async function WithdrawSavingsWBTCMatic(amount: any,addressOwner:string,chainId:any) {
    try {
        
        const ownerAddress = addressOwner;

        const xAutocontract = await createContract(abiManager.xvAutoWBTC, "0x5b208c6Ed9c95907DC7E1Ef34F0Cac52dd22b9dc");


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
       

        const amountWithdraw = parseFloat(amount) * Math.pow(10, 8);
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

export default WithdrawSavingsWBTCMatic;

