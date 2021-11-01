import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import ReactTooltip from 'react-tooltip';
import Vault from './Vault';
import VaultMobile from './VaultMobile';
import vault1 from 'assets/images/tether.svg';
import vault2 from 'assets/images/busd.svg';
import helpTooltip from 'assets/icons/help.svg';
import vault3 from 'assets/images/usdc.com.svg';
import vault4 from 'assets/images/bnb.svg';
import vaultWBTC from 'assets/images/wrapped-bitcoin.svg';
import vaultAAVE from 'assets/images/aave.svg';
import {BrowserView, MobileView} from 'react-device-detect';
import getXVaultAPI from 'methods/redux/actions/get-apy-xvault';
import { useDispatch, useSelector } from 'react-redux';
import getAllBalances from 'methods/contracts/getAllBalances';

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

  const initalList =  [
    {
        assetIcon: vault1,
        assetName: 'USDT',
        fees: 'XVault',
        balance: '0.00',
        netAPY: USDTapy_xvault,
        vaultasset: USDTTVL_xvault,
        auditedState:'',
        availableDeposit: '0.00'
    },
    {
        assetIcon: vault2,
        assetName: 'BUSD',
        fees: 'XVault',
        balance: '0.00',
        netAPY: busdapy_xvault,
        vaultasset: BUSDTVL_xvault,
        auditedState:'',
        availableDeposit: '0.00'
    },
    {
        assetIcon: vault3,
        assetName: 'USDC',
        fees: 'XVault',
        balance: '0.00',
        netAPY: USDCapy_xvault,
        vaultasset: USDCTVL_xvault,
        auditedState:'',
        availableDeposit: '0.00'
    }
]
const [list, setList] = useState(initalList);


    const [lender, setLender] = useState('');
    const [apy, setApy] = useState({});
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
    const dispatch = useDispatch()
    
    const getxVaultApy = (chainId :any) => {
    

        

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
                    const finalAPY = Number(tvlAAVE).toFixed(2); 
                    setTVLAAVEXAuto(finalAPY);
                }
    
                const tvlWBTC = dashboardValuesMatic.apyObjMatic?.tvlWBTC;
                if (tvlWBTC){
                    const finalAPY = Number(tvlWBTC).toFixed(2); 
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
  
        let usdtBalance='0.00';
        let busdBalance='0.00';
        let usdcBalance='0.00';
        let bnbBalance='0.00';
        let busdUserDepositValue ='0.00';
        let usdtUserDepositValue ='0.00';
        let usdcUserDepositValue ='0.00';

        let busdUserDepositValueXAuto ='0.00';
        let usdtUserDepositValueXAuto ='0.00';
        let usdcUserDepositValueXAuto ='0.00';
        let bnbUserDepositValueXAuto ='0.00';
   
   
        //matic
        let usdtBalanceMatic = '0.00';
        let usdcBalanceMatic= '0.00';
        let wbtcBalanceMatic= '0.00';
        let aaveBalanceMatic= '0.00';

        let aaveUserDepositValue ='0.00';
        let usdtUserDepositValueMatic ='0.00';
        let usdcUserDepositValueMatic ='0.00';
        let wbtcUserDepositValue ='0.00';
   
      
        if(wca.address){   
            
             if(chainId == 56){
               usdtBalance = usdtBalances.usdtBalance;        
          
               busdBalance = busdBalances.busdBalance;
           
               usdcBalance = usdcBalances.usdcBalance;
               bnbBalance=bnbBalances.bnbBalance;

               busdUserDepositValue = busdDepositUserBalance.busdDepositBalance;
               usdtUserDepositValue = usdtDepositUserBalance.usdtDepositBalance;
               usdcUserDepositValue = usdcDepositUserBalance.usdcDepositBalance;

               if(lendingProtocol == "X Vault" ||lendingProtocol == 'X Vault' ||lendingProtocol.lenderProtocol =='X Vault' || lendingProtocol.lenderProtocol=="X Vault" ){
                setList([
                    {
                        assetIcon: vault1,
                        assetName: 'USDT',
                        fees: 'XVault',
                        balance: Number(usdtUserDepositValue).toFixed(2),
                        netAPY: Number(dashboardValues.apyObj?.usdt).toFixed(2),
                        vaultasset: Number(dashboardValues.apyObj?.tvlUSDTBsc).toFixed(2),
                        auditedState:'audited',
                        availableDeposit: Number(usdtBalance).toFixed(2)
                    },
                    {
                        assetIcon: vault2,
                        assetName: 'BUSD',
                        fees: 'XVault',
                        balance: Number(busdUserDepositValue).toFixed(2),
                        netAPY: Number(dashboardValues.apyObj?.busd).toFixed(2),
                        vaultasset: Number(dashboardValues.apyObj?.tvlBUSDBsc).toFixed(2),
                        auditedState:'audited',
                        availableDeposit: Number(busdBalance).toFixed(2)
                    },
                    {
                        assetIcon: vault3,
                        assetName: 'USDC',
                        fees: 'XVault',
                        balance: usdcUserDepositValue,
                        netAPY: Number(dashboardValues.apyObj?.usdc).toFixed(2),
                        vaultasset: Number(dashboardValues.apyObj?.tvlUSDCBsc).toFixed(2),
                        auditedState:'audited',
                        availableDeposit: Number(usdcBalance).toFixed(2)
                    }
                ])
               }else{
          
                busdUserDepositValueXAuto = busdDepositUserBalanceXAuto.userBusdDepositBalanceXAuto;
                usdtUserDepositValueXAuto = usdtDepositUserBalanceXAuto.userUsdtDepositBalanceXAuto;
                usdcUserDepositValueXAuto = usdcDepositUserBalanceXAuto.userUsdcDepositBalanceXAuto;
                bnbUserDepositValueXAuto = bnbDepositUserBalanceXAuto.userBnbDepositBalanceXAuto;
                setList([
                    {
                        assetIcon: vault1,
                        assetName: 'USDT',
                        fees: 'XAuto',
                        balance:usdtUserDepositValueXAuto,
                        netAPY: Number(dashboardValues.apyObj?.usdtXauto).toFixed(2),
                        vaultasset: Number(dashboardValues.apyObj?.tvlUSDTBscXAuto).toFixed(2),
                        auditedState:'audit in progress',
                        availableDeposit: Number(usdtBalance).toFixed(2)
                    },
                    {
                        assetIcon: vault2,
                        assetName: 'BUSD',
                        fees: 'XAuto',
                        balance: busdUserDepositValueXAuto,
                        netAPY: Number(dashboardValues.apyObj?.busdXauto).toFixed(2),
                        vaultasset: Number(dashboardValues.apyObj?.tvlBUSDBscXAuto).toFixed(2),
                        auditedState:'audit in progress',
                        availableDeposit: Number(busdBalance).toFixed(2)
                    },
                    {
                        assetIcon: vault4,
                        assetName: 'BNB',
                        fees: 'XAuto',
                        balance: bnbUserDepositValueXAuto,
                        netAPY: Number(dashboardValues.apyObj?.bnbXauto).toFixed(2),
                        vaultasset: Number(dashboardValues.apyObj?.tvlVBNBBscXAuto).toFixed(2),
                        auditedState:'audit in progress',
                        availableDeposit: Number(bnbBalance).toFixed(6)
                    },
                    {
                        assetIcon: vault3,
                        assetName: 'USDC',
                        fees: 'XAuto',
                        balance: usdcUserDepositValueXAuto,
                        netAPY: Number(dashboardValues.apyObj?.usdcXauto).toFixed(2),
                        vaultasset: Number(dashboardValues.apyObj?.tvlUSDCBscXAuto).toFixed(2),
                        auditedState:'audit in progress',
                        availableDeposit: Number(usdcBalance).toFixed(2)
                    }
                ])
               }
             
             }else{
   
               usdtBalanceMatic = usdtBalancesMatic.usdtBalanceMatic;        
          
               usdcBalanceMatic = usdcBalancesMatic.usdcBalanceMatic;
           
               aaveBalanceMatic = aaveBalancesMatic.aaveBalanceMatic;
               wbtcBalanceMatic = wbtcBalancesMatic.wbtcBalanceMatic;
               
               aaveUserDepositValue = aaveDepositUserBalance.aaveDepositBalanceMatic;
               wbtcUserDepositValue = wbtcDepositUserBalance.wbtcDepositBalanceMatic;
               usdtUserDepositValueMatic = usdtDepositUserBalanceMatic.usdtDepositBalanceMatic;
               usdcUserDepositValueMatic = usdcDepositUserBalanceMatic.usdcDepositBalanceMatic;

               setList([
                   {
                       assetIcon: vault1,
                       assetName: 'USDT',
                       fees: 'XAuto',
                       balance: usdtUserDepositValueMatic,
                       netAPY: Number(dashboardValuesMatic.apyObjMatic?.usdtApyMatic).toFixed(2),
                       vaultasset:  Number(dashboardValuesMatic.apyObjMatic?.tvlUSDTMatic).toFixed(2),
                       auditedState:'audited',
                       availableDeposit: usdtBalanceMatic
                   },
                   {
                       assetIcon: vault3,
                       assetName: 'USDC',
                       fees: 'XAuto',
                       balance: usdcUserDepositValueMatic,
                       netAPY: Number(dashboardValuesMatic.apyObjMatic?.usdcApyMatic).toFixed(2),
                       vaultasset:  Number(dashboardValuesMatic.apyObjMatic?.tvlUSDCMatic).toFixed(2),
                       auditedState:'audited',
                       availableDeposit: usdcBalanceMatic
                   },
                   {
                       assetIcon: vaultAAVE,
                       assetName: 'AAVE',
                       fees: 'XAuto',
                       balance: aaveUserDepositValue,
                       netAPY: Number(dashboardValuesMatic.apyObjMatic?.aaveApyMatic).toFixed(2),
                       vaultasset: Number(dashboardValuesMatic.apyObjMatic?.tvlAAVE).toFixed(2),
                       auditedState:'audited',
                       availableDeposit: aaveBalanceMatic
                   },
                   {
                       assetIcon: vaultWBTC,
                       assetName: 'WBTC',
                       fees: 'XAuto',
                       balance: wbtcUserDepositValue,
                       netAPY: Number(dashboardValuesMatic.apyObjMatic?.wbtcApyMatic).toFixed(2),
                       vaultasset: Number(dashboardValuesMatic.apyObjMatic?.tvlWBTC).toFixed(2),
                       auditedState:'audited',
                       availableDeposit: wbtcBalanceMatic
                   }
                   
               ])
             }  
         }else{
            if(dashboardValues && dashboardValuesMatic){
             if(chainId == 56){
                
                if(lendingProtocol == 'X Vault' || lendingProtocol.lenderProtocol =='X Vault'){
                    setList([
                        {
                            assetIcon: vault1,
                            assetName: 'USDT',
                            fees: 'XVault',
                            balance: '0.00',
                            netAPY: Number(dashboardValues.apyObj?.usdt).toFixed(2),
                            vaultasset: Number(dashboardValues.apyObj?.tvlUSDTBsc).toFixed(2),
                            auditedState:'audited',
                            availableDeposit: '0.00'
                        },
                        {
                            assetIcon: vault2,
                            assetName: 'BUSD',
                            fees: 'XVault',
                            balance: '0.00',
                            netAPY: Number(dashboardValues.apyObj?.busd).toFixed(2),
                            vaultasset: Number(dashboardValues.apyObj?.tvlBUSDBsc).toFixed(2),
                            auditedState:'audited',
                            availableDeposit: '0.00'
                        },
                        {
                            assetIcon: vault3,
                            assetName: 'USDC',
                            fees: 'XVault',
                            balance: '0.00',
                            netAPY: Number(dashboardValues.apyObj?.usdc).toFixed(2),
                            vaultasset: Number(dashboardValues.apyObj?.tvlUSDCBsc).toFixed(2),
                            auditedState:'audited',
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
                            netAPY: Number(dashboardValues.apyObj?.usdtXauto).toFixed(2),
                            vaultasset: Number(dashboardValues.apyObj?.tvlUSDTBscXAuto).toFixed(2),
                            auditedState:'audit in progress',
                            availableDeposit: '0.00'
                        },
                        {
                            assetIcon: vault2,
                            assetName: 'BUSD',
                            fees: 'XAuto',
                            balance: '0.00',
                            netAPY: Number(dashboardValues.apyObj?.busdXauto).toFixed(2),
                            vaultasset: Number(dashboardValues.apyObj?.tvlBUSDBscXAuto).toFixed(2),
                            auditedState:'audit in progress',
                            availableDeposit: '0.00'
                        },
                        {
                            assetIcon: vault4,
                            assetName: 'BNB',
                            fees: 'XAuto',
                            balance: '0.00',
                            netAPY: Number(dashboardValues.apyObj?.bnbXauto).toFixed(2),
                            vaultasset: Number(dashboardValues.apyObj?.tvlVBNBBscXAuto).toFixed(2),
                            auditedState:'audit in progress',
                            availableDeposit: '0.00'
                        },
                        {
                            assetIcon: vault3,
                            assetName: 'USDC',
                            fees: 'XAuto',
                            balance: '0.00',
                            netAPY: Number(dashboardValues.apyObj?.usdcXauto).toFixed(2),
                            vaultasset: Number(dashboardValues.apyObj?.tvlUSDCBscXAuto).toFixed(2),
                            auditedState:'audit in progress',
                            availableDeposit: '0.00'
                        }
                    ])
                }
                
             }else{
                setList([
                    {
                        assetIcon: vault1,
                        assetName: 'USDT',
                        fees: 'XAuto',
                        balance: '0.00',
                        netAPY: Number(dashboardValuesMatic.apyObjMatic?.usdtApyMatic).toFixed(2),
                        vaultasset: Number(dashboardValuesMatic.apyObjMatic?.tvlUSDTMatic).toFixed(2),
                        auditedState:'audited',
                        availableDeposit: '0.00'
                    },
                    {
                        assetIcon: vault3,
                        assetName: 'USDC',
                        fees: 'XAuto',
                        balance: '0.00',
                        netAPY: Number(dashboardValuesMatic.apyObjMatic?.usdcApyMatic).toFixed(2),
                        vaultasset: Number(dashboardValuesMatic.apyObjMatic?.tvlUSDCMatic).toFixed(2),
                        auditedState:'audited',
                        availableDeposit: '0.00'
                    },
                    {
                        assetIcon: vaultAAVE,
                        assetName: 'AAVE',
                        fees: 'XAuto',
                        balance: '0.00',
                        netAPY: Number(dashboardValuesMatic.apyObjMatic?.aaveApyMatic).toFixed(2),
                        vaultasset: Number(dashboardValuesMatic.apyObjMatic?.tvlAAVE).toFixed(2),
                        auditedState:'audited',
                        availableDeposit: '0.00'
                    },
                    {
                        assetIcon: vaultWBTC,
                        assetName: 'WBTC',
                        fees: 'XAuto',
                        balance: '0.00',
                        netAPY: Number(dashboardValuesMatic.apyObjMatic?.wbtcApyMatic).toFixed(2),
                        vaultasset: Number(dashboardValuesMatic.apyObjMatic?.tvlWBTC).toFixed(2),
                        auditedState:'audited',
                        availableDeposit: '0.00'
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
          
            redrawVaultList(finalChainId); 
        }else{
            const finalChainId = Number(chainId);         
           
            redrawVaultList(finalChainId); 
        } 
      
    }, [chainId,dashboardValuesMatic,dashboardValues,lendingProtocol,lendingProtocol.lenderProtocol])

    useEffect(()=>{
       if(wca.address){
        if(chainId.ChainId){
            const finalChainId = Number(chainId.ChainId);
          
            redrawVaultList(finalChainId); 
        }else{
            const finalChainId = Number(chainId);         
           
            redrawVaultList(finalChainId); 
        } 
       }
      
      
    }, [usdtBalancesMatic.usdtBalanceMatic
        ,usdcBalancesMatic.usdcBalanceMatic
        ,aaveBalancesMatic.aaveBalanceMatic
        ,wbtcBalancesMatic.wbtcBalanceMatic])

    useEffect(()=>{
        if(wca.address){
         if(chainId.ChainId){
             const finalChainId = Number(chainId.ChainId);
           
             redrawVaultList(finalChainId); 
         }else{
             const finalChainId = Number(chainId);         
            
             redrawVaultList(finalChainId); 
         } 
        }
       
       
     }, [aaveDepositUserBalance.aaveDepositBalanceMatic
        ,wbtcDepositUserBalance.wbtcDepositBalanceMatic
        ,usdtDepositUserBalanceMatic.usdtDepositBalanceMatic
        ,usdcDepositUserBalanceMatic.usdcDepositBalanceMatic
        ,busdDepositUserBalance.busdDepositBalance
        ,usdtDepositUserBalance.usdtDepositBalance
        ,usdcDepositUserBalance.usdcDepositBalance
        ,bnbBalances.bnbBalance])
 

    
    
   
    
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
    

      
        
        return (
            <Box className={classes.root}>
                <BrowserView>
                    <Box className={classes.listForDesktop}>
                        <table>
                            <thead className={classes.listHeader}>
                                <tr>
                                    <th style={{width:"11%"}}>Asset</th>
                                    <th style={{width:"10%"}}>Protocol</th>
                                    <th style={{width:"10%"}}>Balance</th>
                                    <th style={{width:"11%"}}>APY</th>
                                    <th style={{width:"12%"}}>Vault Assets</th>
                                    <th style={{width:"8%"}}>Audited</th>
                                    <th style={{width:"20%"}}>Available to deposit</th>
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
                                        vaultasset={'$'+item.vaultasset}
                                        auditedState={item.auditedState}
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
                                auditedState={item.auditedState}
                                availableDeposite={item.availableDeposit}
                            />
                        ))
                    }
                </MobileView>
            </Box>
        );
    
   
}

export default Vaultlist;