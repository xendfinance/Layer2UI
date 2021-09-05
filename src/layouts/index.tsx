import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Container, Box } from '@material-ui/core';
import { StylesProvider, MuiThemeProvider, ThemeProvider } from '@material-ui/core/styles';
import styled from 'styled-components';

import Topbar from './Topbar';
import Footer from './Footer';

import { themeLight, themeDark } from '../theme';

interface Props {
    light: boolean,
    setTheme: any,
    connected: boolean,
    setConnected: any,
    omitted: boolean,
    setOmitted: any,
    children: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        position: 'relative',
        width: '100%',
        backgroundColor: theme.palette.background.default,
    },
  }),
);

const Layout: React.FC<Props> = ({ children, light, ...rest }: any) => {
    const classes = useStyles();
    
    return (
        <StylesProvider injectFirst>
            <MuiThemeProvider theme={light ? themeLight : themeDark}>
                <ThemeProvider theme={light ? themeLight : themeDark}>
                    <Box className={classes.root}>
                    <StyledContainer theme={light ? themeLight : themeDark}>
                        <Container>
                            <Topbar light={light} {...rest} />
                            {children}
                            <Footer light={light} {...rest} />
                        </Container>
                    </StyledContainer>
                    </Box>
                </ThemeProvider>
            </MuiThemeProvider>
        </StylesProvider>
    );
}

const StyledContainer = styled(Box)<{ theme:any; }>`
    position: relative;
    width: 100%;
    background-color: ${({ theme }) => theme.palette.background.default};
  * {
        font-family: Fira Sans;
    }
`;

Layout.propTypes = {
    children: PropTypes.node.isRequired
}

export default Layout;