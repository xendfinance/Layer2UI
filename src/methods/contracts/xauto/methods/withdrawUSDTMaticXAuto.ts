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

        const usdtShareBalance = await xAutocontract.methods.balanceOf(addressOwner).call(); 
        const pricePerFullShare = await xAutocontract.methods.getPricePerFullShare().call();

        const FinalUserUSDCBalance = (Number(usdtShareBalance) * Number(pricePerFullShare)) / Math.pow(10,24);  

        const amountWithdraw =  Number(amount);
       
        const finalWithdrawShare = (usdtShareBalance * amountWithdraw) / FinalUserUSDCBalance;
       
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

export default WithdrawSavingsUSDTMatic;