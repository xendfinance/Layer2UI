import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Dropdown from '../components/Dropdown';
import {isMobile} from 'react-device-detect';

import Button from '../components/Button';
import LogoIcon from '../assets/images/logo.png';
import Vector from '../assets/images/layout/Vector.png';
import Polygon from '../assets/images/layout/Polygon.png';
import Mainnet from '../assets/images/layout/Mainnet.png';
import Ethereum from '../assets/images/layout/Ethereum.png';

interface Props {
    connected:any;
    setConnected: any;
    omitted: any;
    setOmitted: any;
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

const Topbar: React.FC<Props> = ({ connected, setConnected, omitted, setOmitted }:any) => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <img src={LogoIcon} alt='XEND Finance' />
            <Box className={classes.menuGroup}>
                <Dropdown className={classes.dropdownButton} dwidth={68} values={isMobile?['v1', 'v2']:['Layer v1','Layer v2']}/>
                <Dropdown className={classes.dropdownButton} dwidth={130} btnIcons={[Mainnet, Polygon, Ethereum]} values={['BSC Mainnet','Polygon', 'Ethereum']}/>
                <Button className={classes.connectButton} variant='primary' title='Connect Wallet' btnIcon={Vector} onClick={() => alert()}/>
            </Box>
        </Box>
    );
}

export default Topbar;