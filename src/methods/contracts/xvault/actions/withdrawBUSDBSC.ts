import { notify } from "components/core/Notifier";
import getAllBalances from "methods/contracts/getAllBalances";
import WithdrawSavingsBUSD from "../methods/withdrawBUSD";


function WithdrawBUSDBsc(amount: any,addressOwner:string,chainId:any) {
    return async (dispatch: Function) => {
        
        try {
            notify('success', 'USDT BSC Withdraw Initiated');
           // dispatch(loader(id));
            const response = await WithdrawSavingsBUSD(amount,addressOwner,chainId);
           
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

export default WithdrawBUSDBsc;