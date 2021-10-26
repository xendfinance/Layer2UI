import createContract from '../../contract-creator';
import abiManager from '../../../../abiManager';
import Notify from "bnc-notify";
import { toBigNumber, toBigNumberWBTC } from 'methods/utils/multiply-amount';

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
      
       
    //    const amountDeposit = Number(0.00001);
    //    console.log("Amount Deposit ",amountDeposit)

    //    const cnvertedAmounts = toBigNumberWBTC(amountDeposit)
    //    console.log("Converted Amount Deposit ",cnvertedAmounts)

     
       const valueIs = parseFloat('0.0001') * Math.pow(10, 8)
       console.log("Converted Amount Deposit ",valueIs)
       const BigIntValue = BigInt(valueIs);
       console.log("BIG INT CONVETED VALUE IS",BigIntValue)
       await wbtcContractMatic.methods
       .approve(xAutocontract._address, BigIntValue)
       .send({ from: ownerAddress })
       .on('transactionHash', (hash: string) => {
           console.log(hash, ' the transaction hash')
           notifyBNC.hash(hash);
       });
     

       const res =  await xAutocontract.methods.deposit(BigIntValue)
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

export default DepositSavingsWBTCMatic;



