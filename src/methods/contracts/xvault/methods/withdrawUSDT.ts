import createContract from '../../contract-creator';
import abiManager from '../../../../abiManager';
import Notify from "bnc-notify";
import { GetWithdrawAmountPerFullShare } from '../../../bignumber-converter';


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

        const usdtShareBalance = await xVaultcontract.methods.balanceOf(addressOwner).call(); 
        const pricePerFullShare = await xVaultcontract.methods.pricePerShare().call();
 
        const finalDepositUsdtInProtocol = (Number(usdtShareBalance) * Number(pricePerFullShare)) / Math.pow(10,36); 
 
        const amountWithdraw =  Number(amount);
       
        const finalWithdrawShare = (usdtShareBalance * amountWithdraw) / finalDepositUsdtInProtocol;
       
        const finalShares = Math.round(finalWithdrawShare);
     
        return await xVaultcontract.methods.withdraw(BigInt(finalShares),ownerAddress,0)
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