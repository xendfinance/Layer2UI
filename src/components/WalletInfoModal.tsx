import React, { useMemo } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Modal, Box } from '@material-ui/core';
import closeIcon from 'assets/images/layout/close.png';
import { getChainData } from "helpers/utilities";
import { convertAmountFromRawNumber } from "helpers/bignumber";
import { useSelector } from 'react-redux';

interface Props {
    open: any;
    setOpen: any;
    chainId: any;
    address: any;
    balance: any;
    onDisconnect: any;
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
        width: 411,
        padding: 32,
        fontFamily: 'Fira Sans',
        fontWeight: 700,
        [theme.breakpoints.down("xs")]: {
            width: 'calc(100% - 70px)',
            padding: 20,
        }
    },
    closeBtn: {
        position: 'absolute',
        right: 22,
        top: 22,
        borderRadius: '50%',
        backgroundColor: theme.palette.secondary.main,
        width: 34,
        height: 34,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    connectedText: {
        fontSize: 22
    },
    walletInfoBox: {
        marginTop: 46,
        width: 'calc(100% - 32)',
        background: 'rgba(255, 255, 255, 0.05)',
        boxShadow: '0px 17.8125px 18.525px rgba(0, 0, 0, 0.1)',
        borderRadius: 5.44429,
        padding: '16px 26px'
    },
    label: {
        fontWeight: 500,
        fontSize: 14,
        color: theme.palette.text.secondary
    },
    value: {
        marginTop: 7,
        fontWeight: 500,
        fontSize: 14,
        color: theme.palette.text.primary,
        overflowWrap: 'break-word'
    },
    disconnectButton: {
        marginTop: 40,
        textAlign: 'center',
        fontSize: 14,
        color: '#FF6600',
        cursor: 'pointer'
    }
  }),
);

const WalletInfoModal: React.FC<Props> = ({ open, setOpen, onDisconnect,chainId, address, balance }: any) => {
    const classes = useStyles();
    const currentChainId = useSelector((store: any) => store.DashboardReducer.networkConnect);
    let finalChainId;
    if(currentChainId.ChainId){
        finalChainId = Number(currentChainId.ChainId);
       
    }else{
        finalChainId = Number(currentChainId);
    } 
   
 
    const currentNetwork = useMemo(()=>{
        if (chainId) {
            return getChainData(chainId);
        }
        return null;
    }, [chainId]);

    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <Box className={classes.root}>
                <Box className={classes.closeBtn} onClick={() => setOpen(false)}>
                    <img src={closeIcon} alt='XEND Finance' />
                </Box>
                <Box className={classes.connectedText}>Connected</Box>
                <Box className={classes.walletInfoBox}>
                    <Box className={classes.label}>{finalChainId==56?'Binance Smart Chain':'Polygon Matic'}</Box>
                    {/* <Box className={classes.value}>
                        {convertAmountFromRawNumber(balance, currentNetwork?parseInt(currentNetwork.native_currency.decimals):18)}
                        {' '}
                        {currentNetwork && currentNetwork.native_currency && currentNetwork.native_currency.symbol}
                    </Box> */}
                    <Box className={classes.label} style={{marginTop: 28}}>Wallet Address</Box>
                    <Box className={classes.value}>{address}</Box>
                </Box>                
                <Box className={classes.disconnectButton} onClick={()=>onDisconnect()}>Disconnect</Box>
            </Box>
        </Modal>
    );
}

export default WalletInfoModal;