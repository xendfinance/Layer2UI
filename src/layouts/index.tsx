import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '@material-ui/core';
import Topbar from './Topbar';
import Footer from './Footer';

interface Props {
    light: boolean,
    setTheme: any,
    connected: boolean,
    // onConnect: any,
    children: any;
}

const Layout: React.FC<Props> = ({ children, light, ...rest }: any) => {
    return (
        <Container>
            <Topbar light={light} {...rest} />
            {children}
            <Footer light={light} {...rest} />
        </Container>
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired
}

export default Layout;