import React, {useState} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import DepositeModal from './DepositeModal';
import Button from '../../../components/Button';

interface Props {
    className?: string;
    assetIcon: string;
    assetName: string;
    fees: string;
    balance: string;
    netAPY: string;
    vaultasset: string;
    availableDeposite: string;
    auditedState:string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        boxShadow: '0px 14px 40px rgba(0, 0, 0, 0.1)',
        borderRadius: 10,
        color: theme.palette.text.primary,
        fontFamily: 'Fira Sans',
        padding: '14px 25px 22px 25px'
    },
    asset: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'left',
        fontWeight: 700
    },
    assetImage: {
        width: 40,
        height: 40,
        marginRight: 7
    },
    content: {
        marginTop: 20,
        display: 'flex',
        justifyContent: 'space-between'
    },

    field: {
        fontSize: 14
    },
    value: {
        marginTop: 2,
        fontSize: 18
    },
    openVaultButton: {
        marginTop: 20,
        display: 'flex',
        justifyContent: 'center'
    }
  }),
);

const VaultMobile: React.FC<Props> = ({ className, assetIcon, assetName, fees, balance, netAPY, vaultasset,auditedState, availableDeposite  }: any) => {
    const classes = useStyles();
    const [isOpenDepositeModal, setOpenDepositeModal] = useState(false);

    return (
            <Box className={`${classes.root} ${className}`}>
                <DepositeModal open={isOpenDepositeModal} setOpen={setOpenDepositeModal} assetIcon={assetIcon}
                    assetName={assetName} fees={fees} balance={balance} netAPY={netAPY} 
                    vaultasset={vaultasset} availableDeposite={availableDeposite} />
                <Box className={classes.asset}>
                    <img className={classes.assetImage} src={assetIcon} alt='XEND Finance' />
                    <Box>{assetName}</Box>
                </Box>
                <Box className={classes.content}>
                    <Box>
                        <Box className={classes.field}>Net APY</Box>
                        <Box className={classes.value} style={{color: '#00D395'}}>{netAPY}</Box>
                    </Box>
                    <Box>
                        <Box className={classes.field}>Balance</Box>
                        <Box className={classes.value}>{balance}</Box>
                    </Box>
                    <Box>
                        <Box className={classes.field}>Vault Assets</Box>
                        <Box className={classes.value}>{vaultasset}</Box>
                    </Box>
                </Box>
                <Box style={{marginTop: 20}}>
                    <Box className={classes.field}>Available to Deposit</Box>
                    <Box className={classes.value}>{availableDeposite}</Box>
                </Box>
                <Box className={classes.openVaultButton}>
                    <Button variant='secondary' fontSize='14' title='Open Vault&nbsp;&nbsp; >' onClick={() => {setOpenDepositeModal(!isOpenDepositeModal);}} />
                </Box>
            </Box>
        );
}

export default VaultMobile;