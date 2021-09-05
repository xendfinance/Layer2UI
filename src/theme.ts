import { createTheme } from '@material-ui/core/styles';

declare module '@material-ui/core/styles/createPalette' {
    interface PaletteOptions {
        themeswitch: PaletteOptions['primary'];
        button: PaletteOptions['primary'];
        dropdown: PaletteOptions['primary'];
    }
}

export const themeLight = createTheme({
    palette: {
        // standard
        background: {
            paper: '#c1c1c1',
            default: '#e1e1e1',
        },

        secondary: {
            light: 'red',
            main: 'rgba(255, 255, 255, 0.14)',
            dark: '#1C1D21',
            contrastText: '#222222'
        },

        text: {
            primary: '#53596e',
            secondary: '#53596e',
            disabled: 'rgba(0, 0, 0, 0.38)',
            hint: 'rgba(0, 0, 0, 0.38)'
        },

        // customized
        themeswitch: {
            main: '#E4EEF1'
        },

        button: { 
            light: '#FFFFFF',
            main: '#C1C1C1', 
            dark: 'red',
            contrastText: '#FFFFFF'
        },

        dropdown: {
            light: '#FFFFFF', // light bg
            main: '#C1C1C1', // main bg
            dark: '#818181', // dark bg
            contrastText: '#FFFFFF', //text
        },
    }
});

export const themeDark = createTheme({
    palette: {
        // standard
        background: {
            paper: 'rgba(255,255,255,0.05)',
            default: '#0F1020',
        },

        secondary: {
            light: '#FFFFFF',
            main: 'rgba(255, 255, 255, 0.14)',
            dark: '#1C1D21',
            contrastText: '#FFFFFF'
        },

        text: {
            primary: '#ffffff', // white
            secondary: '#53596e', // gray
            disabled: 'rgba(0, 0, 0, 0.38)',
            hint: 'rgba(0, 0, 0, 0.38)'
        },

        // customized
        themeswitch: { 
            main: 'linear-gradient(280.47deg, #2042B8 -141.14%, #FF6600 207.56%)' 
        },
        
        button: { 
            light: '#FFFFFF', // light bg
            main: 'rgba(255, 255, 255, 0.14)',  // main bg
            dark: '#8889A5', // dark bg
            contrastText: '#FFFFFF', // text
        },

        dropdown: {
            light: '#FFFFFF', // light bg
            main: 'rgba(255, 255, 255, 0.14)', // main bg
            dark: '#1C1D21', // dark bg
            contrastText: '#FFFFFF', // text
        },
    }
});