import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

import Vault from './Vault';
import VaultMobile from './VaultMobile';
import vault1 from 'assets/images/tether.svg';
import vault2 from 'assets/images/busd.svg';
import vault3 from 'assets/images/usdc.com.svg';
import vaultWBTC from 'assets/images/wrapped-bitcoin.svg';
import vaultAAVE from 'assets/images/aave.svg';
import {BrowserView, MobileView} from 'react-device-detect';
import getXVaultAPI from 'methods/redux/actions/get-apy-xvault';
import { useSelector } from 'react-redux';

interface Props {
    connected:any;
    chainId:any
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

const Vaultlist: React.FC<Props> = ({ connected,chainId }:any) => {
    const classes = useStyles();
   

    const [busdapy_xvault, setBusdAPYXVault] = useState('13.86');
    const [USDCapy_xvault, setUSDCAPYXVault] = useState('17.10');
    const [USDTapy_xvault, setUSDTAPYXVault] = useState('14.18');
    const [USDTTVL_xvault, setTVLUSDTXVault] = useState('277.32');
    const [BUSDTVL_xvault, setTVLBUSDXVault] = useState('305.00');
    const [USDCTVL_xvault, setTVLUSDCXVault] = useState('246.98');

  //matic
 
  const [USDCapy_xauto, setUSDCAPYXAuto] = useState('');
  const [USDTapy_xauto, setUSDTAPYXAuto] = useState('');
  const [AAVEapy_xauto, setAAVEAPYXAuto] = useState('');
  const [WBTCapy_xauto, setWBTCAPYXAuto] = useState('');

  const [USDTTVL_xauto, setTVLUSDTXAuto] = useState('');
  const [USDCTVL_xauto, setTVLUSDCXAuto] = useState('');
  const [AAVETVL_xauto, setTVLAAVEXAuto] = useState('');
  const [WBTCTVL_xauto, setTVLWBTCXAuto] = useState('');

  const initalList =  [
    {
        assetIcon: vault1,
        assetName: 'USDT',
        fees: 'XVault',
        balance: '0.00',
        netAPY: USDTapy_xvault,
        vaultasset: USDTTVL_xvault,
        availableDeposit: '0.00'
    },
    {
        assetIcon: vault2,
        assetName: 'BUSD',
        fees: 'XVault',
        balance: '0.00',
        netAPY: busdapy_xvault,
        vaultasset: BUSDTVL_xvault,
        availableDeposit: '0.00'
    },
    {
        assetIcon: vault3,
        assetName: 'USDC',
        fees: 'XVault',
        balance: '000.0',
        netAPY: USDCapy_xvault,
        vaultasset: USDCTVL_xvault,
        availableDeposit: '0.00'
    }
]
const [list, setList] = useState(initalList);


    const [lender, setLender] = useState('');
    const [apy, setApy] = useState({});
    const usdtBalances = useSelector((store: any) => store.DashboardReducer.usdtBalance);
    const busdBalances = useSelector((store: any) => store.DashboardReducer.busdBalance);
    const usdcBalances = useSelector((store: any) => store.DashboardReducer.usdcBalance); 
    const busdDepositUserBalance = useSelector((store: any) => store.DashboardReducer.busdDepositBalance); 

    //matic 
    const usdtBalancesMatic = useSelector((store: any) => store.DashboardReducer.usdtBalanceMatic);
    const wbtcBalancesMatic = useSelector((store: any) => store.DashboardReducer.wbtcBalanceMatic);
    const aaveBalancesMatic = useSelector((store: any) => store.DashboardReducer.aaveBalanceMatic); 
    const usdcBalancesMatic = useSelector((store: any) => store.DashboardReducer.usdcBalanceMatic); 
    
    const wca = useSelector((store: any) => store.DashboardReducer.wca);
    const lendingProtocol = useSelector((store: any) => store.DashboardReducer.lender);

     
    const dashboardValues = useSelector((store: any) => store.DashboardReducer.dashboard);
    const dashboardValuesMatic = useSelector((store: any) => store.DashboardReducer.dashboardMatic);
    
    
    const getxVaultApy = (chainId :any) => {
    

        //const apyObj :any = await getXVaultAPI(chainId);
        console.log("BACKEND RES BSC",dashboardValues)
        console.log("BACKEND RES MATIC",dashboardValuesMatic)

        if(dashboardValues && dashboardValuesMatic){
            if(chainId == 56){
               
                const busdString = dashboardValues.apyObj?.busd;
                if (busdString){
                    const finalAPY = Number(busdString).toFixed(2); 
                    setBusdAPYXVault(finalAPY);
                }
                const usdtString = dashboardValues.apyObj?.usdt;
                if (usdtString){
                    const finalAPY = Number(usdtString).toFixed(2); 
                    setUSDTAPYXVault(finalAPY);
                }
        
                const usdcString = dashboardValues.apyObj?.usdc;
                if (usdcString){
                    const finalAPY = Number(usdcString).toFixed(2); 
                    setUSDCAPYXVault(finalAPY);
                }
        
                const tvlUSDT = dashboardValues.apyObj?.tvlUSDTBsc;
                if (tvlUSDT){
                    const finalAPY = Number(tvlUSDT).toFixed(2); 
                    setTVLUSDTXVault(finalAPY);
                }
        
                const tvlBUSD = dashboardValues.apyObj?.tvlBUSD;
                if (tvlBUSD){
                    const finalAPY = Number(tvlBUSD).toFixed(2); 
                    setTVLBUSDXVault(finalAPY);
                }
        
                const tvlUSDC = dashboardValues.apyObj?.tvlUSDCBsc;
                if (tvlUSDC){
                    const finalAPY = Number(tvlUSDC).toFixed(2); 
                    setTVLUSDCXVault(finalAPY);
                }
                const lendingProtocol = dashboardValues.apyObj?.lendingProtocol;
                if (lendingProtocol){
                setLender(lendingProtocol)
                }
                
            }else{
    
    
                const wbtcAPR = dashboardValuesMatic.apyObjMatic?.wbtcApyMatic;
                if (wbtcAPR){                 
                    setWBTCAPYXAuto(wbtcAPR);
                }
    
                const usdtAPR = dashboardValuesMatic.apyObjMatic?.usdtApyMatic;
                if (usdtAPR){                 
                    setUSDTAPYXAuto(usdtAPR);
                }
    
                const usdcAPR = dashboardValuesMatic.apyObjMatic?.usdcApyMatic;
                if (usdcAPR){                 
                    setUSDCAPYXAuto(usdcAPR);
                }
    
                const aaveAPR = dashboardValuesMatic.apyObjMatic?.aaveApyMatic;
                if (aaveAPR){                 
                    setAAVEAPYXAuto(aaveAPR);
                }
               
        
                const tvlUSDT = dashboardValuesMatic.apyObjMatic?.tvlUSDTMatic;
                if (tvlUSDT){
                    const finalAPY = Number(tvlUSDT).toFixed(2); 
                    setTVLUSDTXAuto(finalAPY);
                }
        
                const tvlUSDCMatic = dashboardValuesMatic.apyObjMatic?.tvlUSDCMatic;
                if (tvlUSDCMatic){
                    const finalAPY = Number(tvlUSDCMatic).toFixed(2); 
                    setTVLUSDCXAuto(finalAPY);
                }
        
                const tvlAAVE = dashboardValuesMatic.apyObjMatic?.tvlAAVE;
                if (tvlAAVE){
                    const finalAPY = Number(tvlAAVE).toFixed(6); 
                    setTVLAAVEXAuto(finalAPY);
                }
    
                const tvlWBTC = dashboardValuesMatic.apyObjMatic?.tvlWBTC;
                if (tvlWBTC){
                    const finalAPY = Number(tvlWBTC).toFixed(6); 
                    setTVLWBTCXAuto(finalAPY);
                }
    
                const lendingProtocol = dashboardValuesMatic.apyObj?.lendingProtocol;
                if (lendingProtocol){
                setLender(lendingProtocol)
                }
            }
        }

       

       
      

    }

    const redrawVaultList = (chainId :any) =>{
  
        let usdtBalance;
        let busdBalance;
        let usdcBalance;
        let busdUserDepositValue;
        let usdtUserDepositValue;
        let usdcUserDepositValue;
   
   
        //matic
        let usdtBalanceMatic;
        let usdcBalanceMatic;
        let wbtcBalanceMatic;
        let aaveBalanceMatic;
   
      
        if(wca.address){   
            
             if(chainId == 56){
               usdtBalance = usdtBalances.usdtBalance;        
          
               busdBalance = busdBalances.busdBalance;
           
               usdcBalance = usdcBalances.usdcBalance;
               busdUserDepositValue = busdDepositUserBalance.busdDepositBalance;
               
              setList([
                 {
                     assetIcon: vault1,
                     assetName: 'USDT',
                     fees: 'XVault',
                     balance: '20.00',
                     netAPY: USDTapy_xvault,
                     vaultasset: USDTTVL_xvault,
                     availableDeposit: usdtBalance
                 },
                 {
                     assetIcon: vault2,
                     assetName: 'BUSD',
                     fees: 'XVault',
                     balance: busdUserDepositValue,
                     netAPY: busdapy_xvault,
                     vaultasset: BUSDTVL_xvault,
                     availableDeposit: busdBalance
                 },
                 {
                     assetIcon: vault3,
                     assetName: 'USDC',
                     fees: 'XVault',
                     balance: '2.00',
                     netAPY: USDCapy_xvault,
                     vaultasset: '2.00',
                     availableDeposit: usdcBalance
                 }
             ])
             }else if (chainId == 137){
   
               usdtBalanceMatic = usdtBalancesMatic.usdtBalanceMatic;        
          
               usdcBalanceMatic = usdcBalancesMatic.usdcBalanceMatic;
           
               aaveBalanceMatic = aaveBalancesMatic.aaveBalanceMatic;
               wbtcBalanceMatic = wbtcBalancesMatic.wbtcBalanceMatic;
   
               setList([
                   {
                       assetIcon: vault1,
                       assetName: 'USDT',
                       fees: 'XAuto',
                       balance: '20.00',
                       netAPY: Number(dashboardValuesMatic.apyObjMatic?.usdtApyMatic).toFixed(2),
                       vaultasset:  Number(dashboardValuesMatic.apyObjMatic?.tvlUSDTMatic).toFixed(2),
                       availableDeposit: usdtBalanceMatic
                   },
                   {
                       assetIcon: vault3,
                       assetName: 'USDC',
                       fees: 'XAuto',
                       balance: '2.00',
                       netAPY: Number(dashboardValuesMatic.apyObjMatic?.usdcApyMatic).toFixed(2),
                       vaultasset:  Number(dashboardValuesMatic.apyObjMatic?.tvlUSDCMatic).toFixed(2),
                       availableDeposit: usdcBalanceMatic
                   },
                   {
                       assetIcon: vaultAAVE,
                       assetName: 'AAVE',
                       fees: 'XAuto',
                       balance: '',
                       netAPY: Number(dashboardValuesMatic.apyObjMatic?.aaveApyMatic).toFixed(2),
                       vaultasset: Number(dashboardValuesMatic.apyObjMatic?.tvlAAVE).toFixed(6),
                       availableDeposit: aaveBalanceMatic
                   },
                   {
                       assetIcon: vaultWBTC,
                       assetName: 'WBTC',
                       fees: 'XAuto',
                       balance: '',
                       netAPY: Number(dashboardValuesMatic.apyObjMatic?.wbtcApyMatic).toFixed(2),
                       vaultasset: Number(dashboardValuesMatic.apyObjMatic?.tvlWBTC).toFixed(6),
                       availableDeposit: wbtcBalanceMatic
                   }
                   
               ])
             }  
         }else{
            if(dashboardValues && dashboardValuesMatic){
             if(chainId == 56){
               
                setList([
                    {
                        assetIcon: vault1,
                        assetName: 'USDT',
                        fees: 'XVault',
                        balance: '0.00',
                        netAPY: USDTapy_xvault,
                        vaultasset: USDTTVL_xvault,
                        availableDeposit: '0.00'
                    },
                    {
                        assetIcon: vault2,
                        assetName: 'BUSD',
                        fees: 'XVault',
                        balance: '0.00',
                        netAPY: busdapy_xvault,
                        vaultasset: BUSDTVL_xvault,
                        availableDeposit: '0.00'
                    },
                    {
                        assetIcon: vault3,
                        assetName: 'USDC',
                        fees: 'XVault',
                        balance: '0.00',
                        netAPY: USDCapy_xvault,
                        vaultasset: USDCTVL_xvault,
                        availableDeposit: '0.00'
                    }
                ])
             }else{
                setList([
                    {
                        assetIcon: vault1,
                        assetName: 'USDT',
                        fees: 'XAuto',
                        balance: '0.00',
                        netAPY: Number(dashboardValuesMatic.apyObjMatic?.usdtApyMatic).toFixed(2),
                        vaultasset: Number(dashboardValuesMatic.apyObjMatic?.tvlUSDTMatic).toFixed(2),
                        availableDeposit: '0'
                    },
                    {
                        assetIcon: vault3,
                        assetName: 'USDC',
                        fees: 'XAuto',
                        balance: '0.00',
                        netAPY: Number(dashboardValuesMatic.apyObjMatic?.usdcApyMatic).toFixed(2),
                        vaultasset: Number(dashboardValuesMatic.apyObjMatic?.tvlUSDCMatic).toFixed(2),
                        availableDeposit: '0'
                    },
                    {
                        assetIcon: vaultAAVE,
                        assetName: 'AAVE',
                        fees: 'XAuto',
                        balance: '0.00',
                        netAPY: Number(dashboardValuesMatic.apyObjMatic?.aaveApyMatic).toFixed(2),
                        vaultasset: Number(dashboardValuesMatic.apyObjMatic?.tvlAAVE).toFixed(6),
                        availableDeposit: '0'
                    },
                    {
                        assetIcon: vaultWBTC,
                        assetName: 'WBTC',
                        fees: 'XAuto',
                        balance: '0.00',
                        netAPY: Number(dashboardValuesMatic.apyObjMatic?.wbtcApyMatic).toFixed(2),
                        vaultasset: Number(dashboardValuesMatic.apyObjMatic?.tvlWBTC).toFixed(6),
                        availableDeposit: '0'
                    }
                    
                ])
             }
            }
         }
    }


    // useEffect(()=>{       
    //     const buildDashboard = async () => {
    //         if(chainId.ChainId){
    //             const finalChainId = Number(chainId.ChainId);
    //             getxVaultApy(finalChainId);
    //             redrawVaultList(finalChainId); 
    //         }else{
    //             const finalChainId = Number(chainId);         
    //             getxVaultApy(finalChainId);
    //             redrawVaultList(finalChainId); 
    //         } 
    //       };
        
    //       buildDashboard();   
    // }, [])


    
    useEffect(()=>{
        if(chainId.ChainId){
            const finalChainId = Number(chainId.ChainId);
            getxVaultApy(finalChainId);
            redrawVaultList(finalChainId); 
        }else{
            const finalChainId = Number(chainId);         
            getxVaultApy(finalChainId);
            redrawVaultList(finalChainId); 
        } 
      
    }, [chainId])

    
    
        // if(lendingProtocol){
        //     if(lender == 'X Auto'){
        //         list = [
        //             {
        //                 assetIcon: vault1,
        //                 assetName: 'USDT',
        //                 fees: 'XAuto',
        //                 balance: '000.0',
        //                 netAPY: '0',
        //                 vaultasset: '0',
        //                 availableDeposit: '0.00'
        //             },
        //             {
        //                 assetIcon: vault2,
        //                 assetName: 'USDC',
        //                 fees: 'XAuto',
        //                 balance: '000.0',
        //                 netAPY: '0',
        //                 vaultasset: '0',
        //                 availableDeposit: '0.00'
        //             },
        //             {
        //                 assetIcon: vault3,
        //                 assetName: 'AAVE',
        //                 fees: 'XAuto',
        //                 balance: '000.0',
        //                 netAPY: '34%',
        //                 vaultasset: '0.00',
        //                 availableDeposit: '0.00'
        //             },
        //             {
        //                 assetIcon: vault3,
        //                 assetName: 'WBTC',
        //                 fees: 'XAuto',
        //                 balance: '000.0',
        //                 netAPY: '0.00',
        //                 vaultasset: '0.00',
        //                 availableDeposit: '0.00'
        //             }
        //         ]
        //   }else{
        //     list = [
        //         {
        //             assetIcon: vault1,
        //             assetName: 'USDT',
        //             fees: 'XVault',
        //             balance: '000.0',
        //             netAPY: USDTapy_xvault,
        //             vaultasset: USDTTVL_xvault,
        //             availableDeposit: '0.00'
        //         },
        //         {
        //             assetIcon: vault2,
        //             assetName: 'BUSD',
        //             fees: 'XVault',
        //             balance: '000.0',
        //             netAPY: busdapy_xvault,
        //             vaultasset: BUSDTVL_xvault,
        //             availableDeposit: '0.00'
        //         },
        //         {
        //             assetIcon: vault3,
        //             assetName: 'USDC',
        //             fees: 'XVault',
        //             balance: '000.0',
        //             netAPY: USDCapy_xvault,
        //             vaultasset: USDCTVL_xvault,
        //             availableDeposit: '0.00'
        //         }
        //     ]
        //   }
        // }else{
           
        // }
      
        
        return (
            <Box className={classes.root}>
                <BrowserView>
                    <Box className={classes.listForDesktop}>
                        <table>
                            <thead className={classes.listHeader}>
                                <tr>
                                    <th style={{width:"10%"}}>Asset</th>
                                    <th style={{width:"13%"}}>Fees</th>
                                    <th style={{width:"13%"}}>Balance</th>
                                    <th style={{width:"11%"}}>APY</th>
                                    <th style={{width:"15%"}}>Vault Assets</th>
                                    <th style={{width:"17%"}}>Available to deposit</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                
                                list.map((item, index)=>(
                                    <Vault
                                        key={index.toString()}
                                        assetIcon={item.assetIcon}
                                        assetName={item.assetName}
                                        fees={item.fees}
                                        balance={item.balance}
                                        netAPY={item.netAPY}
                                        vaultasset={item.vaultasset}
                                        availableDeposite={item.availableDeposit}
                                    />
                                ))
                            }
                            </tbody>
                        </table>
                            
                        <Box className={classes.tableInfo}>
                            <Box style={{fontSize: 14}}>More coming soon</Box>
                            <Box style={{fontSize: 13, marginTop: 5}}>Join Our Announcement Channel for Update</Box>
                        </Box>
                    </Box>
                </BrowserView>
                <MobileView>
                    {
                        list.map((item, index)=>(
                            <VaultMobile
                                className={classes.valutMobile}
                                key={index.toString()}
                                assetIcon={item.assetIcon}
                                assetName={item.assetName}
                                fees={item.fees}
                                balance={item.balance}
                                netAPY={item.netAPY}
                                vaultasset={item.vaultasset}
                                availableDeposite={item.availableDeposit}
                            />
                        ))
                    }
                </MobileView>
            </Box>
        );
    
   
}

export default Vaultlist;