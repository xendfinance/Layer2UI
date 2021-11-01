
const storageName = '__protocol-conf__';

export const changeProtocol = (protocol: any) => {
    return localStorage.setItem(storageName, protocol);
};

export const getCurrentProtocol = () => {
    let current = localStorage.getItem(storageName);
    if (current === null) {
        return 'venus';
    } else {
        return current;
    }
};

export interface Address {
    PROTOCOL_ADAPTER: any
    GROUPS: any   
    PROTOCOL_SERVICE: any
    xvault:any
    YEARN_GROUP: any
    BUSD_TOKEN: any
    APR: any
    XEND_TOKEN: any
    AGGREGATED_APR: any
    INDIVIDUAL: any
    GET_BUSD: any
    CLIENT_RECORD: any
    PORFOLIO: any
    REWARDCONFIG: any
    PROTOCOL_CURRENCY: any
}


const timeout = (s: number) => {
    return new Promise(resolve => setTimeout(resolve, s * 1000));
}

export const assignAddresses = async () => {
    const activeProtocol = getCurrentProtocol();

    switch (activeProtocol) {
        case 'xfault':
            setXVaultAddresses();
            await timeout(1);
            break;

        case 'xauto':
            setXAutoAddresses();
            await timeout(1);
            break;

        // case 'ddollar':
        //     setDefiDollarAddresses();
        //     await timeout(1);
        //     break;

        // case 'yearn':
        //     setYearnAddresses();
        //     await timeout(1);
        //     break;

        default:
            break;
    }
}


const setXVaultAddresses = () => {
   
     window.XVAULT = process.env.CONTRACT_ADDRESS_XVAULT;
    // window.GROUPS = process.env.REACT_APP_GROUPS;
    // window.CYCLES = process.env.REACT_APP_CYCLES;
    // window.ESUSU_SERVICE = process.env.REACT_APP_ESUSU_SERVICE;
    // window.ESUSU_STORAGE = process.env.REACT_APP_ESUSU_STORAGE;
    // window.ESUSU_ADAPTER = process.env.REACT_APP_ESUSU_ADAPTER;
    // window.YEARN_GROUP = process.env.REACT_APP_YEARN_GROUP;
    // window.BUSD_TOKEN = process.env.REACT_APP_BUSD_TOKEN;
    // window.APR = process.env.REACT_APP_APR;
    // window.XEND_TOKEN = process.env.REACT_APP_XEND_TOKEN;
    // window.AGGREGATED_APR = process.env.REACT_APP_AGGREGATED_APR;
    // window.INDIVIDUAL = process.env.REACT_APP_INDIVIDUAL;
    // window.GET_BUSD = process.env.REACT_APP_GET_BUSD;
    // window.CLIENT_RECORD = process.env.REACT_APP_CLIENT_RECORD;
    // window.PORFOLIO = process.env.REACT_APP_VBUSD;
    // window.REWARDCONFIG = process.env.REACT_APP_REWARDCONFIG;
    // window.PROTOCOL_CURRENCY = "VBUSD";
    // window.NATIVE_CURRENCY = "BNB";
    // window.TOKEN = "BUSD";
}



const setXAutoAddresses = () => {
    // window.PROTOCOL_ADAPTER = process.env.REACT_APP_FORTUBE_ADAPTER;
    // window.PROTOCOL_SERVICE = process.env.REACT_APP_FORTUBE_SERVICE;
    // window.GROUPS = process.env.REACT_APP_FT_GROUPS;
    // window.CYCLES = process.env.REACT_APP_FT_CYCLE;
    // window.ESUSU_SERVICE = process.env.REACT_APP_FT_ESUSU_SERVICE;
    // window.ESUSU_STORAGE = process.env.REACT_APP_FT_ESUSU_STORAGE;
    // window.ESUSU_ADAPTER = process.env.REACT_APP_FT_ESUSU_ADAPTER;
    // window.YEARN_GROUP = process.env.REACT_APP_FT_XENDFINANCE_GROUP;
    // window.XEND_TOKEN = process.env.REACT_APP_XEND_TOKEN;
    // window.INDIVIDUAL = process.env.REACT_APP_FT_XENDFINANCE_INDIVIDUAL;
    // window.CLIENT_RECORD = process.env.REACT_APP_FT_CLIENT_RECORD;
    // window.REWARDCONFIG = process.env.REACT_APP_FT_REWARD_CONFIG;
    // window.PORFOLIO = process.env.REACT_APP_FBUSD;
    // window.BUSD_TOKEN = process.env.REACT_APP_BUSD_TOKEN;
    // window.PROTOCOL_CURRENCY = "FBUSD";

    // // this next ones
    // window.GET_BUSD = process.env.REACT_APP_GET_BUSD;

    // window.APR = process.env.REACT_APP_APR; // seems to not be used
    // window.AGGREGATED_APR = process.env.REACT_APP_AGGREGATED_APR; // seems to not be used too
    // window.NATIVE_CURRENCY = "BNB";
    // window.TOKEN = "BUSD";
}

