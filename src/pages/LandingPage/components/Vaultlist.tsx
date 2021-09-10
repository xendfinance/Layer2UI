import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

import Vault from './Vault';
import VaultMobile from './VaultMobile';
import vault1 from 'assets/images/vaults/vault1.png';
import {BrowserView, MobileView} from 'react-device-detect';

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

    const list = [
        {
            assetIcon: vault1,
            assetName: 'COMP',
            fees: 'V2',
            balance: '000.0',
            netAPY: '45',
            vaultasset: '000.0',
            availableDeposite: '000.0'
        },
        {
            assetIcon: vault1,
            assetName: 'COMP',
            fees: 'V2',
            balance: '000.0',
            netAPY: '45',
            vaultasset: '000.0',
            availableDeposite: '000.0'
        },
        {
            assetIcon: vault1,
            assetName: 'COMP',
            fees: 'V2',
            balance: '000.0',
            netAPY: '45',
            vaultasset: '000.0',
            availableDeposite: '000.0'
        }
    ]
    return (
        <Box className={classes.root}>
            <BrowserView>
                <Box className={classes.listForDesktop}>
                    <table>
                        <thead className={classes.listHeader}>
                            <tr>
                                <th style={{width:"10%"}}>Asseta</th>
                                <th style={{width:"13%"}}>Fees</th>
                                <th style={{width:"13%"}}>Balance</th>
                                <th style={{width:"11%"}}>NetAPY</th>
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
                                    availableDeposite={item.availableDeposite}
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
                            availableDeposite={item.availableDeposite}
                        />
                    ))
                }
            </MobileView>
        </Box>
    );
}

export default Vaultlist;