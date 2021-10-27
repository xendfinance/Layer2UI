import createContract from '../../contract-creator';
import abiManager from '../../../../abiManager';
import Notify from "bnc-notify";

async function DepositSavingsUSDCMatic(amount: any,addressOwner:string,chainId:any) {
    try {

        const ownerAddress = addressOwner;

        const xAutocontract = await createContract(abiManager.xvAutoUSDC, "0x3b1D848B20735B030D8ea85d2f516eb75c8e0e56");
        const usdcContractMatic = await createContract(abiManager.USDCMatic, "0x2791bca1f2de4661ed88a30c99a7a9449aa84174");


       let notifyBNC :any;
   
    
        if(chainId == 137){
            notifyBNC = Notify({
                dappId: 'a7f90c48-943a-4d3a-a8df-6ca5d0f7522a',       
                networkId: 137,
                mobilePosition: 'bottom', 
                desktopPosition: 'bottomRight', 
              });
        }
      
       
       const amountDeposit = Number(amount) * Math.pow(10, 6)

       await usdcContractMatic.methods
       .approve(xAutocontract._address, amountDeposit)
       .send({ from: ownerAddress })
       .on('transactionHash', (hash: string) => {
          
           notifyBNC.hash(hash);
       });
     

       const res =  await xAutocontract.methods.deposit(amountDeposit)
            .send({ from: ownerAddress })
            .on('transactionHash', (hash: string) => {
               
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

export default DepositSavingsUSDCMatic;

