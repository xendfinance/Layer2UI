/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Layout from './layouts';
import { Box } from '@material-ui/core';
import LandingPage  from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import WalletInfoModal from 'components/WalletInfoModal';

import WalletConnectProvider from "@walletconnect/web3-provider";

import {
  getChainData
} from "./helpers/utilities";

import Web3 from "web3";
import Web3Modal from "web3modal";

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
  const [address, setAddress]: any = useState(null);
  const [balance, setBalance]: any = useState(0);

  const [openWalletInfoModal, setOpenWalletInfoModal]: any = useState(false);

  const getNetwork = () => {
    return getChainData(chainId).network;
  }

  const getProviderOptions = () => {
    const providerOptions = {
      walletconnect: {
        display: {
          name: "Mobile"
        },
        package: WalletConnectProvider,
        options: {
          infuraId: process.env.REACT_APP_INFURA_ID
        }
      },
    };
    return providerOptions;
  };

  const subscribeProvider = async (provider: any) => {
    if (!provider.on) {
      return;
    }
    
    provider.on("close", () => {
      onDisconnect()
    });
    
    provider.on("accountsChanged", async (accounts: string[]) => {
      setAddress(accounts[0]);
    });

    provider.on("chainChanged", async (chainId: number) => {
      setChainId(parseInt(chainId.toString()));
    });

    provider.on("disconnect", async (error: {code: number; message: string}) => {
    });
  };

  const initWeb3 = (provider: any) => {
    const web3: any = new Web3(provider);
    web3.eth.extend({
      methods: [
        {
          name: "chainId",
          call: "eth_chainId",
          outputFormatter: web3.utils.hexToNumber
        }
      ]
    });
    return web3;
  }

  const web3Modal = new Web3Modal({
    network: getNetwork(),
    cacheProvider: true,
    providerOptions: getProviderOptions(),
    theme: {
      background: "#1C1D21",
      main: "#ffffff",
      secondary: "#8E93A4",
      border: "none",
      hover: "rgba(255, 255, 255, 0.05);"
    }
  });

  const onConnect = async () => {
    if (!connected) {
      const provider = await web3Modal.connect();
      await subscribeProvider(provider);
  
      const web3: any = initWeb3(provider);
      const accounts = await web3.eth.getAccounts();
      const address = accounts[0];
  
      setAddress(address);
      setWeb3(web3);
      setConnected(true);
  
      const chain_Id = await web3.eth.chainId();
      setChainId(chain_Id);
    } else {
      setOpenWalletInfoModal(true);
    }
  };

  const onDisconnect = async () => {
    if (web3 && web3.currentProvider && web3.currentProvider.close) {
      await web3.currentProvider.close();
    }
    await web3Modal.clearCachedProvider();
    setChainId(1);
    setAddress(null);
    setBalance(0);
    setConnected(false);
    setOpenWalletInfoModal(false);
  };

  useEffect(()=>{
    if (web3Modal.cachedProvider) {
      onConnect();
    }
  }, []);

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
