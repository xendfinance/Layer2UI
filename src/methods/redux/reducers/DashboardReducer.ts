import _const from '../../_const';

type Action = {
    type: string;
    payload: any;
};

const initialState = {
    address: '',    
    chainId: 0,
    nativeBalance: '0.00',
    connectionDetails:[],
    lender:'X Vault',
    protocols: [],
    wcp:'injected',
    networkConnect:'56',
    wca:'',
    usdtBalance:'',
    busdBalance:'',
    usdcBalance:'',
    busdDepositBalance:0,
    usdtBalanceMatic:'',
    usdcBalanceMatic:'',
    aaveBalanceMatic:'',
    wbtcBalanceMatic:'',
    dashboardGrid:{},
    dashboardGridMatic:{}

};

const DashboardReducer = (state = initialState, action: Action) => {
    switch (action.type) {      
        case _const.LENDER:
            return { ...state, lender: action.payload };
        case _const.CONNDETAILS:
            return { ...state, connectionDetails: action.payload };
        case _const.PROTOCOLS:
            return { ...state, protocols: action.payload }
        case _const.WCP:
            return { ...state, wcp: action.payload }
        case _const.NETWORK_CONNECT:
                return { ...state, networkConnect: action.payload }

        case _const.CONWALLETADD:
            return { ...state, wca: action.payload }
        
        //bsc    
        case _const.USDTBALANCE:
            return { ...state, usdtBalance: action.payload }
            
        case _const.BUSDBALANCE:
            return { ...state, busdBalance: action.payload }
            
        case _const.USDCBALANCE:
            return { ...state, usdcBalance: action.payload }

                  
        case _const.BUSDDEPOSITBALANCE:
            return { ...state, busdDepositBalance: action.payload }


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
