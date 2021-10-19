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
    usdcBalance:''
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
            
        case _const.USDTBALANCE:
            return { ...state, usdtBalance: action.payload }
            
        case _const.BUSDBALANCE:
            return { ...state, busdBalance: action.payload }
            
        case _const.USDCBALANCE:
            return { ...state, usdcBalance: action.payload }
                

        default:
            return state;
    }
};

// dispatch({
//     type: _const.PROTOCOLS,
//     payload: PROTOCOLS
// })

export default DashboardReducer;
