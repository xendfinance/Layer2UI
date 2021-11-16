import { notify } from "../../../../components/core/Notifier";
import DepositSavingsBNBXAuto from "../methods/depositBNBBSCXAuto";
import { rehydrateVault } from "../../../hydrate";

function DepositBNBBSCXAuto(amount: any, addressOwner: string, chainId: any) {
    return async (dispatch: Function) => {

        try {
            notify('success', 'BNB BSC Deposit Initiated');
            // dispatch(loader(id));
            const response = await DepositSavingsBNBXAuto(amount, addressOwner, chainId);

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

export default DepositBNBBSCXAuto;