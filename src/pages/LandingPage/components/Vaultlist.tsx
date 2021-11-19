import React, { useEffect, useState } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Tooltip from "@material-ui/core/Tooltip";
import Vault from './Vault';
import VaultMobile from './VaultMobile';
import vault1 from './../../../assets/icons/USDTether.svg';
import vault2 from './../../../assets/icons/BUSD1.svg';

import vault3 from './../../../assets/icons/USDC.svg';
import vault4 from './../../../assets/images/bnb.svg';
import vaultWBTC from './../../../assets/icons/WBTC.svg';
import vaultAAVE from './../../../assets/icons/AAVE.svg';
import { BrowserView, MobileView } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import assets from '../../../methods/assets';

interface Props {
    connected: any;
    chainId: any
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

const Vaultlist: React.FC<Props> = ({ connected }: any) => {
    const classes = useStyles();

    const { chainId, lender, address } = useSelector((store: any) => store.DashboardReducer);

    const [busdapy_xvault, setBusdAPYXVault] = useState('');
    const [USDCapy_xvault, setUSDCAPYXVault] = useState('');
    const [USDTapy_xvault, setUSDTAPYXVault] = useState('');
    const [USDTTVL_xvault, setTVLUSDTXVault] = useState('');
    const [BUSDTVL_xvault, setTVLBUSDXVault] = useState('');
    const [USDCTVL_xvault, setTVLUSDCXVault] = useState('');

    //matic

    const [USDCapy_xauto, setUSDCAPYXAuto] = useState('');
    const [USDTapy_xauto, setUSDTAPYXAuto] = useState('');
    const [AAVEapy_xauto, setAAVEAPYXAuto] = useState('');
    const [WBTCapy_xauto, setWBTCAPYXAuto] = useState('');

    const [USDTTVL_xauto, setTVLUSDTXAuto] = useState('');
    const [USDCTVL_xauto, setTVLUSDCXAuto] = useState('');
    const [AAVETVL_xauto, setTVLAAVEXAuto] = useState('');
    const [WBTCTVL_xauto, setTVLWBTCXAuto] = useState('');

    const [list, setList] = useState([]);


    const [currentAssets, setcurrentAssets] = useState<Array<any>>([])



    useEffect(() => {

        console.log(chainId, lender)
        if (chainId && lender) {
            const x = assets.filter(item => item.network === Number(chainId) && item.protocolName === lender)

            setcurrentAssets(x);
        }


        // when network or protocolname changes
    }, [lender, chainId])





    const [load, setLoading] = useState(false);




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
                            {/* {

                                list.map((item, index) => (

                                    <Vault
                                        key={index.toString()}
                                        contract={item.contractAddress}
                                        network={item.network}
                                        abi={item.abi}
                                        assetIcon={item.assetIcon}
                                        assetName={item.assetName}
                                        protocol={item.fees}
                                        balance={item.balance}
                                        netAPY={item.netAPY}
                                        vaultasset={item.vaultasset}
                                        auditedState={item.auditedState}
                                        availableDeposite={item.availableDeposit}
                                        tokenAddress={item.tokenAddress}
                                        tokenAbi={item.tokenAbi}
                                    />
                                ))
                            } */}
                            {
                                currentAssets.map((item: any, i: number) => (
                                    <Vault
                                        key={i}
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

                {
                    load &&
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                        <i className="fa fa-spinner fa-spin" style={{ color: "#edecec" }}></i>
                    </div>
                }

            </BrowserView>
            <MobileView>
                {
                    currentAssets.map((item, index) => (
                        <VaultMobile
                            key={index}
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

                {/* {
                    list.map((item, index) => (
                        <VaultMobile
                            className={classes.valutMobile}
                            key={index.toString()}
                            assetIcon={item.assetIcon}
                            assetName={item.assetName}
                            fees={item.fees}
                            balance={item.balance}
                            netAPY={item.netAPY}
                            vaultasset={item.vaultasset}
                            auditedState={item.auditedState}
                            availableDeposite={item.availableDeposit}
                        />
                    ))
                } */}
                {
                    load &&
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                        <i className="fa fa-spinner fa-spin" style={{ color: "#edecec" }}></i>
                    </div>
                }
            </MobileView>
        </Box>
    );


}

export default Vaultlist;