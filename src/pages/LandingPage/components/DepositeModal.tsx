import React, { useEffect, useState ,MouseEvent } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Modal, Box, Grid } from '@material-ui/core';
import closeIcon from './../../../assets/images/layout/close.png';
import logoIcon from './../../../assets/images/logo2.png';
import {BrowserView, MobileView} from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';

import USDT from './../../../assets/icons/USDTether.svg';
import BUSD from './../../../assets/icons/BUSD1.svg';

import USDC from './../../../assets/icons/USDC.svg';
import BNB from './../../../assets/images/bnb.svg';
import WBTC from './../../../assets/icons/WBTC.svg';
import AAVE from './../../../assets/icons/AAVE.svg';

import DepositUSDTMatic from '../../../methods/contracts/xauto/actions/depositUSDTMatic';
import DepositUSDCMatic from '../../../methods/contracts/xauto/actions/depositUSDCMatic';
import DepositAAVEMatic from '../../../methods/contracts/xauto/actions/depositAAVEMatic';
import DepositWBTCMatic from '../../../methods/contracts/xauto/actions/depositWBTCMatic';
import WithdrawWBTCMatic from '../../../methods/contracts/xauto/actions/withdrawWBTCMatic';
import WithdrawUSDTMatic from '../../../methods/contracts/xauto/actions/withdrawUSDTMatic';
import WithdrawUSDCMatic from '../../../methods/contracts/xauto/actions/withdrawUSDCMatic';
import WithdrawAAVEMatic from '../../../methods/contracts/xauto/actions/withdrawAAVEMatic';
import DepositUSDTBsc from '../../../methods/contracts/xvault/actions/depositUSDTBSC';
import DepositBUSDBsc from '../../../methods/contracts/xvault/actions/depositBUSDBSC';
import DepositUSDCBsc from '../../../methods/contracts/xvault/actions/depositUSDCBSC';
import WithdrawUSDTBsc from '../../../methods/contracts/xvault/actions/withdrawUSDTBSC';
import WithdrawBUSDBsc from '../../../methods/contracts/xvault/actions/withdrawBUSDBSC';
import WithdrawUSDCBsc from '../../../methods/contracts/xvault/actions/withdrawUSDCBSC';
import DepositUSDTBSCXAuto from '../../../methods/contracts/xauto/actions/depositUSDTBSC';
import DepositBUSDBSCXAuto from '../../../methods/contracts/xauto/actions/depositBUSDBSC';
import DepositBNBBSCXAuto from '../../../methods/contracts/xauto/actions/depositBNBBSC';
import WithdrawUSDTBSCXAuto from '../../../methods/contracts/xauto/actions/withdrawUSDTBSC';
import WithdrawBUSDBSCXAuto from '../../../methods/contracts/xauto/actions/withdrawBUSDBSC';
import WithdrawUSDCBSCXAuto from '../../../methods/contracts/xauto/actions/withdrawUSDCBSC';
import WithdrawBNBBSCXAuto from '../../../methods/contracts/xauto/actions/withdrawBNBBSC';
import DepositUSDCBSCXAuto from '../../../methods/contracts/xauto/actions/depositUSDCBSC';

interface Props {
    open: any;
    setOpen: any;
    assetIcon: string;
    assetName: string;
    fees: string;
    balance: string;
    netAPY: string;
    vaultasset: string;
    availableDeposite: string;
}

