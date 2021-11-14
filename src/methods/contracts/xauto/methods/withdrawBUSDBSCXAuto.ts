import createContract from '../../contract-creator';
import exposedWeb3 from '../../exposedWeb3';
import abiManager from '../../../../abiManager';
import Notify from "bnc-notify";
import { GetWithdrawAmountPerFullShareMaticUSDT, toBigNumber } from '../../../bignumber-converter';

async function WithdrawSavingsBUSDXAuto(amount: any,addressOwner:string,chainId:any) {
    try {

        const ownerAddress = addressOwner;

        const xVaultcontract = await createContract(abiManager.xvAutoBSCBUSD, "0xa25dec88B81a94Ca951f3a4ff4AAbC32B3759E6C");
     

       let notifyBNC :any;
   
        if(chainId == 56){
            notifyBNC = Notify({
                dappId: 'a7f90c48-943a-4d3a-a8df-6ca5d0f7522a',     
                networkId: 56,
                mobilePosition: 'bottom',
                desktopPosition: 'bottomRight', 
              });
        }

        const busdShareBalance = await xVaultcontract.methods.balanceOf(addressOwner).call(); 
        const pricePerFullShare = await xVaultcontract.methods.getPricePerFullShare().call();
 
        const finalDepositUsdcInProtocol = (Number(busdShareBalance) * Number(pricePerFullShare)) / Math.pow(10,36); 
 
        const amountWithdraw =  Number(amount);
       
        const finalWithdrawShare = (busdShareBalance * amountWithdraw) / finalDepositUsdcInProtocol;
       
        const sharesFinal = Math.round(finalWithdrawShare);

       return await xVaultcontract.methods.withdraw(BigInt(sharesFinal))
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

export default WithdrawSavingsBUSDXAuto;