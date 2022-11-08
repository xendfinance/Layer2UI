import { InjectedConnector } from '@web3-react/injected-connector';
import { ConnectorNames } from './types';
import getNodeUrl from './node-url';
import _const from '.././methods/_const';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { DisconnectFromWallet } from './useAuth';




const POLLING_INTERVAL = 12000;
const chainId = 56

let injected = new InjectedConnector({ supportedChainIds: [56, 137] });



export const connectorsByName = (connectorName: ConnectorNames, chainId: number) => {
    try {

      
        if (connectorName === ConnectorNames.Injected) {
       
            return injected;
        }
    
        if (connectorName === ConnectorNames.WalletConnect) {
          
            if(chainId === 56 ){
                
                const walletconnect = new WalletConnectProvider({
                    rpc: { 56: 'https://bsc-dataseed1.ninicoin.io' },
                    chainId,
                    qrcodeModalOptions: {
                        mobileLinks: [
                          "metamask",
                          "trust",
                        ],
                      },
                });
    
                // Subscribe to session disconnection
                walletconnect.on("disconnect", (code: number, reason: string) => {
                DisconnectFromWallet();
                });

               

                
                return walletconnect;
            }else{
                //If Matic Network 137
                const wcProviderMATIC = new WalletConnectProvider({
                   //rpc: {137: "https://rpc-mumbai.matic.today"},
                   //rpc: {137: "https://matic-mainnet.chainstacklabs.com"},
                   //rpc: {137: "https://polygon-rpc.com/c9a2fe300dd9496f9ee19bc4cb2c4689"},
                   rpc: {137: "https://polygon-mainnet.public.blastapi.io"},

                    
                    chainId,
                    qrcodeModalOptions: {
                        mobileLinks: [
                          "metamask",
                          "trust",
                        ],
                      },
                  })

                  wcProviderMATIC.on("disconnect", (code: number, reason: string) => {
                    DisconnectFromWallet();
                    });
                  return wcProviderMATIC;
            }
    
        }
    } catch (error) {
     
    }
}





