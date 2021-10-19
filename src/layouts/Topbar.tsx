import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Dropdown from '../components/Dropdown';
import {isMobile} from 'react-device-detect';

import { useDispatch, useSelector } from 'react-redux';

import Button from '../components/Button';
import LogoIcon from '../assets/images/logo.png';
import Vector from '../assets/images/layout/Vector.png';
import Mainnet from '../assets/images/busd.svg';
import Polygon from '../assets/images/polygon.svg';
import Metamask from 'assets/images/metamask-fox.svg';
import WalletConnect from 'assets/images/trust-wallet.svg'
import getXVaultAPIUSDT from 'methods/redux/actions/get-apy-xvault';
import getXVaultAPI from 'methods/redux/actions/get-apy-xvault';

interface Props {
    connected:any;
    onConnect: any;
    chainId: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        backgroundColor: theme.palette.background.default,
        paddingTop: 23,
        paddingBottom: 23,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    menuGroup: {
        display: 'flex',
    },
    dropdownButton: {
        marginLeft: 20,
    },
    connectButton: {
        display: 'block',
        marginLeft: 20,
        [theme.breakpoints.down("xs")]: {
            display: 'none'
        }
    }
  }),
);



const Topbar: React.FC<Props> = ({ connected, setConnected, onConnect, chainId }:any) => {
    const classes = useStyles();
    const networks = [137, 56];
    console.log("networks",networks);
    const selectedNetworkIndex = networks.indexOf(chainId) !== -1 ? networks.indexOf(chainId) : 0;
    

    return (
        <Box className={classes.root}>
            <img src={LogoIcon} alt='XEND Finance' />
            <Box className={classes.menuGroup}>
                <Dropdown className={classes.dropdownButton} dwidth={68} values={isMobile?['xvault', 'xauto']:['X Vault','X Auto']} selected={0}/>
                <Dropdown className={classes.dropdownButton} dwidth={130} btnIcons={[Mainnet, Polygon]} values={['BSC', 'Polygon']} selected={0}/>
                <Dropdown className={classes.dropdownButton} dwidth={130} btnIcons={[Metamask, WalletConnect]} values={['Metamask', 'WalletConnect']} selected={0}/>
                <Button className={classes.connectButton} variant='primary' title={connected?'Connected':'Connect Wallet'} btnIcon={Vector} onClick={() => onConnect()}/>
                
            </Box>
        </Box>
    );
}

export default Topbar;