import web3 from 'web3';
import { ConnectorNames } from './types';
import { connectorsByName } from './web3React';
import { nodes } from './node-url';
import { notify } from '../components/core/Notifier';
import _const from '../methods/_const';
import removeAddress from '../methods/utils/remove-address';
import { connectorLocalStorageKey } from './config';
import reduxStore from '../methods/redux';
import { Dispatch } from "redux"
import { useSelector } from 'react-redux';
import getAllBalances from 'methods/contracts/getAllBalances';


//Original
export const Login = (connectorID: ConnectorNames, chainId: number, lender: string) => {

    return async (dispatch: Function) => {
        try {
            let account: any = null;
           
            // const dt = { chainId, connectorID, walletName }
            
            // const walletConnectType = useSelector((store: any) => store.DashboardReducer.WCP);
            // console.log("WALLET CONNECT TYPE",walletConnectType);
            
            // const ChainId = useSelector((store: any) => store.DashboardReducer.networkConnect);
            // console.log("WALLET CONNECT TYPE",ChainId);

            const connector: any = connectorsByName(connectorID, chainId);


            // dispatch({
            //     type: _const.CONNDETAILS,
            //     payload: { address: account, connectorId: connectorID, chainId }
            // })

            if (connector) {

                if (connectorID === 'injected') {
                    await switchOrAddNetworkToMetamask(chainId);

                    let connection = await connector.activate();

                    account = connection.account;


                    window.APPWEB3 = new web3(web3.givenProvider);


                }


                if (connectorID === 'walletconnect') {
                    const result = await connector.enable();
                    account = result[0];


                    //very important 2 lines
                    delete connector.__proto__.request;
                    connector.hasOwnProperty("request") && delete connector.request


                    window.APPWEB3 = new web3(connector as any)
                }


                if (account) {
                    // dispatch({
                    //     type: _const.CONWALLETADD,
                    //     payload: { address: account, chainId:chainId }
                    // })
                    dispatch(getAllBalances(String(account),chainId));
                    
                }

               const dt = { chainId, connectorID, lender,account }
               localStorage.setItem("CONNECTION_DETAILS", JSON.stringify(dt))


            } else {
                console.warn("Can't find connector \n The connector config is wrong");
            }
        } catch (error) {
            console.log(error);
        }

    }

};


export const recreateWeb3 = () => {

    return async (dispatch: Function) => {

        try {
             const connectionDetails = JSON.parse(localStorage.getItem('CONNECTION_DETAILS') || '{}');



            if (connectionDetails) {
                

                let { chainId, connectorID, lender,account } = connectionDetails;
                // dispatch({
                //     type: _const.ADDRESS,
                //     payload: { address: account, walletInUse: connectorID, chainId }
                // })


                const connector: any = connectorsByName(connectionDetails.connectorID, connectionDetails.chainId);

                if (connector) {

                    if (connectionDetails.connectorID === 'injected') {
                        await switchOrAddNetworkToMetamask(connectionDetails.chainId);

                        let connection = await connector.activate();

                        connection.provider.on('accountsChanged', (code: any, reason: string) => {

                            const accountSwitch = code[0];
                            if (accountSwitch) {
                                if (accountSwitch) {
                                    dispatch({
                                        type: _const.ADDRESS,
                                        payload: { address: accountSwitch }
                                    })
                                }
                            } else {
                                DisconnectFromWallet();
                            }
                        });

                        account = connection.account;

                        window.APPWEB3 = await new web3(web3.givenProvider);

                    }


                    if (connectionDetails.connectorID === 'walletconnect') {
                        const result = await connector.enable();
                        account = result[0];


                        // very important 2 lines
                        delete connector.__proto__.request;
                        connector.hasOwnProperty("request") && delete connector.request



                        const provider: any = await new web3(connector as any)

                        window.APPWEB3 = provider;

                    }


                    if (account) {
                        dispatch(getAllBalances(String(account),chainId));
                    }

                } else {
                    console.warn("Can't find connector \n The connector config is wrong");
                }
            } else {
                console.log("Storage Data Not There Yet Show Modal");
            }


        } catch (error) {
            console.log(error)
        }

    }

};


export const DisconnectFromWallet = async () => {

    try {
        let connector: any = localStorage.getItem("CONNECTION_DETAILS");
        let { connectorID } = JSON.parse(connector);

        if (connectorID === "walletconnect") {
            localStorage.removeItem(connectorID)
        }

        removeAddress();

       
        window.localStorage.removeItem("CONNECTION_DETAILS");

        // const ConnectWalletReducerAction: any = await reduxStore();
        // ConnectWalletReducerAction.dispatch({
        //     type: _const.PRISTINE,
        // });
        window.location.reload();

    } catch (error) {
        console.log(error)
    }

};



async function switchOrAddNetworkToMetamask(chainId: number) {

    const hexChainId = `0x${chainId.toString(16)}`;

    try {
        // switch to the selected network
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: hexChainId }]
        })



    } catch (e :any) {

        if (e.code === 4902) {

            let params: any = {};

            // add bsc network
            if (chainId === 56) {

                params = {
                    chainId: hexChainId,
                    chainName: 'Binance Smart Chain Mainnet',
                    nativeCurrency: {
                        name: 'BNB',
                        symbol: 'bnb',
                        decimals: 18,
                    },
                    rpcUrls: nodes,
                    blockExplorerUrls: ['https://bscscan.com/'],
                }

            }


            // add polygon
            if (chainId === 137) {
                params = {
                    chainId: hexChainId,
                    chainName: 'Polygon Mainnet',
                    nativeCurrency: {
                        name: 'MATIC',
                        symbol: 'matic',
                        decimals: 18,
                    },
                    rpcUrls: ['https://rpc-mainnet.matic.network'],
                    blockExplorerUrls: ['https://explorer.matic.network/'],
                }
            }

            try {

                // the network is added
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [params]
                });
            } catch (e) {
                console.log(e);
                notify('error', 'Failed to add network to metamask')
            }


        }




    }
}

function dispatch(arg0: { type: string; payload: { address: any; walletInUse: string; chainId: number; }; }) {
    throw new Error('Function not implemented.');
}
