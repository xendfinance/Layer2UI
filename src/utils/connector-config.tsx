import { Config, ConnectorNames } from './types';
import Metamask from '../assets/Metamask.svg';
import WalletConnect from '../assets/Walletconnect.svg'
import TrustWallet from '../assets/TrustWallet.svg';

const connectors: Config[] = [
    {
        title: 'Metamask',
        icon: 'metamask',
        image: Metamask,
        connectorId: ConnectorNames.Injected,
    },
    {
        title: 'WalletConnect',
        icon: 'walletconnect',
        image: WalletConnect,
        connectorId: ConnectorNames.WalletConnect,
    },
    {
        title: 'TrustWallet',
        icon: 'trustwallet',
        image: TrustWallet,
        connectorId: ConnectorNames.WalletConnect,
    },
];

export default connectors;
export const connectorLocalStorageKey = 'connectorId';
