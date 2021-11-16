import { notify } from "../../../../components/core/Notifier";
import DepositSavingsWBTCMatic from "../methods/depositWBTCMaticXAuto";
import { rehydrateVault } from "../../../hydrate";


function DepositWBTCMatic(amount: any, addressOwner: string, chainId: any) {
    return async (dispatch: Function) => {

        try {
            notify('success', 'USDT Matic Deposit Initiated');
            // dispatch(loader(id));
            const response = await DepositSavingsWBTCMatic(amount, addressOwner, chainId);

            const arrayOfResProperties = Object.keys(response);

            if (arrayOfResProperties.includes('status') && response.status) {


                dispatch(rehydrateVault());

            } else {
                notify('error', 'Something went wrong');
            }
            if (response.message == 'User rejected the transaction' || response.message == 'User canceled') {
                notify('error', 'Transaction Rejected');
            }
            // //dispatch(loader(id));
        } catch (err) {
            //dispatch(loader(id));
            notify('error', 'Something went wrong');
        }
    };
}

export default DepositWBTCMatic;