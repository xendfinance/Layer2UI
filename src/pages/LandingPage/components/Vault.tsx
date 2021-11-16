import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import DepositeModal from './DepositeModal';
import Button from '../../../components/Button';
import { useSelector } from 'react-redux';
import { hydrateTokenBalance, hydrateTvl, hydrateUsersProtocolBalance } from '../../../methods/hydrate';
import { shortAmount } from '../../../methods/bignumber-converter';
import { xVaultUserBalance } from '../../../methods/get-balances';
import commas from '../../../methods/utils/commas';

interface Props {
    assetIcon: any;
    assetName: string;
    protocol: string;
    balance: string;
    netAPY: string;
    vaultasset: string;
    auditedState: string;
    availableDeposite: string;
    network: number
    abi: any
    contract: string
    tokenAbi: any
    tokenAddress: string
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

const Vault: React.FC<Props> = ({

    network, abi, contract,
    assetIcon, assetName, protocol,
    balance, netAPY, vaultasset,
    auditedState, availableDeposite, tokenAbi, tokenAddress

}) => {
    const classes = useStyles();
    const [isOpenDepositeModal, setOpenDepositeModal] = useState(false);
    const address = useSelector((store: any) => store.DashboardReducer.address);
    const wca = useSelector((store: any) => store.DashboardReducer.wca);






    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({
        balance: "0.00",
        apy: "0.00",
        vaultAsset: "0.00",
        availableFunds: "0.00"
    })


    useEffect(() => {
        (async () => {


            if (!address || address.length === 0) return;

            setLoading(true)

            setState({
                ...state,
                balance,
                apy: netAPY,
                vaultAsset: vaultasset,
                availableFunds: availableDeposite
            })

            // hydrate tvl
            let tvl = await hydrateTvl({
                network,
                abi,
                address: contract,
                protocol,
                tokenName: assetName
            });


            // hydrate user's balance
            let userBalance = await hydrateUsersProtocolBalance({
                network,
                abi,
                protocol,
                protocolAddress: contract,
                user: address
            })


            // hydrate user's token balance
            let tokenBalance = await hydrateTokenBalance({
                network,
                abi: tokenAbi,
                tokenAddress,
                tokenName: assetName,
                user: address
            })
            console.log(tokenBalance, ' token balance')



            setState({
                ...state,
                balance: userBalance,
                vaultAsset: shortAmount(tvl),
                availableFunds: tokenBalance
            })





            setLoading(false)
        })();
    }, [protocol, address])

    return (
        <tr className={classes.root}>
            {/* <DepositeModal open={isOpenDepositeModal} setOpen={setOpenDepositeModal} assetIcon={assetIcon}
                assetName={assetName} fees={fees} balance={balance} netAPY={netAPY}
                vaultasset={vaultasset} availableDeposite={availableDeposite} /> */}

            <td className={classes.asset}>
                <Box>
                    <img width="55px" height="55px" src={assetIcon} alt='' />
                </Box>
                <Box style={{ marginLeft: 18 }}>{assetName}</Box>
            </td>
            <td>{protocol}</td>
            <td>{commas(state.balance)}</td>
            <td className={classes.netAPY}>{state.apy}%</td>
            <td>${commas(state.vaultAsset)}</td>
            {auditedState == 'audited' ? <td className={classes.netAPY}> {auditedState} </td> : <td> {auditedState} </td>}

            <td>{commas(state.availableFunds)} {assetName}</td>
            {address && wca.chainId ? <td> <Button variant='secondary' fontSize='14' title='Open Vault&nbsp;&nbsp;' onClick={() => { setOpenDepositeModal(!isOpenDepositeModal); }} /> </td> : <td> <Button variant='secondary' fontSize='14' title='Connect Wallet' /> </td>}

        </tr>
    );
}

export default Vault;