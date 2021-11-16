import React, { useEffect, useState } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Tooltip from "@material-ui/core/Tooltip";
import Vault from './Vault';
import VaultMobile from './VaultMobile';
import vault1 from './../../../assets/icons/USDTether.svg';
import vault2 from './../../../assets/icons/BUSD1.svg';

import vault3 from './../../../assets/icons/USDC.svg';
import vault4 from './../../../assets/images/bnb.svg';
import vaultWBTC from './../../../assets/icons/WBTC.svg';
import vaultAAVE from './../../../assets/icons/AAVE.svg';
import { BrowserView, MobileView } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import assets from '../../../methods/assets';

interface Props {
    connected: any;
    chainId: any
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.background.default,
            minHeight: 550
        },
        listForDesktop: {
            backgroundColor: theme.palette.background.paper,
            boxShadow: '0px 14px 40px rgba(0, 0, 0, 0.1);',
            borderRadius: 10,
            "&>table": {
                borderCollapse: 'collapse',
                width: '100%'
            }
        },
        listHeader: {
            "&>tr>th": {
                fontWeight: 700,
                paddingTop: 17,
                paddingBottom: 17,
                color: theme.palette.text.primary,
                textAlign: 'center',
                fontSize: 14,
            }
        },
        tableInfo: {
            textAlign: 'center',
            marginTop: 30,
            padding: 17,
            color: theme.palette.text.secondary,
            fontWeight: 700
        },
        valutMobile: {
            marginTop: 12
        }
    }),
);

