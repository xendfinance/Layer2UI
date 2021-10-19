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
import { Login } from 'utils/useAuth';
import { ConnectorNames } from 'utils/types';
import { notify } from 'components/core/Notifier';
import { decodedTextSpanIntersectsWith } from 'typescript';
import { disconnect } from 'methods/redux/actions/contract-setup';
import getNativeBalance from 'methods/redux/actions/getBalances';
import getAllBalances from 'methods/contracts/xvault/methods/getAllBalances';

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
  console.log("WALLET CONNECT ADDRESS",addressStore.address);
   
  const walletConnectType = useSelector((store: any) => store.DashboardReducer.wcp);
  console.log("WALLET CONNECT TYPE",walletConnectType.WCP);
  const walletChosenConnection = walletConnectType.WCP;
  
  const wca = useSelector((store: any) => store.DashboardReducer.wca);
  console.log("WALLET CONNECT TYPE ADDRESS",wca.address);


  //setAddress(wca.address);
  console.log("WALLET CONNECT TYPE",walletChosenConnection);
  const ChainId = useSelector((store: any) => store.DashboardReducer.networkConnect);
  console.log("WALLET CONNECT TYPE",ChainId.chainId);
  let chainIdNumber = Number(ChainId.ChainId); 
  const Lender = useSelector((store: any) => store.DashboardReducer.lender);
  console.log("Lender",Lender.lenderProtocol);
  const LenderProtocol = Lender.lenderProtocol;

  const dispatch = useDispatch();


  const [openWalletInfoModal, setOpenWalletInfoModal]: any = useState(false);

  const getNetwork = () => {
    return getChainData(chainId).network;
  }


  const onConnect = async () => {
    const connectionDetails = JSON.parse(localStorage.getItem('CONNECTION_DETAILS') || '{}');

    console.log("cndet",connectionDetails);

    


  if(wca.address){

    
    
    setAddress(wca.address)
    setConnected(true);
    setOpenWalletInfoModal(true);
    return;
  }else{
    if (!connected) {
      
     
      if(walletChosenConnection =='walletconnect'){
        if(chainIdNumber == 56){

          const addressRet = dispatch(await Login(ConnectorNames.WalletConnect,56,LenderProtocol))
          console.log("ADDRESS ALREADY CONNECTED",addressRet)
          
          if(addressRet){
            setConnected(true);
            setAddress(addressRet)
            //dispatch(await getAllBalances(String(addressRet)));
          }
          
         
         
        }else if(chainIdNumber == 137){
          const addressRet = await dispatch(Login(ConnectorNames.WalletConnect,137,LenderProtocol))
          if(addressRet){
            setConnected(true);
            setAddress(addressRet)
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
         
        }else if(chainIdNumber == 137){
          const addressRet = dispatch(await Login(ConnectorNames.Injected,137,LenderProtocol))
          if(addressRet){
            setConnected(true);
            setAddress(addressRet)
           
          }
          
         
         
        }else{
          notify('info', 'No Valid Network')
        }
      }else{
        notify('info', 'No Valid Wallet Connection')
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
    // if (web3Modal.cachedProvider) {
    //   onConnect();
    // }
    setAddress(address);
    
  }, [address]);

  const getBalance = async (address: any) => {
    if (web3 && address) {
      const balance = await web3.eth.getBalance(address);
      setBalance(balance);
    }
  }

  useEffect(()=>{
    getBalance(address)
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


