import createContract from '../../contract-creator';
import exposedWeb3 from '../../exposedWeb3';
import abiManager from '../../../../abiManager';
import Notify from "bnc-notify";
import { GetWithdrawAmountPerFullShareMaticUSDT, toBigNumber } from '../../../bignumber-converter';

async function WithdrawSavingsUSDCXBSCAuto(amount: any,addressOwner:string,chainId:any) {
    try {

        const ownerAddress = addressOwner;

        const xVaultcontract = await createContract(abiManager.xvAutoBSCUSDC, "0x2C7a0FD397D20eb85b7c7F179015833f3dBfa665");
     

       let notifyBNC :any;
   
        if(chainId == 56){
            notifyBNC = Notify({
                dappId: 'a7f90c48-943a-4d3a-a8df-6ca5d0f7522a',     
                networkId: 56,
                mobilePosition: 'bottom',
                desktopPosition: 'bottomRight', 
              });
        }

       const pricePerShare = await xVaultcontract.methods.getPricePerFullShare().call();     
       const amountWithdraw =  parseFloat(amount);
       const pricePerShareConverted = Number(pricePerShare);

       const shares = GetWithdrawAmountPerFullShareMaticUSDT(amountWithdraw,pricePerShareConverted)* Math.pow(10, 18);   
       const sharesFinal = toBigNumber(shares);
     
       return await xVaultcontract.methods.withdraw(sharesFinal)
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

export default WithdrawSavingsUSDCXBSCAuto;