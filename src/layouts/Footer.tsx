import React, { useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import ThemeSwitch from '../components/ThemeSwitch';

import Button from '../components/Button';
import Vector from '../assets/images/layout/Vector.png';
import closeIcon from '../assets/images/layout/close.png';
import {isMobile} from 'react-device-detect';

interface Props {
    connected: any;
    setConnected: any;
    light: boolean;
    setTheme: any;
    onConnect: any;
    address?: any;
}

const useStyles = makeStyles((theme: any) =>
  createStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.background.default,
        paddingTop: 23,
        paddingBottom: 23,
        color: theme.palette.text.primary
    },
    centerFlex: {
        display: 'flex',
        alignItems: 'center',
    },

    copyRight: {
        display: 'block',
        fontWeight: 500,
        fontSize: 12,
        color: theme.palette.text.primary,
        [theme.breakpoints.down("xs")]: {
            display: 'none',
            marginLeft: 0,
        }
    },
    copyRightTextForMobile: {
        color: theme.palette.text.primary,
        textAlign: 'center', 
        marginTop: 8, 
        fontSize: 10
    },
    externalLinks: {
        display: 'flex',
        fontWeight: 500,
        fontSize: 14,
        "&>a": {
            marginLeft: 10,
            textDecoration: 'none',
            color: theme.palette.text.primary,
        },
        [theme.breakpoints.down("xs")]: {
            display: 'none',
            marginLeft: 0,
        }
    },
    connectButton: {
        display: 'none',
        [theme.breakpoints.down("xs")]: {
            display: 'block',
            marginLeft: 0,
        }
    },
    themeButton: {
        marginLeft: 20,
    },
    popupMenuForDesktop: {
        position: 'absolute',
        top: -163,
        left: 'calc(-100% + 22px)',
        zIndex: 99,
        width: 114,
        height: 124,
        padding: 18,
        backgroundColor: theme.palette.dropdown.dark,
        boxShadow: '0px 21px 18px rgba(0, 0, 0, 0.17)',
        borderRadius: 16,
        fontSize: 13,
        fontWeight: 700
    },
    popupMenuForMobile: {
        position: 'absolute',
        top: -387,
        left: -200,
        zIndex: 99,
        width: 250,
        height: 348,
        padding: 18,
        backgroundColor: theme.palette.dropdown.dark,
        boxShadow: '0px 21px 18px rgba(0, 0, 0, 0.17)',
        borderRadius: 16,
        fontSize: 18,
        fontWeight: 700
    },
    themeSwitch: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    themeSwitchForMobile: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 0
    },
    closeButton: {
        position: 'absolute',
        right: 15,
        top: 15,
        backgroundColor: theme.palette.secondary.main,
        borderRadius: '50%',
        width: 30,
        height: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    moreMenuTitle: {
        fontWeight: 700,
        fontSize: 24,
        marginBottom: 30
    },
    externalPopLinks: {
        fontWeight: 500,
        fontSize: 16,
        "& div":{
            marginTop: 15,
            marginLeft: 15,
            marginRight: 15
        }
    },
    versionText: {
        textAlign: 'center', 
        marginTop: 30, 
        color: theme.palette.text.secondary,
    }
  }),
);

const Footer: React.FC<Props> = ({ connected, light, setTheme, onConnect }: any) => {
    const classes = useStyles();
    const [isOpenTheme, setOpenTheme] = useState(false);

    return (
        <>
            <Box className={classes.root}>
                <Box className={classes.centerFlex}>
                    <Box className={classes.copyRight}>
                        Copyright © Xend Finance 2021. All rights reserved.
                    </Box>
                    <Button className={classes.connectButton} variant='primary' title='Connect Wallet' btnIcon={Vector} onClick={() => onConnect()}/>
                </Box>
                <Box className={classes.centerFlex}>
                    <Box className={classes.externalLinks}>
                        <a href="/">About</a>
                        <a href="/">Docs</a>
                        <a href="/">Github</a>
                    </Box>
                    <Box position='relative'>
                        
             
                        
                        {isOpenTheme && isMobile &&
                            <Box className={classes.popupMenuForMobile} position='absolute' bottom='50px' left='50%'>
                                <Box>
                                    <Box className={classes.closeButton} onClick={()=>setOpenTheme(false)}>
                                        <img src={closeIcon} alt='XEND Finance' />
                                    </Box>
                                    <Box className={classes.moreMenuTitle}>More Menu</Box>
                                    <Box className={classes.externalPopLinks}>
                                        <Box>About</Box>
                                        <Box>Docs</Box>
                                        <Box>Github</Box>                                       
                                    </Box>
                                    <Box className={classes.versionText} style={{fontSize: 10}}>Version 1.9</Box>
                                    <Box className={classes.copyRightTextForMobile}>
                                        Copyright © Xend Finance 2021. All rights reserved.
                                    </Box>
                                </Box>
                            </Box>
                        }
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default Footer;