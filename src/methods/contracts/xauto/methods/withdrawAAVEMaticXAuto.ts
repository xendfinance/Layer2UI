import createContract from '../../contract-creator';
import abiManager from '../../../../abiManager';
import Notify from "bnc-notify";
import { GetWithdrawAmountPerFullShareMaticUSDT, toBigNumber } from '../../../bignumber-converter';

async function WithdrawSavingsAAVEMatic(amount: any,addressOwner:string,chainId:any) {
    try {
        
        const ownerAddress = addressOwner;

        const xAutocontract = await createContract(abiManager.xvAutoAAVE, "0x0B12E60084816ed83c519a1fFd01022d5A50fcaC");


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
       
       
        const amountWithdraw =  parseFloat(amount);
        
       
        const pricePerShareConverted = Number(pricePerShare);
   
    
        const shares = GetWithdrawAmountPerFullShareMaticUSDT(amountWithdraw,pricePerShareConverted)* Math.pow(10, 18);    
        const sharesFinal = toBigNumber(shares);
         
      
        return await xAutocontract.methods.withdraw(sharesFinal)
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

export default WithdrawSavingsAAVEMatic;

