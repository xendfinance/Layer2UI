import React, { ElementType } from 'react';
import { Box } from '@material-ui/core';
import styled from 'styled-components';
import { useTheme } from '@material-ui/core/styles';
import { ButtonProps } from './types';

const Button = <E extends ElementType = 'button'>(props: ButtonProps<E>): JSX.Element => {
    const { title, variant, fontSize, fontWeight, disabled, btnIcon, downArrow, onClick, className } = props;
    const theme = useTheme();
    return (
        <Box className={className}>
            <StyledContainer
                variant={variant}
                fontSize={fontSize}
                fontWeight={fontWeight}
                theme={theme}
                disabled={disabled}
                onClick={() => onClick && onClick()}
            >
                {btnIcon && <img src={btnIcon} alt='' />}
                <span>{title}</span>
                {downArrow && <span>&gt;</span>}
            </StyledContainer>
        </Box>
    );
}

const StyledContainer = styled.button<{ variant:string; theme:any; fontSize:any; fontWeight:any; disabled:any; }>`
    display: flex;
    flex-direction: center;
    justify-content: center;
    align-items: center;
    font-family: Fira Sans;
    font-size: ${({ fontSize }) => fontSize ? fontSize : '12px'};
    font-weight: ${({ fontWeight }) => fontWeight ? fontWeight : '100'};
    letter-spacing: 0.6px;
    border-radius: 54px;
    padding: 10px 25px;
    border: transparent;
    height: 100%;
    >img {
        margin-right: 10px;
    }
    >span {
        font-weight: 700;
    }
    background: ${({ theme, variant, disabled }) => {
        if(disabled) return theme.palette.button.contrastText;
        else {
            if(variant === 'primary') return theme.palette.button.main;
            if(variant === 'secondary') return theme.palette.button.light;
            return 'none';
        }
    }};
    color: ${({ theme, variant, disabled }) => {
        if(disabled) return theme.palette.button.dark;
        else {
            if(variant === 'primary') return theme.palette.button.contrastText;
            if(variant === 'secondary') return '#FF6600';
        }
    }};
    outline: none;
    cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
`;

Button.propTypes = {
    // children: PropTypes.node.isRequired,
}

export default Button;