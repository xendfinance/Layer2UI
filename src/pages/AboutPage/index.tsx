import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

interface Props {
    connected:any;
    setConnected: any;
    omitted: any;
    setOmitted: any;
}

const useStyles = makeStyles((theme: any) =>
  createStyles({
    root: {
        
    }
  }),
);

const AboutPage: React.FC<Props> = ({ connected, setConnected, omitted, setOmitted }:any) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            About Page
        </div>
    );
}

export default AboutPage;