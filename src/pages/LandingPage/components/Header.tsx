import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';

interface Props {
    connected:any;
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

const Header: React.FC<Props> = ({ connected }:any) => {
    const classes = useStyles();

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
                <Box className={classes.assetTitle}>Total Vault Asset</Box>
                <Box className={classes.assetValue}>300,000,000</Box>
            </Grid>
        </Grid>
    );
}

export default Header;