const useStyles = makeStyles((theme: any) =>
  createStyles({
    root: {
        backgroundColor: theme.palette.dropdown.dark,
        borderRadius: 25,
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: `translate(-50%, -50%)`,
        color: theme.palette.text.primary,
        width: 600,
        // height: 420,
        padding: 32,
        fontFamily: 'Fira Sans',
        fontWeight: 700,
        [theme.breakpoints.down("xs")]: {
            width: 'calc(100% - 70px)',
            padding: 20,
        }
    },

    wrapper: {
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center'
    },

    logo: {
        display: 'flex',
        alignItems: 'center',
    },

    logoImage: {
        width: 53,
        height: 53,
        marginRight: 10
    },

    closeBtn: {
        position: 'absolute',
        right: 28,
        top: 28,
        borderRadius: '50%',
        backgroundColor: theme.palette.secondary.main,
        width: 42,
        height: 42,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    content: {
        marginTop: 40,
        paddingLeft: 10,
        paddingRight: 10
        // display: 'flex',
        // justifyContent: 'space-between'
    },
    contentItem: {
        float: 'left',
        marginRight: 30,
        marginBottom: 20,
    },
    field: {
        fontSize: 14
    },
    value: {
        marginTop: 13,
        fontSize: 18
    },
    form: {
        clear: 'both',
        marginTop: 140,
        [theme.breakpoints.down("xs")]: {
            marginTop: 200,
            paddingLeft: 20,
            paddingRight: 20 
        }
    },
    label: {
        marginLeft: 15,
        fontSize: 18,
        color: '#ffffff'
    },
    rountInput: {
        marginTop: 15,
        borderRadius: 47,
        border: '2px solid #707070',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 14,
        color: '#84858A',
        fontSize: 18,
        "&>input": {
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#84858A',
            fontSize: 18,
            fontWeight: 700,
            width: 'calc(100% - 30px)'
        },
        [theme.breakpoints.down("xs")]: {
            marginTop: 35,
            paddingTop: 12,
            paddingBottom: 12
        }
    },
    button: {
        cursor: 'pointer',
        marginTop: 32,
        paddingTop: 15,
        paddingBottom: 15,
        textAlign: 'center',
        background: 'linear-gradient(276.21deg, #2042B8 -26.01%, #FF6600 145.95%);',
        borderRadius: 47,
        fontSize: 18,
        [theme.breakpoints.down("xs")]: {
            marginTop: 28,
        }
    },
    tabs: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    tabItem: {
        cursor: 'pointer',
        color: '#84858A',
        fontSize: 14,
    },
    activeTab: {
        color: '#ffffff',
        background: 'rgba(255, 255, 255, 0.14)',
        borderRadius: 25.5,
        padding: '6px 25px'
    }
  }),
);


const DepositeModal: React.FC<Props> = ({ open, setOpen, assetIcon, assetName, fees, balance, netAPY, vaultasset, availableDeposite }: any) => {
    const classes = useStyles();
    const [activeTab, selectTab] = useState('deposit');
    const [depositAmount, setDeposit] = useState('0');
    const [withdrawalAmount, setWithdrawal] = useState('0');
    const [userBalance, setBalance] = useState('0');
    
     
    const dispatch = useDispatch();
    const wca = useSelector((store: any) => store.DashboardReducer.wca);
    
    const usdtBalances = useSelector((store: any) => store.DashboardReducer.usdtBalance);
    const busdBalances = useSelector((store: any) => store.DashboardReducer.busdBalance);
    const usdcBalances = useSelector((store: any) => store.DashboardReducer.usdcBalance);     
    const bnbBalances = useSelector((store: any) => store.DashboardReducer.bnbBalance); 

    //matic   
     const usdtBalancesMatic = useSelector((store: any) => store.DashboardReducer.usdtBalanceMatic);
     const wbtcBalancesMatic = useSelector((store: any) => store.DashboardReducer.wbtcBalanceMatic);
     const aaveBalancesMatic = useSelector((store: any) => store.DashboardReducer.aaveBalanceMatic); 
     const usdcBalancesMatic = useSelector((store: any) => store.DashboardReducer.usdcBalanceMatic); 

      
    const dashboardValues = useSelector((store: any) => store.DashboardReducer.dashboard);
    const dashboardValuesMatic = useSelector((store: any) => store.DashboardReducer.dashboardMatic);

    //BSC Balances XVault
    const busdDepositUserBalance = useSelector((store: any) => store.DashboardReducer.busdDepositBalance); 
    const usdtDepositUserBalance = useSelector((store: any) => store.DashboardReducer.usdtDepositBalance); 
    const usdcDepositUserBalance = useSelector((store: any) => store.DashboardReducer.usdcDepositBalance); 
    // //BSC XAuto
    const busdDepositUserBalanceXAuto = useSelector((store: any) => store.DashboardReducer.userBusdDepositBalanceXAuto); 
    const usdtDepositUserBalanceXAuto = useSelector((store: any) => store.DashboardReducer.userUsdtDepositBalanceXAuto); 
    const usdcDepositUserBalanceXAuto = useSelector((store: any) => store.DashboardReducer.userUsdcDepositBalanceXAuto); 
    const bnbDepositUserBalanceXAuto = useSelector((store: any) => store.DashboardReducer.userBnbDepositBalanceXAuto); 



    //Matic Balances 
    const usdtDepositUserBalanceMatic = useSelector((store: any) => store.DashboardReducer.usdtDepositBalanceMatic); 
    const usdcDepositUserBalanceMatic = useSelector((store: any) => store.DashboardReducer.usdcDepositBalanceMatic); 
    const aaveDepositUserBalance = useSelector((store: any) => store.DashboardReducer.aaveDepositBalanceMatic); 
    const wbtcDepositUserBalance = useSelector((store: any) => store.DashboardReducer.wbtcDepositBalanceMatic); 
    
     
    const currentChainId = useSelector((store: any) => store.DashboardReducer.networkConnect);

    const lendingProtocol = useSelector((store: any) => store.DashboardReducer.lender);

    let balanceStable='0'; 
    let tvl = '0.00';
    let apy = '0.00';
    let depositBalance = '0.00';


    let finalChainId :any;
    let assetInvested:any;
    
    if(assetName == "USDT"){
        assetInvested = <img className={classes.logoImage} src={USDT} alt='XEND Finance' />;
    }
    if(assetName == "USDC"){
        assetInvested = <img className={classes.logoImage} src={USDC} alt='XEND Finance' />;
    }
    if(assetName == "BUSD"){
        assetInvested = <img className={classes.logoImage} src={BUSD} alt='XEND Finance' />;
    }
    if(assetName == "AAVE"){
        assetInvested = <img className={classes.logoImage} src={AAVE} alt='XEND Finance' />;
    }
    if(assetName == "WBTC"){
        assetInvested = <img className={classes.logoImage} src={WBTC} alt='XEND Finance' />;
    }
    if(assetName == "BNB"){
        assetInvested = <img className={classes.logoImage} src={BNB} alt='XEND Finance' />;
    }



    if(wca.chainId){
        finalChainId = Number(wca.chainId);
    }else{
        if(currentChainId.ChainId){
            finalChainId = Number(currentChainId.ChainId);
        }else{
            finalChainId = Number(currentChainId); 
        }
    }
  
   
    if(wca.address){ 
        if(dashboardValuesMatic && dashboardValues){     
        
        if(finalChainId == 56){
            
            if(lendingProtocol == "X Vault" ||lendingProtocol == 'X Vault' ||lendingProtocol.lenderProtocol =='X Vault' || lendingProtocol.lenderProtocol=="X Vault" ){
            if(assetName =='USDT'){
                balanceStable = usdtBalances.usdtBalance;
                depositBalance = usdtDepositUserBalance.usdtDepositBalance;
                const tvlUSDT = dashboardValues.apyObj?.tvlUSDTBsc;
                if(tvlUSDT){
                    tvl = tvlUSDT;
                }
                const apyUSDT = dashboardValues.apyObj?.usdt;
                if(apyUSDT){
                    apy = apyUSDT;
                }
                            
            }   
            if(assetName =='BUSD'){
                balanceStable = busdBalances.busdBalance;
                depositBalance = busdDepositUserBalance.busdDepositBalance;
                const tvlBUSD = dashboardValues.apyObj?.tvlBUSDBsc;
                if(tvlBUSD){
                    tvl = tvlBUSD;
                }
                const apyBusd = dashboardValues.apyObj?.busd;
                if(apyBusd){
                    apy = apyBusd;
                }
                           
            }        
            if(assetName =='USDC'){
                balanceStable = usdcBalances.usdcBalance; 
                depositBalance = usdcDepositUserBalance.usdcDepositBalance;
                const tvlUSDC = dashboardValues.apyObj?.tvlUSDCBsc;
                if(tvlUSDC){
                    tvl = tvlUSDC;
                }
                const apyUSDC = dashboardValues.apyObj?.usdc;
                if(apyUSDC){
                    apy = apyUSDC;
                } 
            }
        }else{
            if(assetName =='USDT'){
                balanceStable = usdtBalances.usdtBalance;
                depositBalance = usdtDepositUserBalanceXAuto.userUsdtDepositBalanceXAuto;
                const tvlUSDT = dashboardValues.apyObj?.tvlUSDTBscXAuto;
                if(tvlUSDT){
                    tvl = tvlUSDT;
                }
                const apyUSDT = dashboardValues.apyObj?.usdtXauto;
                if(apyUSDT){
                    apy = apyUSDT;
                }
                            
            }   
            if(assetName =='BUSD'){
                balanceStable = busdBalances.busdBalance;
                depositBalance = busdDepositUserBalanceXAuto.userBusdDepositBalanceXAuto;
                const tvlBUSD = dashboardValues.apyObj?.tvlBUSDBscXAuto;
                if(tvlBUSD){
                    tvl = tvlBUSD;
                }
                const apyBusd = dashboardValues.apyObj?.busdXauto;
                if(apyBusd){
                    apy = apyBusd;
                }
                           
            }        
            if(assetName =='USDC'){
                balanceStable = usdcBalances.usdcBalance; 
                depositBalance = usdcDepositUserBalanceXAuto.userUsdcDepositBalanceXAuto;
                const tvlUSDC = dashboardValues.apyObj?.tvlUSDCBscXAuto;
                if(tvlUSDC){
                    tvl = tvlUSDC
                }
                const apyUSDC = dashboardValues.apyObj?.usdcXauto;
                if(apyUSDC){
                    apy = apyUSDC;
                } 
            }
            if(assetName =='BNB'){
                balanceStable = bnbBalances.bnbBalance; 
                depositBalance = bnbDepositUserBalanceXAuto.userBnbDepositBalanceXAuto;
                const tvlUSDC = dashboardValues.apyObj?.tvlVBNBBscXAuto;
                if(tvlUSDC){
                    tvl = tvlUSDC
                }
                const apyUSDC = dashboardValues.apyObj?.bnbXauto;
                if(apyUSDC){
                    apy = apyUSDC;
                } 
            }
        }
        
        }
            else{

             
            if(assetName =='USDT'){
                balanceStable = usdtBalancesMatic.usdtBalanceMatic;
                depositBalance = usdtDepositUserBalanceMatic.usdtDepositBalanceMatic;
                const tvlUSDT = dashboardValuesMatic.apyObjMatic?.tvlUSDTMatic;
                if(tvlUSDT){
                 tvl = tvlUSDT;
                }
                const apyUSDT = dashboardValuesMatic.apyObjMatic?.usdtApyMatic;
                if(apyUSDT){
                    apy = apyUSDT;
                } 
                             
            }   
            if(assetName =='USDC'){
                balanceStable = usdcBalancesMatic.usdcBalanceMatic;
                depositBalance = usdcDepositUserBalanceMatic.usdcDepositBalanceMatic;
                const tvlUSDC = dashboardValuesMatic.apyObjMatic?.tvlUSDCMatic;
                if(tvlUSDC){
                 tvl = tvlUSDC;
                }
                const apyUSDC = dashboardValuesMatic.apyObjMatic?.usdcApyMatic;
                if(apyUSDC){
                    apy = apyUSDC;
                }               
            }  
            if(assetName =='AAVE'){
                balanceStable = aaveBalancesMatic.aaveBalanceMatic; 
                depositBalance = aaveDepositUserBalance.aaveDepositBalanceMatic;
                const tvlAAVE = dashboardValuesMatic.apyObjMatic?.tvlAAVE;
                if(tvlAAVE){
                 tvl = tvlAAVE;
                }
                const apyAAVE = dashboardValuesMatic.apyObjMatic?.aaveApyMatic;
                if(apyAAVE){
                    apy = apyAAVE;
                }                           
            }
            if(assetName =='WBTC'){
                balanceStable = wbtcBalancesMatic.wbtcBalanceMatic;  
                depositBalance = wbtcDepositUserBalance.wbtcDepositBalanceMatic;
                const tvlWBTC = dashboardValuesMatic.apyObjMatic?.tvlWBTC;
                if(tvlWBTC){
                 tvl = tvlWBTC;
                }
                const apyWBTC = dashboardValuesMatic.apyObjMatic?.wbtcApyMatic;
                if(apyWBTC){
                    apy = apyWBTC;
                }                                 
            }    
        }  
    }     
    }else{
          if(dashboardValues && dashboardValuesMatic){
            if(finalChainId == 56){
            if(lendingProtocol == "X Vault" ||lendingProtocol == 'X Vault' ||lendingProtocol.lenderProtocol =='X Vault' || lendingProtocol.lenderProtocol=="X Vault" ){
            if(assetName =='USDT'){
             
                const tvlUSDT = dashboardValues.apyObj?.tvlUSDTBsc;
                if(tvlUSDT){
                    tvl = tvlUSDT;
                }
                const apyUSDT = dashboardValues.apyObj?.usdt;
                if(apyUSDT){
                    apy = apyUSDT;
                }
                            
            }   
            if(assetName =='BUSD'){
             
                const tvlBUSD = dashboardValues.apyObj?.tvlBUSDBsc;
                if(tvlBUSD){
                    tvl = tvlBUSD;
                }
                const apyBusd = dashboardValues.apyObj?.busd;
                if(apyBusd){
                    apy = apyBusd;
                }
                           
            }        
            if(assetName =='USDC'){
          
                const tvlUSDC = dashboardValues.apyObj?.tvlUSDCBsc;
                if(tvlUSDC){
                    tvl = tvlUSDC;
                }
                const apyUSDC = dashboardValues.apyObj?.usdc;
                if(apyUSDC){
                    apy = apyUSDC;
                } 
            }
        }else{
            if(assetName =='USDT'){
              
                const tvlUSDT = dashboardValues.apyObj?.tvlUSDTBscXAuto;
                if(tvlUSDT){
                    tvl = tvlUSDT;
                }
                const apyUSDT = dashboardValues.apyObj?.usdtXauto;
                if(apyUSDT){
                    apy = apyUSDT;
                }
                            
            }   
            if(assetName =='BUSD'){
              
                const tvlBUSD = dashboardValues.apyObj?.tvlBUSDBscXAuto;
                if(tvlBUSD){
                    tvl = tvlBUSD;
                }
                const apyBusd = dashboardValues.apyObj?.busdXauto;
                if(apyBusd){
                    apy = apyBusd;
                }
                           
            }        
            if(assetName =='USDC'){
            
                const tvlUSDC = dashboardValues.apyObj?.tvlUSDCBscXAuto;
                if(tvlUSDC){
                    tvl = tvlUSDC
                }
                const apyUSDC = dashboardValues.apyObj?.usdcXauto;
                if(apyUSDC){
                    apy = apyUSDC;
                } 
            }
            if(assetName =='BNB'){
               
                const tvlUSDC = dashboardValues.apyObj?.tvlBNBBscXAuto;
                if(tvlUSDC){
                    tvl = tvlUSDC
                }
                const apyUSDC = dashboardValues.apyObj?.bnbXauto;
                if(apyUSDC){
                    apy = apyUSDC;
                } 
            }
        }
        
            }else{
         
            if(assetName =='USDT'){
              
                const tvlUSDT = dashboardValuesMatic.apyObjMatic?.tvlUSDTMatic;
                if(tvlUSDT){
                 tvl = tvlUSDT;
                }
                const apyUSDT = dashboardValuesMatic.apyObjMatic?.usdtApyMatic;
                if(apyUSDT){
                    apy = apyUSDT;
                } 
                             
            }   
            if(assetName =='USDC'){
               
                const tvlUSDC = dashboardValuesMatic.apyObjMatic?.tvlUSDCMatic;
                if(tvlUSDC){
                 tvl = tvlUSDC;
                }
                const apyUSDC = dashboardValuesMatic.apyObjMatic?.usdcApyMatic;
                if(apyUSDC){
                    apy = apyUSDC;
                }               
            }  
            if(assetName =='AAVE'){
               
                const tvlAAVE = dashboardValuesMatic.apyObjMatic?.tvlAAVE;
                if(tvlAAVE){
                 tvl =tvlAAVE;
                }
                const apyAAVE = dashboardValuesMatic.apyObjMatic?.aaveApyMatic;
                if(apyAAVE){
                    apy = apyAAVE;
                }                           
            }
            if(assetName =='WBTC'){
                 
                const tvlWBTC = dashboardValuesMatic.apyObjMatic?.tvlWBTC;
                if(tvlWBTC){
                 tvl = tvlWBTC;
                }
                const apyWBTC = dashboardValuesMatic.apyObjMatic?.wbtcApyMatic;
                if(apyWBTC){
                    apy = apyWBTC;
                }                                 
            }  
        }  
        }

    }
    
    
    const buttonHandlerDeposit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if(finalChainId == 56){
            if(lendingProtocol == "X Vault" ||lendingProtocol == 'X Vault' ||lendingProtocol.lenderProtocol =='X Vault' || lendingProtocol.lenderProtocol=="X Vault" ){
            if(assetName =='USDT'){
                dispatch(DepositUSDTBsc(depositAmount,wca.address,wca.chainId));
              
                setOpen(false)
              
              }   
              if(assetName =='BUSD'){
                dispatch(DepositBUSDBsc(depositAmount,wca.address,wca.chainId));
               
                setOpen(false)
              }        
              if(assetName =='USDC'){
                dispatch(DepositUSDCBsc(depositAmount,wca.address,wca.chainId));
              
               
                setOpen(false)
              }  
            }else{
                if(assetName =='USDT'){
                    dispatch(DepositUSDTBSCXAuto(depositAmount,wca.address,wca.chainId));
                  
                    setOpen(false)
                  
                  }   
                  if(assetName =='BUSD'){
                    dispatch(DepositBUSDBSCXAuto(depositAmount,wca.address,wca.chainId));
                   
                    setOpen(false)
                  }        
                  if(assetName =='USDC'){
                    dispatch(DepositUSDCBSCXAuto(depositAmount,wca.address,wca.chainId));
                  
                   
                    setOpen(false)
                  } 
                  if(assetName =='BNB'){
                    dispatch(DepositBNBBSCXAuto(depositAmount,wca.address,wca.chainId));
                  
                   
                    setOpen(false)
                  } 
            }      
        }else{
            if(assetName =='USDT'){
                dispatch(DepositUSDTMatic(depositAmount,wca.address,wca.chainId));
               
               
                setOpen(false)
              
              }  
              if(assetName =='USDC'){
                dispatch(DepositUSDCMatic(depositAmount,wca.address,wca.chainId));                
               
              
                setOpen(false)
              
              }
              if(assetName =='AAVE'){
                dispatch(DepositAAVEMatic(depositAmount,wca.address,wca.chainId))
              
                
               
                setOpen(false)
              
              }
              if(assetName =='WBTC'){
                dispatch(DepositWBTCMatic(depositAmount,wca.address,wca.chainId));
              
              
               
                setOpen(false)
              
              }      
              
              
              
            
        }
        
      
        
      }

       
    const buttonHandlerWithdraw = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if(finalChainId == 56){
        if(lendingProtocol == "X Vault" ||lendingProtocol == 'X Vault' ||lendingProtocol.lenderProtocol =='X Vault' || lendingProtocol.lenderProtocol=="X Vault" ){
        if(assetName =='USDT'){
            dispatch(WithdrawUSDTBsc(withdrawalAmount,wca.address,wca.chainId));
           
            setOpen(false)
          
          }   
          if(assetName =='BUSD'){
            dispatch(WithdrawBUSDBsc(withdrawalAmount,wca.address,wca.chainId));
            
            setOpen(false)
          }        
          if(assetName =='USDC'){
            dispatch(WithdrawUSDCBsc(withdrawalAmount,wca.address,wca.chainId));
          
            setOpen(false)           
          }
        }else{
            if(assetName =='USDT'){
                dispatch(WithdrawUSDTBSCXAuto(withdrawalAmount,wca.address,wca.chainId));
               
                setOpen(false)
              
              }   
              if(assetName =='BUSD'){
                dispatch(WithdrawBUSDBSCXAuto(withdrawalAmount,wca.address,wca.chainId));
                
                setOpen(false)
              }        
              if(assetName =='USDC'){
                dispatch(WithdrawUSDCBSCXAuto(withdrawalAmount,wca.address,wca.chainId));
              
                setOpen(false)           
              }
              if(assetName =='BNB'){
                dispatch(WithdrawBNBBSCXAuto(withdrawalAmount,wca.address,wca.chainId));
              
                setOpen(false)           
              }
        }        
        }else{
            if(assetName =='USDT'){
                dispatch(WithdrawUSDTMatic(withdrawalAmount,wca.address,wca.chainId));
              
                setOpen(false)
              
              }   

              if(assetName =='USDC'){
                dispatch(WithdrawUSDCMatic(withdrawalAmount,wca.address,wca.chainId));
              
               
                setOpen(false)
              
              }
              
              if(assetName =='AAVE'){
                dispatch(WithdrawAAVEMatic(withdrawalAmount,wca.address,wca.chainId));
              
                setOpen(false)
              
              }
              if(assetName =='WBTC'){
                dispatch(WithdrawWBTCMatic(withdrawalAmount,wca.address,wca.chainId))
               
               
                setOpen(false)
              
              }     

        }
        
      }

      useEffect(()=>{
        if(wca.address){
        if(finalChainId == 137){
            if(dashboardValues && dashboardValuesMatic){
            if(assetName =='USDT'){
                balanceStable = usdtBalancesMatic.usdtBalanceMatic;
                depositBalance = usdtDepositUserBalanceMatic.usdtDepositBalanceMatic;
                const tvlUSDT = dashboardValuesMatic.apyObjMatic?.tvlUSDTMatic;
                if(tvlUSDT){
                 tvl = tvlUSDT;
                }
                const apyUSDT = dashboardValuesMatic.apyObjMatic?.usdtApyMatic;
                if(apyUSDT){
                    apy = apyUSDT;
                } 
                             
            }   
            if(assetName =='USDC'){
                balanceStable = usdcBalancesMatic.usdcBalanceMatic;
                depositBalance = usdcDepositUserBalanceMatic.usdcDepositBalanceMatic;
                const tvlUSDC = dashboardValuesMatic.apyObjMatic?.tvlUSDCMatic;
                if(tvlUSDC){
                 tvl =tvlUSDC;
                }
                const apyUSDC = dashboardValuesMatic.apyObjMatic?.usdcApyMatic;
                if(apyUSDC){
                    apy = apyUSDC;
                }               
            }  
            if(assetName =='AAVE'){
                balanceStable = aaveBalancesMatic.aaveBalanceMatic; 
                depositBalance = aaveDepositUserBalance.aaveDepositBalanceMatic;
                const tvlAAVE = dashboardValuesMatic.apyObjMatic?.tvlAAVE;
                if(tvlAAVE){
                 tvl = tvlAAVE;
                }
                const apyAAVE = dashboardValuesMatic.apyObjMatic?.aaveApyMatic;
                if(apyAAVE){
                    apy = apyAAVE;
                }                           
            }
            if(assetName =='WBTC'){
                balanceStable = wbtcBalancesMatic.wbtcBalanceMatic;  
                depositBalance = wbtcDepositUserBalance.wbtcDepositBalanceMatic;
                const tvlWBTC = dashboardValuesMatic.apyObjMatic?.tvlWBTC;
                if(tvlWBTC){
                 tvl = tvlWBTC;
                }
                const apyWBTC = dashboardValuesMatic.apyObjMatic?.wbtcApyMatic;
                if(apyWBTC){
                    apy = apyWBTC;
                }                                 
            }    
        }
         }else{
            if(dashboardValues && dashboardValuesMatic){
            if(lendingProtocol == "X Vault" ||lendingProtocol == 'X Vault' ||lendingProtocol.lenderProtocol =='X Vault' || lendingProtocol.lenderProtocol=="X Vault" ){
            if(assetName =='USDT'){
                balanceStable = usdtBalances.usdtBalance;
                depositBalance = usdtDepositUserBalance.usdtDepositBalance;
                const tvlUSDT = dashboardValues.apyObj?.tvlUSDTBsc;
                if(tvlUSDT){
                    tvl =tvlUSDT;
                }
                const apyUSDT = dashboardValues.apyObj?.usdt;
                if(apyUSDT){
                    apy = apyUSDT;
                }
                            
            }   
            if(assetName =='BUSD'){
                balanceStable = busdBalances.busdBalance;
                depositBalance = busdDepositUserBalance.busdDepositBalance;
                const tvlBUSD = dashboardValues.apyObj?.tvlBUSDBsc;
                if(tvlBUSD){
                    tvl =tvlBUSD;
                }
                const apyBusd = dashboardValues.apyObj?.busd;
                if(apyBusd){
                    apy = apyBusd;
                }
                           
            }        
            if(assetName =='USDC'){
                balanceStable = usdcBalances.usdcBalance; 
                depositBalance = usdcDepositUserBalance.usdcDepositBalance;
                const tvlUSDC = dashboardValues.apyObj?.tvlUSDCBsc;
                if(tvlUSDC){
                    tvl = tvlUSDC;
                }
                const apyUSDC = dashboardValues.apyObj?.usdc;
                if(apyUSDC){
                    apy = apyUSDC;
                } 
            }
        }
        }else{
            if(dashboardValues && dashboardValuesMatic){
            if(assetName =='USDT'){
                balanceStable = usdtBalances.usdtBalance;
                depositBalance = usdtDepositUserBalanceXAuto.userUsdtDepositBalanceXAuto;
                const tvlUSDT = dashboardValues.apyObj?.tvlUSDTBscXAuto;
                if(tvlUSDT){
                    tvl = tvlUSDT;
                }
                const apyUSDT = dashboardValues.apyObj?.usdtXauto;
                if(apyUSDT){
                    apy = apyUSDT;
                }
                            
            }   
            if(assetName =='BUSD'){
                balanceStable = busdBalances.busdBalance;
                depositBalance = busdDepositUserBalanceXAuto.userBusdDepositBalanceXAuto;
                const tvlBUSD = dashboardValues.apyObj?.tvlBUSDBscXAuto;
                if(tvlBUSD){
                    tvl = tvlBUSD;
                }
                const apyBusd = dashboardValues.apyObj?.busdXauto;
                if(apyBusd){
                    apy = apyBusd;
                }
                           
            }        
            if(assetName =='USDC'){
                balanceStable = usdcBalances.usdcBalance; 
                depositBalance = usdcDepositUserBalanceXAuto.userUsdcDepositBalanceXAuto;
                const tvlUSDC = dashboardValues.apyObj?.tvlUSDCBscXAuto;
                if(tvlUSDC){
                    tvl = tvlUSDC;
                }
                const apyUSDC = dashboardValues.apyObj?.usdcXauto;
                if(apyUSDC){
                    apy = apyUSDC;
                } 
            }
            if(assetName =='BNB'){
                balanceStable = bnbBalances.bnbBalance; 
                depositBalance = bnbDepositUserBalanceXAuto.userBnbDepositBalanceXAuto;
                const tvlUSDC = dashboardValues.apyObj?.tvlVBNBBscXAuto;
                if(tvlUSDC){
                    tvl = tvlUSDC;
                }
                const apyUSDC = dashboardValues.apyObj?.bnbXauto;
                if(apyUSDC){
                    apy = apyUSDC;
                } 
            }
        }
        }
         } 
        }
       
       
     }, [usdtBalancesMatic.usdtBalanceMatic
         ,usdcBalancesMatic.usdcBalanceMatic
         ,aaveBalancesMatic.aaveBalanceMatic
         ,wbtcBalancesMatic.wbtcBalanceMatic
        ,busdDepositUserBalance.busdDepositBalance
        ,usdtDepositUserBalance.usdtDepositBalance
        ,usdcDepositUserBalance.usdcDepositBalance
      ,bnbBalances.bnbBalance])




    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <Box className={classes.root}>
                <Box className={classes.closeBtn} onClick={() => setOpen(false)}>
                    <img src={closeIcon} alt='XEND Finance' />
                </Box>
                <Box className={classes.logo}>
                <>             
                {assetInvested}
                </>
              
                    <Box>
                        <Box style={{color: '#ffffff', fontSize: 18}}>
                        <>
                          {assetName}
                        </>    
                        </Box>
                        <Box style={{color: '#84858A', fontSize: 14}}>
                            <>
                            {lendingProtocol.lenderProtocol}
                            </>
                        </Box>
                    </Box>
                </Box>
                <Box className={classes.content}>
                  
                    <Box className={classes.contentItem}>
                        <Box className={classes.field}> Balance</Box>
                        <Box className={classes.value}>{depositBalance}</Box>
                    </Box>
                    <Box className={classes.contentItem}>
                        <Box className={classes.field}>Net APY</Box>
                        <Box className={classes.value} style={{color: '#00D395'}}>{Number(apy).toFixed(2)}%</Box>
                    </Box>
                    <Box className={classes.contentItem}>
                        <Box className={classes.field}>Vault Assets</Box>
                        <Box className={classes.value}>{tvl}</Box>
                    </Box>
                    <Box className={classes.contentItem}>
                        <Box className={classes.field}>Available to deposit</Box>
                        <Box className={classes.value}>{balanceStable} {assetName}</Box>
                    </Box>
                </Box>
                <BrowserView>
                    <Grid container className={classes.form} spacing={3}>
                        <Grid item xs={6}>
                            <Box className={classes.label}>Deposit</Box>
                            <Box className={classes.rountInput}>
                                <input type="text" value={depositAmount} onChange={(e)=>setDeposit(e.target.value)}/>
                               
                            </Box>
                           {Number(balanceStable) > 0?<Box className={classes.button} onClick={buttonHandlerDeposit}>Deposit</Box>:<Box className={classes.button} style={{ background:'linear-gradient(276.21deg, #eaecf1 -26.01%, rgb(140 130 124) 145.95%)' }}>Deposit</Box>} 
                        </Grid>
                        <Grid item xs={6}>
                            <Box className={classes.label}>Withdraw</Box>
                            <Box className={classes.rountInput}>
                                <input type="text" value={withdrawalAmount} onChange={(e)=>setWithdrawal(e.target.value)}/>
                             
                            </Box>
                            {Number(depositBalance) > 0 ?<Box className={classes.button} onClick={buttonHandlerWithdraw}>Withdraw</Box>:<Box className={classes.button}  style={{ background:'linear-gradient(276.21deg, #eaecf1 -26.01%, rgb(140 130 124) 145.95%)' }} >Withdraw</Box>} 
                        </Grid>
                    </Grid>
                </BrowserView>
                <MobileView>
                    <Box className={classes.form}>
                        <Box className={classes.tabs}>
                            <Box className={`${classes.tabItem} ${activeTab==='deposit' && classes.activeTab}`} onClick={()=>selectTab('deposit')}>Deposit</Box>
                            <Box className={`${classes.tabItem} ${activeTab==='withdrawal' && classes.activeTab}`} onClick={()=>selectTab('withdrawal')}>Withdraw</Box>
                        </Box>
                        {
                            activeTab==='deposit'
                            ? <Box>
                                <Box className={classes.rountInput}>
                                    <input type="text" value={depositAmount} onChange={(e)=>setDeposit(e.target.value)}/>
                                  
                                </Box>
                                {Number(balanceStable) > 0?<Box className={classes.button} onClick={buttonHandlerDeposit}>Deposit</Box>:<Box className={classes.button} style={{ background:'linear-gradient(276.21deg, #eaecf1 -26.01%, rgb(140 130 124) 145.95%)' }}>Deposit</Box>}
                            </Box>
                            : <Box>
                                <Box className={classes.rountInput}>
                                    <input type="text" value={withdrawalAmount} onChange={(e)=>setWithdrawal(e.target.value)}/>
                                   
                                </Box>
                               {Number(depositBalance) > 0 ?<Box className={classes.button} onClick={buttonHandlerWithdraw}>Withdraw</Box>:<Box className={classes.button} style={{ background:'linear-gradient(276.21deg, #eaecf1 -26.01%, rgb(140 130 124) 145.95%)' }} >Withdraw</Box>} 
                            </Box>
                        }
                    </Box>
                </MobileView>
            </Box>
        </Modal>
    );
}

export default DepositeModal;