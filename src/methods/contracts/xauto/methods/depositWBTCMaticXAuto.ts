import createContract from '../../contract-creator';
import abiManager from '../../../../abiManager';
import Notify from "bnc-notify";

async function DepositSavingsWBTCMatic(amount: any,addressOwner:string,chainId:any) {
    try {

        const ownerAddress = addressOwner;

        console.log("DEPOSIT METHOD ",ownerAddress)

        const xAutocontract = await createContract(abiManager.xvAutoWBTC, "0x0D81fF82f99eaCbc67E2404DD7FD8896905dF0f9");
        const wbtcContractMatic = await createContract(abiManager.WBTCMatic, "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6");


       let notifyBNC :any;
   
    
        if(chainId == 137){
            notifyBNC = Notify({
                dappId: 'a7f90c48-943a-4d3a-a8df-6ca5d0f7522a',       
                networkId: 137,
                mobilePosition: 'bottom', 
                desktopPosition: 'bottomRight', 
              });
        }
      

     //Minimum is 0.0001
       const valueIs = parseFloat(amount) * Math.pow(10, 8)
      
       const BigIntValue = BigInt(valueIs);
     
       await wbtcContractMatic.methods
       .approve(xAutocontract._address, BigIntValue)
       .send({ from: ownerAddress })
       .on('transactionHash', (hash: string) => {
          
           notifyBNC.hash(hash);
       });
     

      return await xAutocontract.methods.deposit(BigIntValue)
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

export default DepositSavingsWBTCMatic;



