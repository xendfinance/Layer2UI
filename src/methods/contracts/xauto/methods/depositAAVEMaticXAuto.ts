import createContract from '../../contract-creator';
import abiManager from '../../../../abiManager';
import Notify from "bnc-notify";
import { toBigNumber } from 'methods/utils/multiply-amount';

async function DepositSavingsAAVEMatic(amount: any,addressOwner:string,chainId:any) {
    try {

        const ownerAddress = addressOwner;

        console.log("DEPOSIT METHOD ",ownerAddress)

        const xAutocontract = await createContract(abiManager.xvAutoAAVE, "0x7103D2aa877624fA2d5AFc6A6728A8dfF71bDC82");
        const aaveContractMatic = await createContract(abiManager.AAVEMatic, "0xd6df932a45c0f255f85145f286ea0b292b21c90b");


       let notifyBNC :any;
   
    
        if(chainId == 137){
            notifyBNC = Notify({
                dappId: 'a7f90c48-943a-4d3a-a8df-6ca5d0f7522a',       
                networkId: 137,
                mobilePosition: 'bottom', 
                desktopPosition: 'bottomRight', 
              });
        }
      
       
       //const amountDeposit = Number(0.01) * Math.pow(10, 18)

       await aaveContractMatic.methods
       .approve(xAutocontract._address, toBigNumber(0.01))
       .send({ from: ownerAddress })
       .on('transactionHash', (hash: string) => {
           console.log(hash, ' the transaction hash')
           notifyBNC.hash(hash);
       });
     

       const res =  await xAutocontract.methods.deposit( toBigNumber(0.01))
            .send({ from: ownerAddress })
            .on('transactionHash', (hash: string) => {
                console.log(hash, ' the transaction hash')
                notifyBNC.hash(hash);
            })
      

    } catch (err :any) {
        console.log(err);
        return {
            status: false,
            message: err.message
        };
    }
}

export default DepositSavingsAAVEMatic;

