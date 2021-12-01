import React, { useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Modal, Box, Grid } from '@material-ui/core';
import closeIcon from './../../../assets/images/layout/close.png';
import { BrowserView, MobileView } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';

import commas from '../../../methods/utils/commas';
import InputNumber from './NumberInput';
import { depositAction } from '../../../methods/deposit';
import { Asset } from '../../../methods/assets';
import { withdrawAction } from '../../../methods/withdraw';
import { InfoCircleFilled } from '@ant-design/icons';

interface Props {
    asset: Asset
    open: any;
    setOpen: any;
    balance: string;
    netAPY: string;
    vaultasset: string;
    availableDeposite: string;
    notice?: string
}

const useStyles = makeStyles((theme: any) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.dropdown.dark,
            borderRadius: 25,
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%)`,
            color: theme.palette.text.primary,
            width: 600,
            // height: 420,
            padding: 32,
            fontFamily: 'Fira Sans',
            fontWeight: 700,
            [theme.breakpoints.down("xs")]: {
                width: 'calc(100% - 70px)',
                padding: 20,
            }
        },

        wrapper: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },

        logo: {
            display: 'flex',
            alignItems: 'center',
        },

        logoImage: {
            width: 53,
            height: 53,
            marginRight: 10
        },

        closeBtn: {
            position: 'absolute',
            right: 28,
            top: 28,
            borderRadius: '50%',
            backgroundColor: theme.palette.secondary.main,
            width: 42,
            height: 42,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },

        content: {
            marginTop: 40,
            paddingLeft: 10,
            paddingRight: 10
            // display: 'flex',
            // justifyContent: 'space-between'
        },
        contentItem: {
            float: 'left',
            marginRight: 30,
            marginBottom: 20,
        },
        field: {
            fontSize: 14
        },
        value: {
            marginTop: 13,
            fontSize: 18
        },
        form: {
            clear: 'both',
            marginTop: 140,
            [theme.breakpoints.down("xs")]: {
                marginTop: 200,
                paddingLeft: 20,
                paddingRight: 20
            }
        },
        label: {
            marginLeft: 15,
            fontSize: 18,
            color: '#ffffff'
        },
        rountInput: {
            marginTop: 15,
            borderRadius: 47,
            border: '2px solid #707070',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 14,
            color: '#84858A',
            fontSize: 18,
            "&>input": {
                backgroundColor: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#84858A',
                fontSize: 18,
                fontWeight: 700,
                width: 'calc(100% - 30px)'
            },
            [theme.breakpoints.down("xs")]: {
                marginTop: 35,
                paddingTop: 12,
                paddingBottom: 12
            }
        },
        button: {
            cursor: 'pointer',
            marginTop: 32,
            paddingTop: 15,
            paddingBottom: 15,
            textAlign: 'center',
            background: 'linear-gradient(276.21deg, #2042B8 -26.01%, #FF6600 145.95%);',
            borderRadius: 47,
            fontSize: 18,
            [theme.breakpoints.down("xs")]: {
                marginTop: 28,
            }
        },
        tabs: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around'
        },
        tabItem: {
            cursor: 'pointer',
            color: '#84858A',
            fontSize: 14,
        },
        activeTab: {
            color: '#ffffff',
            background: 'rgba(255, 255, 255, 0.14)',
            borderRadius: 25.5,
            padding: '6px 25px'
        }
    }),
);


const DepositeModal: React.FC<Props> = ({ open, setOpen, balance, netAPY, vaultasset, availableDeposite, asset, notice }) => {
    const classes = useStyles();
    const [activeTab, selectTab] = useState('deposit');
    const [depositAmount, setDeposit] = useState('0');
    const [withdrawalAmount, setWithdrawal] = useState('0');


    const dispatch = useDispatch();
    const { address } = useSelector((store: any) => store.DashboardReducer);


    const lendingProtocol = useSelector((store: any) => store.DashboardReducer.lender);



    const buttonHandlerDeposit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        dispatch(depositAction({ amount: depositAmount, asset, client: address }))
        setOpen(false);
        setDeposit('0');
    }


    const buttonHandlerWithdraw = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        dispatch(withdrawAction({ amount: withdrawalAmount, asset, client: address }))

        setOpen(false);
        setWithdrawal('0')
    }


    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <Box className={classes.root}>
                <Box className={classes.closeBtn} onClick={() => setOpen(false)}>
                    <img src={closeIcon} alt='XEND Finance' />
                </Box>
                <Box className={classes.logo}>
                    <>
                        {<img className={classes.logoImage} src={asset.logo} alt='XEND Finance' />}
                    </>

                    <Box>
                        <Box style={{ color: '#ffffff', fontSize: 18 }}>
                            <>
                                {asset.name}
                            </>
                        </Box>
                        <Box style={{ color: '#84858A', fontSize: 14 }}>
                            <>
                                {lendingProtocol}
                            </>
                        </Box>
                    </Box>
                </Box>

                {asset.deprecated && <p style={{ color: "#FF6600", fontWeight: 400 }}><InfoCircleFilled />You should only withdraw your funds from this vault as it is deprecated.</p>}

                <Box className={classes.content}>

                    <Box className={classes.contentItem}>
                        <Box className={classes.field}> Balance</Box>
                        <Box className={classes.value}>{commas(balance)} {asset.name}</Box>
                    </Box>
                    <Box className={classes.contentItem}>
                        <Box className={classes.field}>Net APY</Box>
                        <Box className={classes.value} style={{ color: '#00D395' }}>{commas(netAPY, 2)}%</Box>
                    </Box>
                    <Box className={classes.contentItem}>
                        <Box className={classes.field}>Vault Assets</Box>
                        <Box className={classes.value}>${commas(vaultasset)}</Box>
                    </Box>
                    <Box className={classes.contentItem}>
                        <Box className={classes.field}>Available to deposit</Box>
                        <Box className={classes.value}>{commas(availableDeposite)} {asset.name}</Box>
                    </Box>
                </Box>
                <BrowserView>
                    <Grid container className={classes.form} spacing={3}>
                        <Grid item xs={6}>
                            <Box className={classes.label}>Deposit</Box>
                            <Box className={classes.rountInput}>
                                <InputNumber
                                    min={1}
                                    value={depositAmount}
                                    onChange={(e) => setDeposit(e)} />

                            </Box>
                            {
                                // asset.protocolName.toLowerCase() !== 'xvault' &&
                                !asset.deprecated &&
                                    Number(availableDeposite) > 0 &&
                                    Number(depositAmount) > 0 &&
                                    Number(depositAmount) <= Number(availableDeposite) ?
                                    <Box
                                        className={classes.button}
                                        onClick={buttonHandlerDeposit}>Deposit</Box> :
                                    <Box
                                        className={classes.button}
                                        style={{
                                            cursor: 'not-allowed',
                                            pointerEvents: 'none',
                                            background: 'linear-gradient(276.21deg, #eaecf1 -26.01%, rgb(140 130 124) 145.95%)'
                                        }}>Deposit</Box>
                            }
                        </Grid>
                        <Grid item xs={6}>
                            <Box className={classes.label}>Withdraw</Box>
                            <Box className={classes.rountInput}>
                                <InputNumber
                                    value={withdrawalAmount}
                                    onChange={(e) => setWithdrawal(e)} />

                            </Box>
                            {
                                Number(withdrawalAmount) > 0 &&
                                    Number(balance) > 0 &&
                                    Number(withdrawalAmount) <= Number(balance) ?
                                    <Box
                                        className={classes.button}
                                        onClick={buttonHandlerWithdraw}>Withdraw</Box> :
                                    <Box
                                        className={classes.button}
                                        style={{
                                            pointerEvents: 'none',
                                            background: 'linear-gradient(276.21deg, #eaecf1 -26.01%, rgb(140 130 124) 145.95%)'
                                        }}>Withdraw</Box>
                            }
                        </Grid>
                    </Grid>
                </BrowserView>
                <MobileView>
                    <Box className={classes.form}>
                        <Box className={classes.tabs}>
                            <Box className={`${classes.tabItem} ${activeTab === 'deposit' && classes.activeTab}`} onClick={() => selectTab('deposit')}>Deposit</Box>
                            <Box className={`${classes.tabItem} ${activeTab === 'withdrawal' && classes.activeTab}`} onClick={() => selectTab('withdrawal')}>Withdraw</Box>
                        </Box>
                        {
                            activeTab === 'deposit'
                                ? <Box>
                                    <Box className={classes.rountInput}>
                                        <InputNumber
                                            min={1}
                                            value={depositAmount}
                                            onChange={(e) => setDeposit(e)} />

                                    </Box>
                                    {
                                        Number(availableDeposite) > 0 &&
                                            Number(depositAmount) > 0 &&
                                            Number(depositAmount) <= Number(availableDeposite) ?
                                            <Box
                                                className={classes.button}
                                                onClick={buttonHandlerDeposit}>Deposit</Box> :
                                            <Box
                                                className={classes.button}
                                                style={{
                                                    pointerEvents: 'none',
                                                    background: 'linear-gradient(276.21deg, #eaecf1 -26.01%, rgb(140 130 124) 145.95%)'
                                                }}>Deposit</Box>}
                                </Box>
                                : <Box>
                                    <Box className={classes.rountInput}>
                                        <InputNumber
                                            value={withdrawalAmount}
                                            onChange={(e) => setWithdrawal(e)} />

                                    </Box>
                                    {
                                        Number(withdrawalAmount) > 0 &&
                                            Number(balance) > 0 &&
                                            Number(withdrawalAmount) <= Number(balance) ?
                                            <Box
                                                className={classes.button}
                                                onClick={buttonHandlerWithdraw}>Withdraw</Box> :
                                            <Box
                                                className={classes.button}
                                                style={{
                                                    pointerEvents: 'none',
                                                    background: 'linear-gradient(276.21deg, #eaecf1 -26.01%, rgb(140 130 124) 145.95%)'
                                                }} >Withdraw</Box>}
                                </Box>
                        }
                    </Box>
                </MobileView>
            </Box>
        </Modal>
    );
}

export default DepositeModal;