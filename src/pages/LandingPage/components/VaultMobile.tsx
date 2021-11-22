import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import DepositeModal from './DepositeModal';
import Button from '../../../components/Button';
import { useSelector } from 'react-redux';
import commas from '../../../methods/utils/commas';
import { hydrateApy, hydrateTokenBalance, hydrateTvl, hydrateUsersProtocolBalance } from '../../../methods/hydrate';
import { shortAmount } from '../../../methods/bignumber-converter';
import { LinkOutlined, LoadingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Asset } from '../../../methods/assets';

interface Props {
    asset: Asset
    className?: string;
    assetIcon: string;
    assetName: string;
    balance: string;
    netAPY: string;
    vaultasset: string;
    availableDeposite: string;
    network: number
    protocol: string
    abi: any
    contract: string
    tokenAbi: any
    tokenAddress: string
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
        },
        link: {
            color: '#00D395 !important'
        }
    }),
);

const VaultMobile: React.FC<Props> = ({ asset,
    network, abi, contract, tokenAbi, tokenAddress,
    className, assetIcon, assetName, protocol,
    balance, netAPY, vaultasset,
    availableDeposite }) => {

    const classes = useStyles();
    const [isOpenDepositeModal, setOpenDepositeModal] = useState(false);
    const { address, chainId, hydrateSwitch } = useSelector((store: any) => store.DashboardReducer);



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
                user: address,
                tokenName: assetName
            })


            // hydrate user's token balance
            let tokenBalance = await hydrateTokenBalance({
                network,
                abi: tokenAbi,
                tokenAddress,
                tokenName: assetName,
                user: address
            })

            // hydrate apy
            let apy = await hydrateApy({ network, protocol, tokenName: assetName })

            setState({
                ...state,
                balance: userBalance,
                vaultAsset: shortAmount(tvl),
                availableFunds: tokenBalance,
                apy
            })


            setLoading(false)

        })();

    }, [protocol, address, hydrateSwitch])



    return (
        <Box className={`${classes.root} ${className}`}>
            <DepositeModal
                asset={asset}
                open={isOpenDepositeModal}
                setOpen={setOpenDepositeModal}
                assetIcon={assetIcon}
                assetName={assetName}
                balance={state.balance}
                netAPY={state.apy}
                vaultasset={state.vaultAsset}
                availableDeposite={state.availableFunds} />

            <Box className={classes.asset}>
                <img
                    className={classes.assetImage}
                    src={assetIcon} alt='XEND Finance' />
                <Box>{assetName}</Box>
            </Box>
            <Box className={classes.content}>
                <Box>
                    <Box className={classes.field}>APY</Box>
                    <Box
                        className={classes.value}
                        style={{ color: '#00D395' }}>{commas(state.apy, 2)}%</Box>
                </Box>
                <Box>
                    <Box className={classes.field}>Balance</Box>
                    <Box className={classes.value}>{commas(state.balance)}</Box>
                </Box>
                <Box>
                    <Box className={classes.field}>Total Value Locked</Box>
                    <Box className={classes.value}>${commas(state.vaultAsset)}</Box>
                </Box>
            </Box>
            <Box style={{ marginTop: 20 }}>
                <Box className={classes.field}>Available to deposit</Box>
                <Box className={classes.value}>{commas(state.availableFunds)} {assetName}</Box>
            </Box>
            <Box style={{ marginTop: 20 }}>
                <Box className={classes.field}>Audit</Box>
                <Box className={classes.value}><a className={classes.link} href="https://docs.xend.finance/contracts/audit" target="_blank"><LinkOutlined /></a></Box>
            </Box>
            <Box className={classes.openVaultButton}>
                {
                    address && chainId ?
                        <>
                            {
                                loading ?
                                    <LoadingOutlined /> :
                                    <Button
                                        variant='secondary'
                                        fontSize='14'
                                        title='Open Vault&nbsp;&nbsp;'
                                        onClick={() => {
                                            setOpenDepositeModal(!isOpenDepositeModal);
                                        }} />
                            }
                        </> :
                        <Button
                            variant='secondary'
                            fontSize='14'
                            title='Connect Wallet' />}
            </Box>
        </Box>
    );
}

export default VaultMobile;