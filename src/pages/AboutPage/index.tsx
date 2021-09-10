import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

interface Props {
    connected:any;
}

const useStyles = makeStyles((theme: any) =>
  createStyles({
    root: {
        
    }
  }),
);

const AboutPage: React.FC<Props> = ({ connected }:any) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            About Page
        </div>
    );
}

export default AboutPage;