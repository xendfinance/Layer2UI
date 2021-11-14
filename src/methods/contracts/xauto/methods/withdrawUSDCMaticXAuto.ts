import createContract from '../../contract-creator';
import abiManager from '../../../../abiManager';
import Notify from "bnc-notify";

import { GetWithdrawAmountPerFullShareMaticUSDT } from '../../../bignumber-converter';

async function WithdrawSavingsUSDCMatic(amount: any,addressOwner:string,chainId:any) {
    try {
        
        const ownerAddress = addressOwner;

        const xAutocontract = await createContract(abiManager.xvAutoUSDC, "0x418b8D697e72B90cBdF5Cb58015384b9016794F9");


       let notifyBNC :any;
   
    
        if(chainId == 137){
            notifyBNC = Notify({
                dappId: 'a7f90c48-943a-4d3a-a8df-6ca5d0f7522a',       
                networkId: 137,
                mobilePosition: 'bottom', 
                desktopPosition: 'bottomRight', 
              });
        }
      
        const usdcShareBalance = await xAutocontract.methods.balanceOf(addressOwner).call(); 
        const pricePerFullShare = await xAutocontract.methods.getPricePerFullShare().call();

        const FinalUserUSDCBalance = (Number(usdcShareBalance) * Number(pricePerFullShare)) / Math.pow(10,24);  

        const amountWithdraw =  Number(amount);
       
        const finalWithdrawShare = (usdcShareBalance * amountWithdraw) / FinalUserUSDCBalance;
       
        const sharesFinal = Math.round(finalWithdrawShare);
        
        return await xAutocontract.methods.withdraw(BigInt(sharesFinal))
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

