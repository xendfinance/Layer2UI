import createContract from '../../contract-creator';
import abiManager from '../../../../abiManager';
import Notify from "bnc-notify";


async function DepositSavingsUSDTMatic(amount: any,addressOwner:string,chainId:any) {
    try {
       
        const ownerAddress = addressOwner;

        const xAutocontract = await createContract(abiManager.xvAutoUSDT, "0x05b1d524671CA541c3457c0550a09f71604C2dEC");
        const usdtContractMatic = await createContract(abiManager.USDTMatic, "0xc2132D05D31c914a87C6611C10748AEb04B58e8F");


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


       await usdtContractMatic.methods.approve(xAutocontract._address, amountDeposit)
        .send({ from: ownerAddress })
        .on('transactionHash', (hash: string) => {            
            notifyBNC.hash(hash);
        });



       return await xAutocontract.methods.deposit(amountDeposit)
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

export default DepositSavingsUSDTMatic;

