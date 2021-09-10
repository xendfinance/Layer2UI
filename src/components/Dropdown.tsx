import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import downArrowIcon from '../assets/images/layout/down-arrow.png';

interface Props {
    className?: any;
    dwidth?: number;
    values: any;
    btnIcons?: any;
    selected: any;
}

const useStyles = makeStyles((theme: any) =>
  createStyles({
    root: {
        cursor: 'pointer',
        position: 'relative',
        height: 16,
        borderRadius: 22,
        paddingLeft: 19,
        paddingRight: 17,
        paddingTop: 12,
        paddingBottom: 12,
        background: theme.palette.dropdown.main,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        color: theme.palette.dropdown.contrastText,
        fontSize: 13,
        fontWeight: 700,
        marginLeft: 15,
    },
    title: {
        marginLeft: 11,
        marginRight: 11
    },
    downArrowIcon: {
        width: 7.2,
        height: 3.6
    },
    dropMenu: {
        position: 'absolute',
        width: 'calc(100% - 40px)',
        textAlign: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 7,
        background: theme.palette.dropdown.dark,
        top: 'calc(100% + 2px)',
    },
    dropMenuItem: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 12,
        marginBottom: 12,
        "& img": {
            marginRight: 9
        }
    }
  }),
);

const Dropdown: React.FC<Props> = (props: any) : JSX.Element => {
    const { className, values, btnIcons, selected } = props;
    const classes = useStyles();
    const [show, setShow] = useState(false);
    const [index, setIndex] = useState(selected);
    const handleShow = () => {
        setShow(!show);
    }
    const handleSelectValue = (i:any) => {
        setIndex(i);
    }

    useEffect(()=>{
        setIndex(selected);
    }, [selected])

    return (
        <>
            <Box className={`${classes.root} ${className}`} onClick={() => handleShow()}>
                {btnIcons && <img src={btnIcons[index]} alt='' /> }
                <span className={classes.title}>{values[index]}</span>
                <img className={classes.downArrowIcon} src={downArrowIcon} alt=''/>
                {show &&
                    <Box className={classes.dropMenu} left='0px' bgcolor='dropdown.main' zIndex='2' borderRadius='16px'>
                        {values.map((each:any, i:number) =>(
                                <Box className={classes.dropMenuItem} key={i.toString()}>
                                    {btnIcons && <img src={btnIcons[i]} onClick={() => handleSelectValue(i)} alt='' /> }
                                    <Box onClick={() => handleSelectValue(i)}>{each}</Box>
                                </Box>
                            )
                        )}
                    </Box>
                }
            </Box>
        </>
    );
}

export default Dropdown;