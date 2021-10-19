import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

import Vault from './Vault';
import VaultMobile from './VaultMobile';
import vault1 from 'assets/images/tether.svg';
import vault2 from 'assets/images/busd.svg';
import vault3 from 'assets/images/usdc.com.svg';
import {BrowserView, MobileView} from 'react-device-detect';
import getXVaultAPI from 'methods/redux/actions/get-apy-xvault';

interface Props {
    connected:any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        backgroundColor: theme.palette.background.default,
        minHeight: 550
    },
    listForDesktop: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0px 14px 40px rgba(0, 0, 0, 0.1);',
        borderRadius: 10,
        "&>table": {
            borderCollapse: 'collapse',
            width: '100%'
        }
    },
    listHeader: {
        "&>tr>th": {
            fontWeight: 700,
            paddingTop: 17,
            paddingBottom: 17,
            color: theme.palette.text.primary,
            textAlign: 'center',
            fontSize: 14,
        }
    },
    tableInfo: {
        textAlign: 'center',
        marginTop: 30,
        padding: 17,
        color: theme.palette.text.secondary,
        fontWeight: 700
    },
    valutMobile: {
        marginTop: 12
    }
  }),
);

const Vaultlist: React.FC<Props> = ({ connected }:any) => {
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

    const list = [
        {
            assetIcon: vault1,
            assetName: 'USDT',
            fees: 'XVault',
            balance: '000.0',
            netAPY: USDTapy_xvault,
            vaultasset: TVLapy_xvault,
            availableDeposit: '000.0'
        },
        {
            assetIcon: vault2,
            assetName: 'BUSD',
            fees: 'XVault',
            balance: '000.0',
            netAPY: busdapy_xvault,
            vaultasset: '000.0',
            availableDeposit: '000.0'
        },
        {
            assetIcon: vault3,
            assetName: 'USDC',
            fees: 'XVault',
            balance: '000.0',
            netAPY: USDCapy_xvault,
            vaultasset: '000.0',
            availableDeposit: '000.0'
        }
    ]
    return (
        <Box className={classes.root}>
            <BrowserView>
                <Box className={classes.listForDesktop}>
                    <table>
                        <thead className={classes.listHeader}>
                            <tr>
                                <th style={{width:"10%"}}>Asset</th>
                                <th style={{width:"13%"}}>Fees</th>
                                <th style={{width:"13%"}}>Balance</th>
                                <th style={{width:"11%"}}>APY</th>
                                <th style={{width:"15%"}}>Vault Assets</th>
                                <th style={{width:"17%"}}>Available to deposit</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            list.map((item, index)=>(
                                <Vault
                                    key={index.toString()}
                                    assetIcon={item.assetIcon}
                                    assetName={item.assetName}
                                    fees={item.fees}
                                    balance={item.balance}
                                    netAPY={item.netAPY}
                                    vaultasset={item.vaultasset}
                                    availableDeposite={item.availableDeposit}
                                />
                            ))
                        }
                        </tbody>
                    </table>
                        
                    <Box className={classes.tableInfo}>
                        <Box style={{fontSize: 14}}>More coming soon</Box>
                        <Box style={{fontSize: 13, marginTop: 5}}>Join Our Announcement Channel for Update</Box>
                    </Box>
                </Box>
            </BrowserView>
            <MobileView>
                {
                    list.map((item, index)=>(
                        <VaultMobile
                            className={classes.valutMobile}
                            key={index.toString()}
                            assetIcon={item.assetIcon}
                            assetName={item.assetName}
                            fees={item.fees}
                            balance={item.balance}
                            netAPY={item.netAPY}
                            vaultasset={item.vaultasset}
                            availableDeposite={item.availableDeposit}
                        />
                    ))
                }
            </MobileView>
        </Box>
    );
}

export default Vaultlist;