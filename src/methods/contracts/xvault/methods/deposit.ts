import createContract from '../../contract-creator';
//import retrieveAddress from '../retrieve-address';
import { toBigNumber } from '../../../utils/multiply-amount';

import exposedWeb3 from '../../exposedWeb3';
import abiManager from '../../../../../src/abiManager';
import Notify from "bnc-notify";
import { notify } from '../../../../components/core/Notifier';

async function DepositSavingsUSDT(amount: any,addressOwner:string) {
    try {

        const ownerAddress = addressOwner;

        const xVaultcontract = await createContract(abiManager.XVault, "0xc8561ec37fBf2BDe992Dc746c2777dc792bfeF8C");
       

        const usdtContract = await createContract(abiManager.USDT, "0x55d398326f99059fF775485246999027B3197955");

      
        // let { chainId } = connectionDetails;
        // let notifyBNC;
        // if(chainId == 1){
        //     notifyBNC = Notify({
        //         dappId: 'a7f90c48-943a-4d3a-a8df-6ca5d0f7522a',     
        //         networkId: 1,
        //         mobilePosition: 'bottom', 
        //         desktopPosition: 'bottomRight',  
        //       });
        // }
        // if(chainId == 56){
        //     notifyBNC = Notify({
        //         dappId: 'a7f90c48-943a-4d3a-a8df-6ca5d0f7522a',     
        //         networkId: 56,
        //         mobilePosition: 'bottom',
        //         desktopPosition: 'bottomRight', 
        //       });
        // }
        // if(chainId == 137){
        //     notifyBNC = Notify({
        //         dappId: 'a7f90c48-943a-4d3a-a8df-6ca5d0f7522a',       
        //         networkId: 137,
        //         mobilePosition: 'bottom', 
        //         desktopPosition: 'bottomRight', 
        //       });
        // }
      
       
         await usdtContract.methods
            .approve(xVaultcontract.address, toBigNumber(amount))
            .send({ from: ownerAddress })
            .on('transactionHash', (hash: string) => {
                console.log(hash, ' the transaction hash')
               // notifyBNC.hash(hash);
            });
           

        // const receipt = await contract.methods.deposit().send({ from: ownerAddress })

        // return receipt

       const res =  await xVaultcontract.methods.deposit()
            .send({ from: ownerAddress })
            .on('transactionHash', (hash: string) => {
                // console.log(hash, ' the transaction hash')
                // notifyBNC.hash(hash);
            })
       return res;   

    } catch (err :any) {
        console.log(err);
        return {
            status: false,
            message: err.message
        };
    }
}

export default DepositSavingsUSDT;