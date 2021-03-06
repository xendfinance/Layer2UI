import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Vaultlist from './components/Vaultlist';
import Header from './components/Header';
import { useDispatch, useSelector } from 'react-redux';
import getXVaultAPI from '../../methods/redux/actions/get-apy-xvault';
import _const from '../../methods/_const';
import getAllBalances from '../../methods/contracts/getAllBalances';
import getHighestAPY from '../../methods/redux/actions/get-highest-apy';

interface Props {
    connected: any;
}

const useStyles = makeStyles((theme: any) =>
    createStyles({
        root: {

            minHeight: 'calc(100vh - 203px)'
        }
    }),
);

const LandingPage: React.FC<Props> = ({ connected }: any) => {
    const classes = useStyles();


    const currentChainId = useSelector((store: any) => store.DashboardReducer.chainId);
    const lender = useSelector((store: any) => store.DashboardReducer.lender);
    const dispatch = useDispatch()

    const setLoading = (value: boolean) => {
        dispatch({
            type: _const.LOADING,
            payload: value
        })
    }

    const buildPreData = async () => {
        //Build Pre Data
        dispatch(getHighestAPY());

        if (Number(currentChainId) === 56) {

            const apyObj = await getXVaultAPI(56, lender, setLoading);
            dispatch({
                type: _const.DashboardGrid,
                payload: { apyObj }
            });
        }

        if (Number(currentChainId) === 137) {

            const apyObjMatic = await getXVaultAPI(137, lender, setLoading);
            dispatch({
                type: _const.DashboardGridMatic,
                payload: { apyObjMatic }
            });
        }


        // if (address) {
        //     dispatch(getAllBalances(address, currentChainId))
        // }

    }


    useEffect(() => {
        const initPreData = async () => {
            await buildPreData()
        };

        initPreData();

    }, [currentChainId])


    return (
        <div className={classes.root}>
            <Header connected={connected} chainId={currentChainId} />
            <Vaultlist />
        </div>
    );
}

export default LandingPage;