// const setDefiDollarAddresses = () => {
//     // window.PROTOCOL_ADAPTER = process.env.REACT_APP_DUSD_ADAPTER;
//     // window.PROTOCOL_SERVICE = process.env.REACT_APP_DUSD_SERVICE;
//     // window.GROUPS = process.env.REACT_APP_D_GROUPS;
//     // window.CYCLES = process.env.REACT_APP_D_CYCLES;
//     // window.ESUSU_SERVICE = process.env.REACT_APP_D_ESUSU_SERVICE;
//     // window.ESUSU_STORAGE = process.env.REACT_APP_D_ESUSU_STORAGE;
//     // window.ESUSU_ADAPTER = process.env.REACT_APP_D_ESUSU_ADAPTER;
//     // window.YEARN_GROUP = process.env.REACT_APP_D_COOPERATIVE;
//     // window.BUSD_TOKEN = process.env.REACT_APP_BUSD_TOKEN;
//     // window.APR = process.env.REACT_APP_APR;
//     // window.XEND_TOKEN = process.env.REACT_APP_XEND_TOKEN;
//     // window.AGGREGATED_APR = process.env.REACT_APP_AGGREGATED_APR;
//     // window.INDIVIDUAL = process.env.REACT_APP_D_INDIVIDUAL;
//     // window.GET_BUSD = process.env.REACT_APP_GET_BUSD;
//     // window.CLIENT_RECORD = process.env.REACT_APP_D_CLIENT_RECORD;
//     // window.PORFOLIO = process.env.REACT_APP_VBUSD;
//     // window.REWARDCONFIG = process.env.REACT_APP_D_REWARD_CONFIG;
//     // window.PROTOCOL_CURRENCY = "iBDUSD";
//     // window.NATIVE_CURRENCY = "BNB";
//     // window.TOKEN = "BUSD";
// }




// const setYearnAddresses = () => {
//     // window.PROTOCOL_ADAPTER = process.env.REACT_APP_Y_DAILENDING_ADAPTER;
//     // // window.PROTOCOL_SERVICE = process.env.REACT_APP_DUSD_SERVICE;
//     // window.GROUPS = process.env.REACT_APP_Y_GROUPS;
//     // window.CYCLES = process.env.REACT_APP_Y_CYCLES;
//     // window.ESUSU_SERVICE = process.env.REACT_APP_Y_ESUSU_SERVICE;
//     // window.ESUSU_STORAGE = process.env.REACT_APP_Y_ESUSU_STORAGE;
//     // window.ESUSU_ADAPTER = process.env.REACT_APP_Y_ESUSU_ADAPTER;
//     // window.YEARN_GROUP = process.env.REACT_APP_Y_COOPERATIVE;

//     // window.BUSD_TOKEN = process.env.REACT_APP_DAI_TOKEN;

//     // window.XEND_TOKEN = process.env.REACT_APP_Y_XEND_TOKEN;
//     // window.INDIVIDUAL = process.env.REACT_APP_Y_INDIVIDUAL;

//     // window.CLIENT_RECORD = process.env.REACT_APP_Y_CLIENT_RECORD;
//     // window.PORFOLIO = process.env.REACT_APP_YDAI;
//     // window.REWARDCONFIG = process.env.REACT_APP_Y_REWARD_CONFIG;
//     // window.PROTOCOL_CURRENCY = "yDAI";
//     // window.NATIVE_CURRENCY = "ETH";
//     // window.TOKEN = "DAI";
// }