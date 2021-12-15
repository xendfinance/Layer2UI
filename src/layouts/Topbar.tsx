import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import LogoIcon from '../assets/icons/XendFinanceLogo.svg';
import Wallets from '../pages/LandingPage/components/Wallets';
import ConnectionModal from '../pages/LandingPage/components/ConnectionModal';
import Button from '../components/Button';

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
        height:40
    },
    connectButton: {
        display: 'block',
        marginLeft: 20,
        [theme.breakpoints.down("xs")]: {
            display: 'none'
        }
    },
 


   
  
  }),
);



const Topbar: React.FC<Props> = ({ connected, setConnected, onConnect, chainId }:any) => {
    const classes = useStyles();   
    const [connectModal, setConnectModal] = useState(false);
    const goToTidalFinance = () => {
        
        window.open('http://xend.tidal.finance', "_blank");  
        return;
    }

    return (
        <Box className={classes.root}>
            <img src={LogoIcon} alt='XEND Finance' />
            <Box className={classes.menuGroup}>
                <Button             marginRight='3px'
                                    variant='secondary'
                                    fontSize='14'
                                    title='BUY Insurance'
                                    onClick={() => {
                                        goToTidalFinance();
                                    }} />
               
              <Wallets setOpen={setConnectModal} />

              <ConnectionModal
                    open={connectModal}
                    setOpen={setConnectModal} />
                    
            </Box>
        </Box>
    );
}

export default Topbar;