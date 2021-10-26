/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Layout from './layouts';
import { Box } from '@material-ui/core';
import LandingPage  from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import WalletInfoModal from 'components/WalletInfoModal';
import { useDispatch, useSelector } from 'react-redux';

import {
  getChainData
} from "./helpers/utilities";

import Web3 from "web3";
import Web3Modal from "web3modal";
import { Login, recreateWeb3 } from 'utils/useAuth';
import { ConnectorNames } from 'utils/types';
import { notify } from 'components/core/Notifier';
import { decodedTextSpanIntersectsWith } from 'typescript';
import { disconnect } from 'methods/redux/actions/contract-setup';
import getNativeBalance from 'methods/redux/actions/getBalances';
import getAllBalances from 'methods/contracts/getAllBalances';
import getXVaultAPI from 'methods/redux/actions/get-apy-xvault';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        position: 'relative',
        width: '100%',
        backgroundColor: theme.palette.background.default,
        fontFamily: 'Fira Sans'
    },
  }),
);

const XendFianance = ({ light, setTheme, connected, setConnected, omitted, setOmitted }:any) => {
  const classes = useStyles();

  const [web3, setWeb3]: any = useState(null);
  const [chainId, setChainId]: any = useState(1);
  const [balance, setBalance]: any = useState(0);
  const [address, setAddress]: any = useState('');
  
  const addressStore = useSelector((store: any) => store.DashboardReducer.address);
   
  const walletConnectType = useSelector((store: any) => store.DashboardReducer.wcp);
 
  const walletChosenConnection = walletConnectType.WCP;
  
  const wca = useSelector((store: any) => store.DashboardReducer.wca);
  


  
  const ChainId = useSelector((store: any) => store.DashboardReducer.networkConnect);
 
  let chainIdNumber = Number(ChainId.ChainId); 
  const Lender = useSelector((store: any) => store.DashboardReducer.lender);
 
  const LenderProtocol = Lender.lenderProtocol;

  const dispatch = useDispatch();


  const [openWalletInfoModal, setOpenWalletInfoModal]: any = useState(false);

  const getNetwork = () => {
    return getChainData(chainId).network;
  }


  const onConnect = async () => {
   // const connectionDetails = JSON.parse(localStorage.getItem('CONNECTION_DETAILS') || '{}');

    


  if(wca.address){

    
    
    setAddress(wca.address)
    setConnected(true);
    setOpenWalletInfoModal(true);
    return;
  }else{
    if (!connected) {
      
      if(walletChosenConnection){
        if(walletChosenConnection =='walletconnect'){
          if(chainIdNumber == 56){
  
            const addressRet = await dispatch(Login(ConnectorNames.WalletConnect,56,LenderProtocol))
            
            
              setConnected(true);
              setAddress(addressRet)
              getXVaultAPI(chainIdNumber);
              //dispatch(await getAllBalances(String(addressRet)));
            
            
           
           
          }else if(chainIdNumber == 137){
            const addressRet = await dispatch(Login(ConnectorNames.WalletConnect,137,LenderProtocol))
            if(addressRet){
              setConnected(true);
              setAddress(addressRet)
              getXVaultAPI(chainIdNumber);
              //dispatch(await getAllBalances(String(addressRet)));
            }
           
          }else{
            notify('info', 'No Valid Network')
          }
        }else if(walletChosenConnection =='injected'){
          if(chainIdNumber == 56){
            const addressRet =  dispatch(await Login(ConnectorNames.Injected,56,LenderProtocol))
            if(addressRet){
              setConnected(true);
              setAddress(addressRet)
             
          
            }
            getXVaultAPI(chainIdNumber);
           
          }else if(chainIdNumber == 137){
            const addressRet = dispatch(await Login(ConnectorNames.Injected,137,LenderProtocol))
            if(addressRet){
              setConnected(true);
              setAddress(addressRet)
              getXVaultAPI(chainIdNumber);
             
            }
            
           
           
          }else{
            notify('info', 'No Valid Network')
          }
        }else{
          notify('info', 'No Valid Wallet Connection')
        }
      }else{
        notify('info', 'Please Select Protocol,Network And Wallet Connection')
        console.log("HIT HERE ON NOTHING SELECTED")
      }
    
     
    } else {
      setOpenWalletInfoModal(true);
    }
  }
    
  };


	const disconnectWallet = () => {
		dispatch(disconnect());
		setTimeout(() => {
			window.location.reload();
		}, 500)
	}


  const onDisconnect = async () => {
    disconnectWallet();
  };

  useEffect(()=>{
    recreateWeb3();
    
  }, []);

  const getBalance = async (address: any) => {
    if (web3 && address) {
      //const balance = await web3.eth.getBalance(address);
      //setBalance(balance);
    }
  }

  useEffect(()=>{
    //getBalance(address)
  }, [address, chainId, web3])
  
  return (
    <Box className={classes.root}>
        <Router>
          <Switch>
              <Layout light={light} setTheme={setTheme} connected={connected} onConnect={onConnect} chainId={chainId}>
                <Route exact path='/'>
                    <LandingPage connected={connected}/>
                </Route>
                <Route exact path='/about'>
                    <AboutPage connected={connected} />
                </Route>
              </Layout>
          </Switch>
          <WalletInfoModal
            open = {openWalletInfoModal}
            setOpen = {setOpenWalletInfoModal}
            chainId={chainId}
            balance={balance}
            address={address}
            onDisconnect = {onDisconnect}
          />
        </Router>
    </Box>
  );
}
export default XendFianance;


