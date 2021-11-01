import Web3Modal from 'web3modal';
import Web3 from 'web3';
import WalletConnectProvider from "@walletconnect/web3-provider";
import saveAddress from '../../utils/save-address';
// import retrieveAddress from '../../retrieve-address';
import removeAddress from '../../utils/remove-address';
import _const from '../../_const';
import Swal from 'sweetalert2';
import { reacquireEmit } from '../../utils/event-fnc-recall';
import { connectorLocalStorageKey } from '../../../utils/config';
import getNodeUrl from '../../../utils/node-url';
const rpcUrl = getNodeUrl();
const chainId = parseInt("56", 10);
const POLLING_INTERVAL = 12000;

export const web3Connection = async function () {

    const providerOptions = {
        walletconnect: {
            package: WalletConnectProvider,
            options: {
                rpc: {
                    56: 'https://bsc-dataseed1.defibit.io/',
                    137: "https://rpc-mumbai.matic.today",
                    //1: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"       
                },
                //network: 'binance',
            }
        }
    };


    const web3Modal = new Web3Modal({
        //network: "ganache", // optional
        cacheProvider: true, // optional
        providerOptions: providerOptions
    });

    web3Modal.clearCachedProvider()
    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);
    return web3;
};


//this method connects the clients crypto wallet to the app
export const connectWallet = () => async (dispatch: Function) => {
    if (typeof window.ethereum !== 'undefined') {

   console.log("HIT THIS Section 1 Logic")
    } else {

       
   console.log("HIT THIS Section 2 Logic")
    }
};

export const connectWalletConnect = () => async (dispatch: Function) => { };

// export const isClientNull = () => async (dispatch: Function) => {

//   const address = retrieveAddress();

//   setTimeout(async () => {
//     //

//     if (address) {
//       dispatch({
//         type: _const.ADDRESS,
//         payload: address
//       })

//     } else {

//       if (typeof window.ethereum !== 'undefined') {

//         const connected = await window.ethereum.request({
//           method: 'wallet_requestPermissions',
//           params: [
//             {
//               eth_accounts: {}
//             }
//           ]
//         })

//         // gets the first account on the array... check if we can set it to connect to only one at a time
//         if (Array.isArray(connected) && connected.length > 0) {

//           const caveats = connected[0].caveats;
//           if (Array.isArray(caveats)) {
//             caveats.map((caveatObject) => {
//               if (caveatObject.name === "exposedAccounts") {
//                 const accountsList = caveatObject.value;
//                 if (accountsList.length > 0) {

//                   dispatch({
//                     type: _const.ADDRESS,
//                     payload: accountsList[0]
//                   })

//                   setTimeout(() => {

//                     // refreshData(address, accountsList[0]);

//                   }, 1000)
//                 }
//               }
//             })

//           }
//         }
//       }

//     }
//   }, 1000)

// }

export const disconnect = () => async (dispatch: Function) => {

    let connector: any = localStorage.getItem("CONNECTION_DETAILS");
    let { connectorID } = JSON.parse(connector);

    if (connectorID === "walletconnect") {
        localStorage.removeItem(connectorID)
    }


    removeAddress();



    window.sessionStorage.removeItem(connectorLocalStorageKey);
    window.sessionStorage.removeItem(_const.WEB3SETPROVIDER);
    window.sessionStorage.removeItem(_const.WEB3_WALLETCONNECT_HAS_DISCONNECTED);
    window.localStorage.removeItem(_const.NETWORK_PROVIDER_HAS_CHANGED);

    window.localStorage.removeItem("CONNECTION_DETAILS");

    dispatch({
        type: _const.PRISTINE,
    });


};
