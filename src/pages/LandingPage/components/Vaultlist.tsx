import React, { useEffect, useState } from 'react';
import { InfoCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Tooltip from "@material-ui/core/Tooltip";
import Vault from './Vault';
import VaultMobile from './VaultMobile';
import { BrowserView, MobileView } from 'react-device-detect';
import { useSelector } from 'react-redux';
import assets from '../../../methods/assets';



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

const Vaultlist = () => {
    const classes = useStyles();

    const { chainId, lender } = useSelector((store: any) => store.DashboardReducer);

    const [currentAssets, setcurrentAssets] = useState<Array<any>>([])

    useEffect(() => {

        if (chainId && lender) {
            const x = assets.filter(item => item.network === Number(chainId) && item.protocolName === lender)

            setcurrentAssets(x);
        }
        // when network or protocolname changes
    }, [lender, chainId])




    const openAuditLink = (event: React.MouseEvent<HTMLButtonElement>) => {
        window.open("https://docs.xend.finance/contracts/audit");
    }



    return (
        <Box className={classes.root}>
            <BrowserView>
                <Box className={classes.listForDesktop}>
                    <table>
                        <thead className={classes.listHeader}>
                            <tr>
                                <th style={{ width: "11%" }}>
                                    <Tooltip
                                        title='Digital Assets Supported'
                                        placement="top"
                                    >
                                        <div>
                                            <span>Asset</span><QuestionCircleOutlined style={{ color: '#FF6600', paddingLeft: '3px' }} />
                                        </div>
                                    </Tooltip>
                                </th>
                                <th style={{ width: "10%" }}>
                                    <Tooltip
                                        title='This is the Xend Finance Layer 2 DeFi protocol'
                                        placement="top"
                                    >
                                        <div>
                                            <span>Protocol</span><QuestionCircleOutlined style={{ color: '#FF6600', paddingLeft: '3px' }} />
                                        </div>
                                    </Tooltip>
                                </th>
                                {lender === 'xVault' && <th style={{ width: "10%" }}>
                                    <Tooltip
                                        title='This is the strategy used to invest your funds'
                                        placement="top"
                                    >
                                        <div>
                                            <span>Strategy</span><QuestionCircleOutlined style={{ color: '#FF6600', paddingLeft: '3px' }} />
                                        </div>
                                    </Tooltip>
                                </th>}
                                <th style={{ width: "10%" }}>
                                    <Tooltip
                                        title='This is overall user balance plus interest in the protocol'
                                        placement="top"
                                    >
                                        <div>
                                            <span>Balance</span><QuestionCircleOutlined style={{ color: '#FF6600', paddingLeft: '3px' }} />
                                        </div>
                                    </Tooltip>
                                </th>
                                <th style={{ width: "11%" }}>
                                    <Tooltip
                                        title='Annual Percentage Yield'
                                        placement="top"
                                    >
                                        <div>
                                            <span>APY</span><QuestionCircleOutlined style={{ color: '#FF6600', paddingLeft: '3px' }} />
                                        </div>
                                    </Tooltip>
                                </th>
                                <th style={{ width: "12%" }}>
                                    <Tooltip
                                        title='Total amount in USD held in each protocol based on selected asset'
                                        placement="top"
                                    >
                                        <div>
                                            <span>Total Value Locked</span><QuestionCircleOutlined style={{ color: '#FF6600', paddingLeft: '3px' }} />
                                        </div>
                                    </Tooltip>
                                </th>
                                <th style={{ width: "8%" }}>
                                    <Tooltip
                                        title='Audit status'
                                        placement="top"
                                    >
                                        <div>
                                            <span style={{ cursor: 'pointer' }} onClick={openAuditLink} >Audited</span><QuestionCircleOutlined style={{ color: '#FF6600', paddingLeft: '3px' }} />
                                        </div>
                                    </Tooltip>
                                </th>
                                <th style={{ width: "20%" }}>
                                    <Tooltip
                                        title='Wallet Balance'
                                        placement="top"
                                    >
                                        <div>
                                            <span>Available to deposit</span><QuestionCircleOutlined style={{ color: '#FF6600', paddingLeft: '3px' }} />
                                        </div>
                                    </Tooltip>
                                </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentAssets.map((item: any, i: number) => (
                                    <Vault
                                        key={i}
                                        asset={item}
                                        contract={item.protocolAddress}
                                        network={item.network}
                                        abi={item.protocolAbi}
                                        assetIcon={item.logo}
                                        protocol={item.protocolName}
                                        balance={item.balance}
                                        netAPY={item.apy}
                                        vaultasset={item.tvl}
                                        auditedState={item.auditStatus}
                                        availableDeposite={item.availableFunds}
                                        tokenAddress={item.tokenAddress}
                                        tokenAbi={item.tokenAbi}
                                        link={item.smartContract}
                                        assetName={item.name} />
                                ))
                            }
                        </tbody>
                    </table>

                </Box>

            </BrowserView>
            <MobileView>
                {
                    currentAssets.map((item, index) => (
                        <VaultMobile
                            key={index}
                            asset={item}
                            protocol={item.protocolName}
                            network={item.network}
                            abi={item.protocolAbi}
                            contract={item.protocolAddress}
                            tokenAbi={item.tokenAbi}
                            tokenAddress={item.tokenAddress}
                            assetIcon={item.logo}
                            assetName={item.name}
                            balance={item.balance}
                            netAPY={item.apy}
                            vaultasset={item.tvl}
                            availableDeposite={item.availableFunds}
                            className={classes.valutMobile} />
                    ))
                }
            </MobileView>


            {lender === 'xVault' && <p style={{ color: "#FF6600" }}><InfoCircleOutlined /> You can withdraw your funds from xVault deprecated contract</p>}

        </Box>
    );


}

export default Vaultlist;