import { notify } from "../../../../components/core/Notifier";
import getAllBalances from "../../getAllBalances";
import DepositSavingsAAVEMatic from "../methods/depositAAVEMaticXAuto";


function DepositAAVEMatic(amount: any,addressOwner:string,chainId:any) {
    return async (dispatch: Function) => {
        
        try {
            notify('success', 'AAVE Matic Deposit Initiated');
           // dispatch(loader(id));
            const response = await DepositSavingsAAVEMatic(amount,addressOwner,chainId);
           
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

export default DepositAAVEMatic;