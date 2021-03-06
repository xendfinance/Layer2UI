import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import _const from '../../../methods/_const';
import assets from '../../../methods/assets';
import { hydrateTvl } from '../../../methods/hydrate';
import commas from '../../../methods/utils/commas';


interface Props {
    connected: any;
    chainId: any;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: 37,
            marginBottom: 32,
            [theme.breakpoints.down("xs")]: {
                marginTop: 15,
                marginBottom: 12,
            }
        },
        content: {
            marginTop: 20,
            paddingRight: 30,
            [theme.breakpoints.down("xs")]: {
                paddingRight: 0,
            }
        },
        title: {
            fontWeight: 700,
            fontSize: 24,
            color: theme.palette.text.primary,
            [theme.breakpoints.down("xs")]: {
                fontSize: 18,
            }
        },
        description: {
            marginTop: 12,
            fontWeight: 500,
            fontSize: 13,
            color: theme.palette.text.primary,
            [theme.breakpoints.down("xs")]: {
                fontSize: 12,
            }
        },
        asset: {
            marginTop: 20,
            padding: 25,
            borderRadius: 6,
            background: theme.palette.background.paper
        },
        assetTitle: {
            fontWeight: 700,
            fontSize: 17,
            color: theme.palette.text.secondary,
        },
        assetValue: {
            marginTop: 10,
            fontWeight: 700,
            fontSize: 24,
            color: theme.palette.text.primary
        }
    }),
);

const Header: React.FC<Props> = () => {
    const classes = useStyles();

    const [loading, setloading] = useState(false);

    const [networkTVL, setTVL] = useState('0');

    const { chainId, lender, hydrateSwitch } = useSelector((store: any) => store.DashboardReducer);


    useEffect(() => {
        getTVL();
    }, [chainId, lender, hydrateSwitch])


    const getTVL = async () => {
        try {
            setloading(true)
            let tvls: any[] = []
            // let protocolTvl: any[] = [];
            const protocolAssets = assets.filter(x => x.network === Number(chainId) && x.protocolName === lender);
            for (let i = 0; i < protocolAssets.length; i++) {
                let asset = protocolAssets[i];

                let tvl = await hydrateTvl({
                    network: asset.network,
                    abi: asset.protocolAbi,
                    address: asset.protocolAddress,
                    protocol: asset.protocolName,
                    tokenName: asset.name
                });

                tvls.push(tvl)


            }

            let totalTvl = tvls.reduce((a, b) => a + Number(b), 0);
            setTVL(totalTvl)

            setloading(false)

        } catch (e) {
            console.error(e);
            setloading(false)
        }
    }



    const activeNetwork = () => {

        if (chainId == 56) return <>({lender} on BSC)</>
        if (chainId == 137) return <>({lender} on Polygon)</>
        return null
    }


    return (
        <Grid className={classes.root} container>
            <Grid className={classes.content} item xs={12} sm={7}>
                <Box className={classes.title}>
                    Xend Finance Layer 2 DeFi protocol
                </Box>
                <Box className={classes.description}>
                    Xend Finance has composed multiple Layer 1 DeFi protocols across different
                    blockchains to provide better yields, as opposed to using Layer 1 DeFi yield
                    platforms individually.
                </Box>
            </Grid>
            <Grid className={classes.asset} item xs={12} sm={5}>
                <Box
                    className={classes.assetTitle}>TVL {activeNetwork()} {loading && <i className="fa fa-spinner fa-spin" style={{ color: "#edecec", marginLeft: 10 }}></i>}</Box>

                <Box className={classes.assetValue}>${commas(networkTVL)}</Box>
            </Grid>
        </Grid>
    );
}

export default Header;