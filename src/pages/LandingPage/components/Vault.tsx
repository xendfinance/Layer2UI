import React, {useState} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import DepositeModal from './DepositeModal';
import Button from 'components/Button';

interface Props {
    assetIcon: string;
    assetName: string;
    fees: string;
    balance: string;
    netAPY: string;
    vaultasset: string;
    auditedState: string;
    availableDeposite: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        borderTop: '1px solid rgba(102, 102, 102, 0.91)',
        paddingLeft: 0,
        fontSize: 18,
        fontWeight: 700,
        "&>td": {
            color: theme.palette.text.primary,
            textAlign: 'center'
        }
    },
    asset: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 30,
        marginLeft: 40,
        textAlign: 'left',
        fontWeight: 700
    },
    netAPY: {
        color: '#00D395 !important'
    }
  }),
);

const Vault: React.FC<Props> = ({ assetIcon, assetName, fees, balance, netAPY, vaultasset,auditedState, availableDeposite  }: any) => {
    const classes = useStyles();
    const [isOpenDepositeModal, setOpenDepositeModal] = useState(false);

    return (
        <tr className={classes.root}>
            <DepositeModal open={isOpenDepositeModal} setOpen={setOpenDepositeModal} assetIcon={assetIcon}
                assetName={assetName} fees={fees} balance={balance} netAPY={netAPY} 
                vaultasset={vaultasset} availableDeposite={availableDeposite} />
            <td className={classes.asset}>
                <Box><img width="55px" height="55px" src={assetIcon} alt='' /></Box>
                <Box style={{marginLeft: 18}}>{assetName}</Box>
            </td>
            <td> {fees} </td>
            <td> {balance} </td>
            <td className={classes.netAPY}> {netAPY}% </td>
            <td> {vaultasset} </td>
            {auditedState =='audited'?<td className={classes.netAPY}> {auditedState} </td>:<td> {auditedState} </td>}
            
            <td> {availableDeposite} </td>
            <td> <Button variant='secondary' fontSize='14' title='Open Vault&nbsp;&nbsp; >' onClick={() => {setOpenDepositeModal(!isOpenDepositeModal);}} /> </td>
        </tr>
    );
}

export default Vault;