import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Vaultlist from './components/Vaultlist';
import Header from './components/Header';

interface Props {
    connected:any;
    setConnected: any;
    omitted: any;
    setOmitted: any;
}

const useStyles = makeStyles((theme: any) =>
  createStyles({
    root: {
        // backgroundColor: 'red'
    }
  }),
);

const LandingPage: React.FC<Props> = ({ connected, setConnected, omitted, setOmitted }:any) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Header  connected={connected} setConnected={setConnected} omitted={omitted} setOmitted={setOmitted} />
            <Vaultlist connected={connected} setConnected={setConnected} omitted={omitted} setOmitted={setOmitted} />
        </div>
    );
}

export default LandingPage;