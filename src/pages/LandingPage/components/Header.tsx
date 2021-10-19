import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';
import getXVaultAPI from 'methods/redux/actions/get-apy-xvault';

interface Props {
    connected:any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        marginTop: 37,
        marginBottom: 32,
        [theme.breakpoints.down("xs")]: {
            marginTop: 15,
            marginBottom: 12,
        }
    },
    content: {
        marginTop: 20,
        paddingRight: 30,
        [theme.breakpoints.down("xs")]: {
            paddingRight: 0,
        }
    },
    title: {
        fontWeight: 700,
        fontSize: 24,
        color: theme.palette.text.primary,
        [theme.breakpoints.down("xs")]: {
            fontSize: 18,
        }
    },
    description: {
        marginTop: 12,
        fontWeight: 500,
        fontSize: 13,
        color: theme.palette.text.primary,
        [theme.breakpoints.down("xs")]: {
            fontSize: 12,
        }
    },
    asset: {
        marginTop: 20,
        padding: 25,
        borderRadius: 6,
        background: theme.palette.background.paper
    },
    assetTitle: {
        fontWeight: 700,
        fontSize: 17,
        color: theme.palette.text.secondary,
    },
    assetValue: {
        marginTop: 10,
        fontWeight: 700,
        fontSize: 24,
        color: theme.palette.text.primary
    }
  }),
);

const Header: React.FC<Props> = ({ connected }:any) => {
    const classes = useStyles();
   
    const [busdapy_xvault, setBusdAPYXVault] = useState('');
    const [USDCapy_xvault, setUSDCAPYXVault] = useState('');
    const [USDTapy_xvault, setUSDTAPYXVault] = useState('');
    const [TVLapy_xvault, setTVLAPYXVault] = useState('');
    const [apy, setApy] = useState({});


    const getxVaultApy = async () => {
        const apyObj = await getXVaultAPI();
        setApy({apyObj});
        const busdString = apyObj?.busd;
        if (busdString){
            const finalAPY = Number(busdString).toFixed(2); 
            setBusdAPYXVault(finalAPY);
        }
        const usdtString = apyObj?.usdt;
        if (usdtString){
            const finalAPY = Number(usdtString).toFixed(2); 
            setUSDTAPYXVault(finalAPY);
        }

        const usdcString = apyObj?.usdc;
        if (usdcString){
            const finalAPY = Number(usdcString).toFixed(2); 
            setUSDCAPYXVault(finalAPY);
        }

        const tvlString = apyObj?.TVL;
        if (tvlString){
            const finalAPY = Number(tvlString).toFixed(2); 
            setTVLAPYXVault(finalAPY);
        }

        
      

    }


    useEffect(()=>{
        getxVaultApy();
     }, [])

     
    return (
        <Grid className={classes.root} container>
            <Grid className={classes.content} item xs={12} sm={7}>
                <Box className={classes.title}>
                    Xend Finance Layer 2 DeFi protocol
                </Box>
                <Box className={classes.description}>
                    Xend Finance has composed multiple Layer 1 DeFi protocols across different 
                    blockchains to provide better yields, as opposed to using Layer 1 DeFi yield 
                    platforms individually.
                </Box>
            </Grid>
            <Grid className={classes.asset} item xs={12} sm={5}>
                <Box className={classes.assetTitle}>Total Vault Asset</Box>
                <Box className={classes.assetValue}>{TVLapy_xvault}</Box>
            </Grid>
        </Grid>
    );
}

export default Header;