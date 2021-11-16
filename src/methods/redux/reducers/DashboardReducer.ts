import _const from '../../_const';

type Action = {
    type: string;
    payload: any;
};

const initialState = {
    address: '',
    chainId: null,
    nativeBalance: '0.00',
    connectionDetails: [],
    lender: null,
    protocols: [],
    wcp: 'injected',
    networkConnect: '56',
    wca: '',
    usdtBalance: '0.00',
    busdBalance: '0.00',
    usdcBalance: '0.00',
    bnbBalance: '0.00',
    busdDepositBalance: '0.00',
    usdtDepositBalance: '0.00',
    usdcDepositBalance: '0.00',
    userBusdDepositBalanceXAuto: '0.00',
    userUsdtDepositBalanceXAuto: '0.00',
    userUsdcDepositBalanceXAuto: '0.00',
    userBnbDepositBalanceXAuto: '0.00',
    aaveDepositBalanceMatic: '0.00',
    usdtDepositBalanceMatic: '0.00',
    wbtcDepositBalanceMatic: '0.00',
    usdcDepositBalanceMatic: '0.00',
    usdtBalanceMatic: '0.00',
    usdcBalanceMatic: '0.00',
    aaveBalanceMatic: '0.00',
    wbtcBalanceMatic: '0.00',
    dashboardGrid: {},
    dashboardGridMatic: {},
    walletInUse: '',
    highestApyXAutoBsc: '',
    highestApyXVaultBsc: '',
    highestApyXAutoMatic: '',
    loading: false
};

const DashboardReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case _const.LOADING:
            return { ...state, loading: action.payload }

        case _const.ADDRESS:
            return { ...state, ...action.payload };
        case _const.NATIVE_BALANCE:
            return { ...state, nativeBalance: action.payload };
        case _const.PRISTINE:
            return { ...state, address: '', nativeBalance: '0.0000' };
        case _const.LENDER:
            return { ...state, lender: action.payload };

        case _const.HIGHESTAPYXAUTO:
            return { ...state, highestApyXAutoBsc: action.payload };
        case _const.HIGHESTAPYXVAULT:
            return { ...state, highestApyXVaultBsc: action.payload };
        case _const.HIGHESTAPYXAUTOMATIC:
            return { ...state, highestApyXAutoMatic: action.payload };

        case _const.WALLETINUSE:
            return { ...state, walletInUse: action.payload };
        case _const.CONNDETAILS:
            return { ...state, connectionDetails: action.payload };
        case _const.PROTOCOLS:
            return { ...state, protocols: action.payload }
        case _const.WCP:
            return { ...state, wcp: action.payload }
        case _const.NETWORK_CONNECT:
            return { ...state, networkConnect: action.payload }

        case _const.CONWALLETADD:
            return { ...state, ...action.payload, wca: action.payload }

        //bsc    
        case _const.USDTBALANCE:
            return { ...state, usdtBalance: action.payload }

        case _const.BNBBALANCE:
            return { ...state, bnbBalance: action.payload }

        case _const.BUSDBALANCE:
            return { ...state, busdBalance: action.payload }

        case _const.USDCBALANCE:
            return { ...state, usdcBalance: action.payload }


        case _const.BUSDDEPOSITBALANCE:
            return { ...state, busdDepositBalance: action.payload }


        case _const.USDTDEPOSITBALANCE:
            return { ...state, usdtDepositBalance: action.payload }


        case _const.USDCDEPOSITBALANCE:
            return { ...state, usdcDepositBalance: action.payload }

        case _const.userBUSDDEPOSITBALANCEXAuto:
            return { ...state, userBusdDepositBalanceXAuto: action.payload }


        case _const.userUSDTDEPOSITBALANCEXAuto:
            return { ...state, userUsdtDepositBalanceXAuto: action.payload }


        case _const.userUSDCDEPOSITBALANCEXAuto:
            return { ...state, userUsdcDepositBalanceXAuto: action.payload }

        case _const.userBNBDEPOSITBALANCEXAuto:
            return { ...state, userBnbDepositBalanceXAuto: action.payload }


        case _const.AAVEDEPOSITBALANCEMatic:
            return { ...state, aaveDepositBalanceMatic: action.payload }


        case _const.USDCDEPOSITBALANCEMatic:
            return { ...state, usdcDepositBalanceMatic: action.payload }


        case _const.USDTDEPOSITBALANCEMatic:
            return { ...state, usdtDepositBalanceMatic: action.payload }


        case _const.WBTCDEPOSITBALANCEMatic:
            return { ...state, wbtcDepositBalanceMatic: action.payload }


        //Matic    
        case _const.USDTBALANCEMatic:
            return { ...state, usdtBalanceMatic: action.payload }

        case _const.USDCBALANCEMatic:
            return { ...state, usdcBalanceMatic: action.payload }

        case _const.AAVEBALANCEMatic:
            return { ...state, aaveBalanceMatic: action.payload }

        case _const.WBTCBALANCEMatic:
            return { ...state, wbtcBalanceMatic: action.payload }

        case _const.DashboardGrid:
            return { ...state, dashboard: action.payload }

        case _const.DashboardGridMatic:
            return { ...state, dashboardMatic: action.payload }


        default:
            return state;
    }
};

// dispatch({
//     type: _const.PROTOCOLS,
//     payload: PROTOCOLS
// })

export default DashboardReducer;
