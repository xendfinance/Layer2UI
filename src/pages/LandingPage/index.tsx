import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Vaultlist from './components/Vaultlist';
import Header from './components/Header';
import { useDispatch, useSelector } from 'react-redux';
import getXVaultAPI from 'methods/redux/actions/get-apy-xvault';
import _const from 'methods/_const';
import getAllBalances from 'methods/contracts/getAllBalances';

interface Props {
    connected: any;  
}

const useStyles = makeStyles((theme: any) =>
  createStyles({
    root: {
        // backgroundColor: 'red'
        minHeight: 'calc(100vh - 203px)'
    }
  }),
);

const LandingPage: React.FC<Props> = ({ connected }:any) => {
    const classes = useStyles();
   
 
    const currentChainId = useSelector((store: any) => store.DashboardReducer.networkConnect);
    const wca = useSelector((store: any) => store.DashboardReducer.wca);
    const dispatch = useDispatch()


    const buildPreData = async () => {
        //Build Pre Data
        
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

         if(wca.address){
            dispatch(getAllBalances(wca.address,currentChainId))
         }
     }
 
    
    useEffect(()=>{
        const initPreData = async () => {
             await buildPreData()
            };
                
            initPreData();   
       
     }, [currentChainId])
     

    return (
        <div className={classes.root}>
            <Header  connected={connected} chainId={currentChainId}/>
            <Vaultlist connected={connected} chainId={currentChainId}  />
        </div>
    );
}

export default LandingPage;