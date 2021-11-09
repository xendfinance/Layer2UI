import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import getXVaultAPI from '../../../methods/redux/actions/get-apy-xvault';
import _const from '../../../methods/_const';


interface Props {
    connected:any;
    chainId:any;    
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

const Header: React.FC<Props> = ({ connected,chainId }:any) => {
    const classes = useStyles();
   
    const [TVLapy_xvault, setTVLAPYXVault] = useState('');
    
    const lendingProtocol = useSelector((store: any) => store.DashboardReducer.lender);
    
    const dispatch = useDispatch()

     
    const buildPreData = async (chainId:any) => {
        //Build Pre Data
         setTVLAPYXVault('Calculating');
         const apyObj = await getXVaultAPI(56);
         dispatch({
             type: _const.DashboardGrid,
             payload: { apyObj }
         });
         
         const apyObjMatic = await getXVaultAPI(137);
         dispatch({
             type: _const.DashboardGridMatic,
             payload: { apyObjMatic }
         });

         if(apyObj && apyObjMatic){
       
            if(chainId == 56){
                if(lendingProtocol == "X Vault" ||lendingProtocol == 'X Vault' ||lendingProtocol.lenderProtocol =='X Vault' || lendingProtocol.lenderProtocol=="X Vault" ){
                const tvlString = apyObj?.TVL;
                if (tvlString){
                    const finalAPY = tvlString; 
                    setTVLAPYXVault(finalAPY);
                }
            }else{
                console.log("apy onj",apyObj);
                const tvlString = apyObj?.TVLXAuto;
                if (tvlString){
                    const finalAPY = tvlString; 
                    setTVLAPYXVault(finalAPY);
                }
            }
            }else{
                const tvlString = apyObjMatic?.TVL;
                if (tvlString){
                    const finalAPY =tvlString; 
                    setTVLAPYXVault(finalAPY);
                }
            }
        }
     }
 
    
    useEffect(()=>{
        const initPreData = async () => {
            if(chainId.ChainId){
                const finalChainId = Number(chainId.ChainId);
                await buildPreData(finalChainId);
                 
            }else{
                const finalChainId = Number(chainId);         
                await buildPreData(finalChainId);
               
            }            
            };
                
            initPreData();   
       
     }, [chainId])

     
    // useEffect(()=>{
    //     const buildDashboardData = async () => {
    //         if(chainId.ChainId){
    //             const finalChainId = Number(chainId.ChainId);
    //             await getxVaultApy(finalChainId);
                 
    //         }else{
    //             const finalChainId = Number(chainId);         
    //            await getxVaultApy(finalChainId);
               
    //         } 
    //       };
        
    //       buildDashboardData();

      
       
    // },)

     
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
                <Box className={classes.assetValue}>{TVLapy_xvault}</Box>
            </Grid>
        </Grid>
    );
}

export default Header;