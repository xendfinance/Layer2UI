import createContract from '../../contract-creator';
import abiManager from '../../../../abiManager';
import Notify from "bnc-notify";
import { GetWithdrawAmountPerFullShare } from '../../../bignumber-converter';


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

        const usdcShareBalance = await xVaultcontract.methods.balanceOf(addressOwner).call(); 
        const pricePerFullShare = await xVaultcontract.methods.pricePerShare().call();
 
        const finalDepositUsdtInProtocol = (Number(usdcShareBalance) * Number(pricePerFullShare)) / Math.pow(10,36); 
 
        const amountWithdraw =  Number(amount);
       
        const finalWithdrawShare = (usdcShareBalance * amountWithdraw) / finalDepositUsdtInProtocol;
       
        const sharesFinal = Math.round(finalWithdrawShare);
     
        return await xVaultcontract.methods.withdraw(BigInt(sharesFinal),ownerAddress,0)
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