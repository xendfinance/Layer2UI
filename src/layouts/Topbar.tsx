import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Dropdown from '../components/Dropdown';
import {isMobile} from 'react-device-detect';

import Button from '../components/Button';
import LogoIcon from '../assets/images/logo.png';
import Vector from '../assets/images/layout/Vector.png';
import Mainnet from '../assets/images/layout/Mainnet.png';
import Ethereum from '../assets/images/layout/Ethereum.png';

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
    const networks = [1, 56];
    const selectedNetworkIndex = networks.indexOf(chainId) !== -1 ? networks.indexOf(chainId) : 0;

    return (
        <Box className={classes.root}>
            <img src={LogoIcon} alt='XEND Finance' />
            <Box className={classes.menuGroup}>
                <Dropdown className={classes.dropdownButton} dwidth={68} values={isMobile?['v1', 'v2']:['Layer v1','Layer v2']} selected={0}/>
                <Dropdown className={classes.dropdownButton} dwidth={130} btnIcons={[Ethereum, Mainnet]} values={['Ethereum', 'BSC Mainnet']} selected={selectedNetworkIndex}/>
                <Button className={classes.connectButton} variant='primary' title={connected?'Connected':'Connect Wallet'} btnIcon={Vector} onClick={() => onConnect()}/>
                
            </Box>
        </Box>
    );
}

export default Topbar;