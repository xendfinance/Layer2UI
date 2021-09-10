import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Vaultlist from './components/Vaultlist';
import Header from './components/Header';

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

    return (
        <div className={classes.root}>
            <Header  connected={connected} />
            <Vaultlist connected={connected} />
        </div>
    );
}

export default LandingPage;