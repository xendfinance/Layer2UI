import React, { useEffect, useState ,MouseEvent } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Modal, Box, Grid } from '@material-ui/core';
import closeIcon from 'assets/images/layout/close.png';
import logoIcon from 'assets/images/logo2.png';
import {BrowserView, MobileView} from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import getAllBalances from 'methods/contracts/getAllBalances';
import DepositSavingsUSDT from 'methods/contracts/xvault/methods/depositUSDT';
import DepositSavingsBUSD from 'methods/contracts/xvault/methods/depositBUSD';
import DepositSavingsUSDC from 'methods/contracts/xvault/methods/depositUSDC';
import WithdrawSavingsBUSD from 'methods/contracts/xvault/methods/withdrawBUSD';
import WithdrawSavingsUSDT from 'methods/contracts/xvault/methods/withdrawUSDT';
import WithdrawSavingsUSDC from 'methods/contracts/xvault/methods/withdrawUSDC';

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
     

    const wca = useSelector((store: any) => store.DashboardReducer.wca);
    
    const usdtBalances = useSelector((store: any) => store.DashboardReducer.usdtBalance);
    const busdBalances = useSelector((store: any) => store.DashboardReducer.busdBalance);
    const usdcBalances = useSelector((store: any) => store.DashboardReducer.usdcBalance); 
    let balanceStable='0';  
   
    if(wca.address){    
      if(assetName =='USDT'){
        balanceStable = usdtBalances.usdtBalance;
      
      }   
      if(assetName =='BUSD'){
        balanceStable = busdBalances.busdBalance;
       
      }        
      if(assetName =='USDC'){
        balanceStable = usdcBalances.usdcBalance;
    
      }        
    }
    
    
    const buttonHandlerDeposit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if(assetName =='USDT'){
            DepositSavingsUSDT(depositAmount,wca.address,wca.chainId);
            getAllBalances(wca.address,wca.chainId)
            balanceStable = usdtBalances.usdtBalance;
            setOpen(false)
          
          }   
          if(assetName =='BUSD'){
            DepositSavingsBUSD(depositAmount,wca.address,wca.chainId);
            getAllBalances(wca.address,wca.chainId)
            balanceStable = busdBalances.busdBalance;
            setOpen(false)
          }        
          if(assetName =='USDC'){
            DepositSavingsUSDC(depositAmount,wca.address,wca.chainId);
            getAllBalances(wca.address,wca.chainId)
            balanceStable = usdcBalances.usdcBalance;
            setOpen(false)
          }        
      
        
      }

       
    const buttonHandlerWithdraw = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if(assetName =='USDT'){
            WithdrawSavingsUSDT(withdrawalAmount,wca.address,wca.chainId);
            getAllBalances(wca.address,wca.chainId)
            balanceStable = usdtBalances.usdtBalance;
            setOpen(false)
          
          }   
          if(assetName =='BUSD'){
            WithdrawSavingsBUSD(withdrawalAmount,wca.address,wca.chainId);
            getAllBalances(wca.address,wca.chainId)
            balanceStable = busdBalances.busdBalance;
            setOpen(false)
          }        
          if(assetName =='USDC'){
            WithdrawSavingsUSDC(withdrawalAmount,wca.address,wca.chainId);
            getAllBalances(wca.address,wca.chainId)
            balanceStable = usdcBalances.usdcBalance;
            setOpen(false)           
          }        
      
        
      }
    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <Box className={classes.root}>
                <Box className={classes.closeBtn} onClick={() => setOpen(false)}>
                    <img src={closeIcon} alt='XEND Finance' />
                </Box>
                <Box className={classes.logo}>
                    <img className={classes.logoImage} src={logoIcon} alt='XEND Finance' />
                    <Box>
                        <Box style={{color: '#ffffff', fontSize: 18}}>XEND</Box>
                        <Box style={{color: '#84858A', fontSize: 14}}>Xend Finance</Box>
                    </Box>
                </Box>
                <Box className={classes.content}>
                    <Box className={classes.contentItem}>
                        <Box className={classes.field}>Fees</Box>
                        <Box className={classes.value}>V1</Box>
                    </Box>
                    <Box className={classes.contentItem}>
                        <Box className={classes.field}> Balance</Box>
                        <Box className={classes.value}>0.00</Box>
                    </Box>
                    <Box className={classes.contentItem}>
                        <Box className={classes.field}>Net APY</Box>
                        <Box className={classes.value} style={{color: '#00D395'}}>45%</Box>
                    </Box>
                    <Box className={classes.contentItem}>
                        <Box className={classes.field}>Vault Assets</Box>
                        <Box className={classes.value}>000.00</Box>
                    </Box>
                    <Box className={classes.contentItem}>
                        <Box className={classes.field}>Available to deposit</Box>
                        <Box className={classes.value}>{balanceStable}</Box>
                    </Box>
                </Box>
                <BrowserView>
                    <Grid container className={classes.form} spacing={3}>
                        <Grid item xs={6}>
                            <Box className={classes.label}>Deposit</Box>
                            <Box className={classes.rountInput}>
                                <input type="text" value={depositAmount} onChange={(e)=>setDeposit(e.target.value)}/>
                                <Box>MAX</Box>
                            </Box>
                            <Box className={classes.button} onClick={buttonHandlerDeposit}>Deposit</Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box className={classes.label}>Withdraw</Box>
                            <Box className={classes.rountInput}>
                                <input type="text" value={withdrawalAmount} onChange={(e)=>setWithdrawal(e.target.value)}/>
                                <Box>MAX</Box>
                            </Box>
                            <Box className={classes.button} onClick={buttonHandlerWithdraw}>Withdraw</Box>
                        </Grid>
                    </Grid>
                </BrowserView>
                <MobileView>
                    <Box className={classes.form}>
                        <Box className={classes.tabs}>
                            <Box className={`${classes.tabItem} ${activeTab==='deposit' && classes.activeTab}`} onClick={()=>selectTab('deposit')}>Deposit</Box>
                            <Box className={`${classes.tabItem} ${activeTab==='withdrawal' && classes.activeTab}`} onClick={()=>selectTab('withdrawal')}>Withdrawal</Box>
                        </Box>
                        {
                            activeTab==='deposit'
                            ? <Box>
                                <Box className={classes.rountInput}>
                                    <input type="text" value={depositAmount} onChange={(e)=>setDeposit(e.target.value)}/>
                                    <Box>MAX</Box>
                                </Box>
                                <Box className={classes.button}>Approve</Box>
                            </Box>
                            : <Box>
                                <Box className={classes.rountInput}>
                                    <input type="text" value={withdrawalAmount} onChange={(e)=>setWithdrawal(e.target.value)}/>
                                    <Box>MAX</Box>
                                </Box>
                                <Box className={classes.button}>Withdrawal XEND</Box>
                            </Box>
                        }
                    </Box>
                </MobileView>
            </Box>
        </Modal>
    );
}

export default DepositeModal;