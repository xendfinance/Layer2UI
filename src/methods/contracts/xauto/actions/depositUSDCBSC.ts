import { notify } from "../../../../components/core/Notifier";
import getAllBalances from "../../getAllBalances";
import DepositSavingsUSDCBSCXAuto from "../methods/depositUSDCBSCXAuto";



function DepositUSDCBSCXAuto(amount: any,addressOwner:string,chainId:any) {
    return async (dispatch: Function) => {
        
        try {
            notify('success', 'USDC BSC Deposit Initiated');
           // dispatch(loader(id));
            const response = await DepositSavingsUSDCBSCXAuto(amount,addressOwner,chainId);
           
            const arrayOfResProperties = Object.keys(response);
           
            if (arrayOfResProperties.includes('status') && response.status) {
              

                dispatch(getAllBalances(addressOwner,chainId));
               
            } else {
                notify('error', 'Something went wrong');
            }
            if(response.message == 'User rejected the transaction' || response.message == 'User canceled'){
                notify('error', 'Transaction Rejected');
            }
            // //dispatch(loader(id));
        } catch (err) {
            //dispatch(loader(id));
            notify('error', 'Something went wrong');
        }
    };
}

export default DepositUSDCBSCXAuto;