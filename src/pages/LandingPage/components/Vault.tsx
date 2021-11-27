import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Tooltip } from '@material-ui/core';
import DepositeModal from './DepositeModal';
import Button from '../../../components/Button';
import { useSelector } from 'react-redux';
import { hydrateApy, hydrateTokenBalance, hydrateTvl, hydrateUsersProtocolBalance } from '../../../methods/hydrate';
import { shortAmount } from '../../../methods/bignumber-converter';
import commas from '../../../methods/utils/commas';
import { InfoCircleOutlined, LinkOutlined, LoadingOutlined } from '@ant-design/icons';
// import { Link } from 'react-router-dom';
import { Asset } from '../../../methods/assets';
// import PreviousVersion from './PreviousProtocol';

interface Props {
    asset: Asset,
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
    link: string
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
    asset,
    network, abi, contract,
    assetIcon, assetName, protocol,
    balance, netAPY, vaultasset,
    auditedState, availableDeposite,
    tokenAbi, tokenAddress

}) => {
    const classes = useStyles();
    const [isOpenDepositeModal, setOpenDepositeModal] = useState(false);
    const { address, hydrateSwitch, chainId } = useSelector((store: any) => store.DashboardReducer);




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
        <tr className={classes.root}>
            <DepositeModal
                asset={asset}
                open={isOpenDepositeModal}
                setOpen={setOpenDepositeModal}
                balance={state.balance}
                netAPY={state.apy}
                vaultasset={state.vaultAsset}
                availableDeposite={state.availableFunds} />

            <td className={classes.asset}>
                <Box>
                    <img
                        width="55px"
                        height="55px"
                        src={assetIcon} alt='' />
                </Box>
                <Box
                    style={{ marginLeft: 18 }}>{assetName}</Box>
            </td>

            <td>{protocol}</td>

            {/* {asset.protocolName === 'xVault' && <td>
                <a style={{ fontSize: 13, textDecoration: 'underline', color: 'white' }} target="_blank" href={asset.strategy?.code}>{asset.strategy?.name}</a>
            </td>} */}

            {/* <td>{commas(state.balance)} <PreviousVersion asset={asset} state={state} /></td> */}

            <td style={{
                color: asset.deprecated ? "#FF6600" : ''
            }}>
                {
                    asset.deprecated ?
                        <>
                            <Tooltip title="Withdraw balance from deprecated contract" placement="top">
                                <div>
                                    <InfoCircleOutlined style={{ marginRight: 10 }} />
                                    <span>{commas(state.balance)}</span>
                                </div>
                            </Tooltip>
                        </> :
                        <span>{commas(state.balance)}</span>
                }
            </td>

            <td className={classes.netAPY}>{commas(state.apy, 2)}%</td>

            <td>${commas(state.vaultAsset)}</td>

            {
                auditedState == 'audited' ?
                    <td className={classes.netAPY}><a target="_blank" className={classes.netAPY} href="https://docs.xend.finance/contracts/audit">{auditedState} <LinkOutlined /></a></td> :
                    <td> {auditedState} </td>
            }

            <td>{commas(state.availableFunds)} {assetName}</td>

            {
                address && chainId ?
                    <td>
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
                    </td> :
                    <td>
                        <Button
                            variant='secondary'
                            fontSize='14'
                            title='Connect Wallet' />
                    </td>
            }

        </tr>
    );
}

export default Vault;