/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Layout from './layouts';
import { Box } from '@material-ui/core';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';

import { recreateWeb3 } from './utils/useAuth';
import { useDispatch } from 'react-redux';




const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      width: '100%',
      backgroundColor: theme.palette.background.default,
      fontFamily: 'Fira Sans',
      minHeight: '100vh'
    },
  }),
);

const XendFianance = ({ light, setTheme, connected, setConnected, omitted, setOmitted }: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(recreateWeb3());

  }, [])



  return (
    <Box className={classes.root}>
      <Router>
        <Switch>
          <Layout light={light} setTheme={setTheme} connected={connected}>
            <Route exact path='/'>
              <LandingPage connected={connected} />
            </Route>
            <Route exact path='/about'>
              <AboutPage connected={connected} />
            </Route>
          </Layout>
        </Switch>
      </Router>
    </Box>
  );
}
export default XendFianance;