const Vaultlist: React.FC<Props> = ({ connected }: any) => {
    const classes = useStyles();

    const { chainId, lender } = useSelector((store: any) => store.DashboardReducer);

    const [busdapy_xvault, setBusdAPYXVault] = useState('');
    const [USDCapy_xvault, setUSDCAPYXVault] = useState('');
    const [USDTapy_xvault, setUSDTAPYXVault] = useState('');
    const [USDTTVL_xvault, setTVLUSDTXVault] = useState('');
    const [BUSDTVL_xvault, setTVLBUSDXVault] = useState('');
    const [USDCTVL_xvault, setTVLUSDCXVault] = useState('');

    //matic

    const [USDCapy_xauto, setUSDCAPYXAuto] = useState('');
    const [USDTapy_xauto, setUSDTAPYXAuto] = useState('');
    const [AAVEapy_xauto, setAAVEAPYXAuto] = useState('');
    const [WBTCapy_xauto, setWBTCAPYXAuto] = useState('');

    const [USDTTVL_xauto, setTVLUSDTXAuto] = useState('');
    const [USDCTVL_xauto, setTVLUSDCXAuto] = useState('');
    const [AAVETVL_xauto, setTVLAAVEXAuto] = useState('');
    const [WBTCTVL_xauto, setTVLWBTCXAuto] = useState('');

    const [list, setList] = useState([]);


    const [currentAssets, setcurrentAssets] = useState<Array<any>>([])



    useEffect(() => {

        console.log(chainId, lender)
        if (chainId && lender) {
            const x = assets.filter(item => item.network === Number(chainId) && item.protocolName === lender)

            setcurrentAssets(x);
        }


        // when network or protocolname changes
    }, [lender, chainId])





    const [load, setLoading] = useState(false);

    const loading = useSelector((store: any) => store.DashboardReducer.loading)

    const usdtBalances = useSelector((store: any) => store.DashboardReducer.usdtBalance);
    const busdBalances = useSelector((store: any) => store.DashboardReducer.busdBalance);
    const usdcBalances = useSelector((store: any) => store.DashboardReducer.usdcBalance);
    const bnbBalances = useSelector((store: any) => store.DashboardReducer.bnbBalance);
    //bsc
    const busdDepositUserBalance = useSelector((store: any) => store.DashboardReducer.busdDepositBalance);
    const usdtDepositUserBalance = useSelector((store: any) => store.DashboardReducer.usdtDepositBalance);
    const usdcDepositUserBalance = useSelector((store: any) => store.DashboardReducer.usdcDepositBalance);

    // //bsc XAUTO
    const busdDepositUserBalanceXAuto = useSelector((store: any) => store.DashboardReducer.userBusdDepositBalanceXAuto);
    const usdtDepositUserBalanceXAuto = useSelector((store: any) => store.DashboardReducer.userUsdtDepositBalanceXAuto);
    const usdcDepositUserBalanceXAuto = useSelector((store: any) => store.DashboardReducer.userUsdcDepositBalanceXAuto);
    const bnbDepositUserBalanceXAuto = useSelector((store: any) => store.DashboardReducer.userBnbDepositBalanceXAuto);

    //matic 
    const usdtBalancesMatic = useSelector((store: any) => store.DashboardReducer.usdtBalanceMatic);
    const wbtcBalancesMatic = useSelector((store: any) => store.DashboardReducer.wbtcBalanceMatic);
    const aaveBalancesMatic = useSelector((store: any) => store.DashboardReducer.aaveBalanceMatic);
    const usdcBalancesMatic = useSelector((store: any) => store.DashboardReducer.usdcBalanceMatic);

    const usdtDepositUserBalanceMatic = useSelector((store: any) => store.DashboardReducer.usdtDepositBalanceMatic);
    const usdcDepositUserBalanceMatic = useSelector((store: any) => store.DashboardReducer.usdcDepositBalanceMatic);
    const aaveDepositUserBalance = useSelector((store: any) => store.DashboardReducer.aaveDepositBalanceMatic);
    const wbtcDepositUserBalance = useSelector((store: any) => store.DashboardReducer.wbtcDepositBalanceMatic);

    const wca = useSelector((store: any) => store.DashboardReducer.wca);
    const lendingProtocol = useSelector((store: any) => store.DashboardReducer.lender);


    const dashboardValues = useSelector((store: any) => store.DashboardReducer.dashboard);
    const dashboardValuesMatic = useSelector((store: any) => store.DashboardReducer.dashboardMatic);

    const getxVaultApy = (chainId: any) => {




        if (dashboardValues && dashboardValuesMatic) {
            if (chainId == 56) {

                const busdString = dashboardValues.apyObj?.busd;
                if (busdString) {
                    const finalAPY = Number(busdString).toFixed(2);
                    setBusdAPYXVault(finalAPY);
                }
                const usdtString = dashboardValues.apyObj?.usdt;
                if (usdtString) {
                    const finalAPY = Number(usdtString).toFixed(2);
                    setUSDTAPYXVault(finalAPY);
                }

                const usdcString = dashboardValues.apyObj?.usdc;
                if (usdcString) {
                    const finalAPY = Number(usdcString).toFixed(2);
                    setUSDCAPYXVault(finalAPY);
                }

                const tvlUSDT = dashboardValues.apyObj?.tvlUSDTBsc;
                if (tvlUSDT) {
                    const finalAPY = Number(tvlUSDT).toFixed(2);
                    setTVLUSDTXVault(finalAPY);
                }

                const tvlBUSD = dashboardValues.apyObj?.tvlBUSD;
                if (tvlBUSD) {
                    const finalAPY = Number(tvlBUSD).toFixed(2);
                    setTVLBUSDXVault(finalAPY);
                }

                const tvlUSDC = dashboardValues.apyObj?.tvlUSDCBsc;
                if (tvlUSDC) {
                    const finalAPY = Number(tvlUSDC).toFixed(2);
                    setTVLUSDCXVault(finalAPY);
                }
                const lendingProtocol = dashboardValues.apyObj?.lendingProtocol;
                if (lendingProtocol) {
                    // setLender(lendingProtocol)
                }

            } else {


                const wbtcAPR = dashboardValuesMatic.apyObjMatic?.wbtcApyMatic;
                if (wbtcAPR) {
                    setWBTCAPYXAuto(wbtcAPR);
                }

                const usdtAPR = dashboardValuesMatic.apyObjMatic?.usdtApyMatic;
                if (usdtAPR) {
                    setUSDTAPYXAuto(usdtAPR);
                }

                const usdcAPR = dashboardValuesMatic.apyObjMatic?.usdcApyMatic;
                if (usdcAPR) {
                    setUSDCAPYXAuto(usdcAPR);
                }

                const aaveAPR = dashboardValuesMatic.apyObjMatic?.aaveApyMatic;
                if (aaveAPR) {
                    setAAVEAPYXAuto(aaveAPR);
                }


                const tvlUSDT = dashboardValuesMatic.apyObjMatic?.tvlUSDTMatic;
                if (tvlUSDT) {
                    const finalAPY = Number(tvlUSDT).toFixed(2);
                    setTVLUSDTXAuto(finalAPY);
                }

                const tvlUSDCMatic = dashboardValuesMatic.apyObjMatic?.tvlUSDCMatic;
                if (tvlUSDCMatic) {
                    const finalAPY = Number(tvlUSDCMatic).toFixed(2);
                    setTVLUSDCXAuto(finalAPY);
                }

                const tvlAAVE = dashboardValuesMatic.apyObjMatic?.tvlAAVE;
                if (tvlAAVE) {
                    const finalAPY = Number(tvlAAVE).toFixed(2);
                    setTVLAAVEXAuto(finalAPY);
                }

                const tvlWBTC = dashboardValuesMatic.apyObjMatic?.tvlWBTC;
                if (tvlWBTC) {
                    const finalAPY = Number(tvlWBTC).toFixed(2);
                    setTVLWBTCXAuto(finalAPY);
                }

                const lendingProtocol = dashboardValuesMatic.apyObj?.lendingProtocol;
                if (lendingProtocol) {
                    // setLender(lendingProtocol)
                }
            }
        }






    }

    const redrawVaultList = (chainId: any) => {


        setLoading(true)

        setLoading(false)
    }



    useEffect(() => {
        if (wca.chainId) {
            redrawVaultList(Number(wca.chainId));
        } else {
            const finalChainId = Number(chainId);

            redrawVaultList(finalChainId);
        }


    }, [chainId, dashboardValuesMatic, dashboardValues, lendingProtocol
        , usdcDepositUserBalanceMatic.usdcDepositBalanceMatic
        , usdtDepositUserBalanceMatic.usdtDepositBalanceMatic
        , wbtcDepositUserBalance.wbtcDepositBalanceMatic
        , aaveDepositUserBalance.aaveDepositBalanceMatic])

    useEffect(() => {
        if (wca.address && wca.chainId) {
            // if(wca.chainId){
            //     redrawVaultList(Number(wca.chainId)); 
            // }else{
            //     if(chainId.ChainId){
            //         const finalChainId = Number(chainId.ChainId);

            //         redrawVaultList(finalChainId); 
            //     }else{
            //         const finalChainId = Number(chainId);         

            //         redrawVaultList(finalChainId); 
            //     } 
            // }   

            const finalChainId = Number(wca.chainId);
            redrawVaultList(finalChainId);
            // if(chainId.ChainId){
            //     const finalChainId = Number(wca.chainId);

            //     redrawVaultList(finalChainId); 
            // }else{
            //     const finalChainId = Number(chainId);         

            //     redrawVaultList(finalChainId); 
            // } 

        }


    }, [usdtBalancesMatic.usdtBalanceMatic
        , usdcBalancesMatic.usdcBalanceMatic
        , aaveBalancesMatic.aaveBalanceMatic
        , wbtcBalancesMatic.wbtcBalanceMatic
        , usdtDepositUserBalanceMatic.usdtDepositBalanceMatic
        , usdcDepositUserBalanceMatic.usdcDepositBalanceMatic
        , wbtcDepositUserBalance.wbtcDepositBalanceMatic
        , aaveDepositUserBalance.aaveDepositBalanceMatic
    ])

    useEffect(() => {
        if (wca.address && wca.chainId.ChainId) {
            // if(wca.chainId){
            //     redrawVaultList(Number(wca.chainId)); 
            // }else{
            //     if(chainId.ChainId){
            //         const finalChainId = Number(chainId.ChainId);

            //         redrawVaultList(finalChainId); 
            //     }else{
            //         const finalChainId = Number(chainId);         

            //         redrawVaultList(finalChainId); 
            //     } 
            // }
            const finalChainId = Number(wca.chainId.ChainId);
            redrawVaultList(finalChainId);

        }


    }, [aaveDepositUserBalance.aaveDepositBalanceMatic
        , wbtcDepositUserBalance.wbtcDepositBalanceMatic
        , usdtDepositUserBalanceMatic.usdtDepositBalanceMatic
        , usdcDepositUserBalanceMatic.usdcDepositBalanceMatic
        , busdDepositUserBalance.busdDepositBalance
        , usdtDepositUserBalance.usdtDepositBalance
        , usdcDepositUserBalance.usdcDepositBalance
        , bnbBalances.bnbBalance
        , usdcDepositUserBalanceMatic.usdcDepositBalanceMatic
        , wbtcDepositUserBalance.wbtcDepositBalanceMatic
        , aaveDepositUserBalance.aaveDepositBalanceMatic])






    useEffect(() => {
        const finalChainId = Number(chainId);
        getxVaultApy(finalChainId);
        redrawVaultList(finalChainId);

    }, [chainId])


    const openAuditLink = (event: React.MouseEvent<HTMLButtonElement>) => {
        window.open("https://docs.xend.finance/contracts/audit");
    }



    return (
        <Box className={classes.root}>
            <BrowserView>
                <Box className={classes.listForDesktop}>
                    <table>
                        <thead className={classes.listHeader}>
                            <tr>
                                <th style={{ width: "11%" }}>
                                    <Tooltip
                                        title='Digital Assets Supported'
                                        placement="top"
                                    >
                                        <div>
                                            <span>Asset</span><QuestionCircleOutlined style={{ color: '#FF6600', paddingLeft: '3px' }} />
                                        </div>
                                    </Tooltip>
                                </th>
                                <th style={{ width: "10%" }}>
                                    <Tooltip
                                        title='This is the Xend Finance Layer 2 DeFi protocol'
                                        placement="top"
                                    >
                                        <div>
                                            <span>Protocol</span><QuestionCircleOutlined style={{ color: '#FF6600', paddingLeft: '3px' }} />
                                        </div>
                                    </Tooltip>
                                </th>
                                <th style={{ width: "10%" }}>
                                    <Tooltip
                                        title='This is overall user balance plus interest in the protocol'
                                        placement="top"
                                    >
                                        <div>
                                            <span>Balance</span><QuestionCircleOutlined style={{ color: '#FF6600', paddingLeft: '3px' }} />
                                        </div>
                                    </Tooltip>
                                </th>
                                <th style={{ width: "11%" }}>
                                    <Tooltip
                                        title='Annual Percentage Yield'
                                        placement="top"
                                    >
                                        <div>
                                            <span>APY</span><QuestionCircleOutlined style={{ color: '#FF6600', paddingLeft: '3px' }} />
                                        </div>
                                    </Tooltip>
                                </th>
                                <th style={{ width: "12%" }}>
                                    <Tooltip
                                        title='Total amount in USD held in each protocol based on selected asset'
                                        placement="top"
                                    >
                                        <div>
                                            <span>Total Value Locked</span><QuestionCircleOutlined style={{ color: '#FF6600', paddingLeft: '3px' }} />
                                        </div>
                                    </Tooltip>
                                </th>
                                <th style={{ width: "8%" }}>
                                    <Tooltip
                                        title='Audit status'
                                        placement="top"
                                    >
                                        <div>
                                            <span style={{ cursor: 'pointer' }} onClick={openAuditLink} >Audited</span><QuestionCircleOutlined style={{ color: '#FF6600', paddingLeft: '3px' }} />
                                        </div>
                                    </Tooltip>
                                </th>
                                <th style={{ width: "20%" }}>
                                    <Tooltip
                                        title='Wallet Balance'
                                        placement="top"
                                    >
                                        <div>
                                            <span>Available to deposit</span><QuestionCircleOutlined style={{ color: '#FF6600', paddingLeft: '3px' }} />
                                        </div>
                                    </Tooltip>
                                </th>
                                <th>{loading && <i className="fa fa-spinner fa-spin" style={{ color: "#edecec" }}></i>}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                list.map((item, index) => (

                                    <Vault
                                        key={index.toString()}
                                        contract={item.contractAddress}
                                        network={item.network}
                                        abi={item.abi}
                                        assetIcon={item.assetIcon}
                                        assetName={item.assetName}
                                        protocol={item.fees}
                                        balance={item.balance}
                                        netAPY={item.netAPY}
                                        vaultasset={item.vaultasset}
                                        auditedState={item.auditedState}
                                        availableDeposite={item.availableDeposit}
                                        tokenAddress={item.tokenAddress}
                                        tokenAbi={item.tokenAbi}
                                    />
                                ))
                            }
                            {
                                currentAssets.map((item: any, i: number) => (
                                    <Vault
                                        key={i}
                                        contract={item.protocolAddress}
                                        network={item.network}
                                        abi={item.protocolAbi}
                                        assetIcon={item.logo}
                                        protocol={item.protocolName}
                                        balance={item.balance}
                                        netAPY={item.apy}
                                        vaultasset={item.tvl}
                                        auditedState={item.auditStatus}
                                        availableDeposite={item.availableFunds}
                                        tokenAddress={item.tokenAddress}
                                        tokenAbi={item.tokenAbi}
                                        assetName={item.name} />
                                ))
                            }
                        </tbody>
                    </table>

                </Box>

                {
                    load &&
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                        <i className="fa fa-spinner fa-spin" style={{ color: "#edecec" }}></i>
                    </div>
                }

            </BrowserView>
            <MobileView>
                {
                    list.map((item, index) => (
                        <VaultMobile
                            className={classes.valutMobile}
                            key={index.toString()}
                            assetIcon={item.assetIcon}
                            assetName={item.assetName}
                            fees={item.fees}
                            balance={item.balance}
                            netAPY={item.netAPY}
                            vaultasset={item.vaultasset}
                            auditedState={item.auditedState}
                            availableDeposite={item.availableDeposit}
                        />
                    ))
                }
                {
                    load &&
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                        <i className="fa fa-spinner fa-spin" style={{ color: "#edecec" }}></i>
                    </div>
                }
            </MobileView>
        </Box>
    );


}

export default Vaultlist;