import React, {useState} from 'react';
import { StylesProvider, MuiThemeProvider, ThemeProvider } from '@material-ui/core/styles';
import { themeLight, themeDark } from './theme';
import XendFianance from './XendFianance';

function App() {

  const [light, setTheme] = useState(false);
  const [connected, setConnected] = useState(false);
  const [omitted, setOmitted] = useState(false);

  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={light ? themeLight : themeDark}>
          <ThemeProvider theme={light ? themeLight : themeDark}>
              <XendFianance light={light} setTheme={setTheme} connected={connected} setConnected={setConnected} omitted={omitted} setOmitted={setOmitted}/>
          </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
}
export default App;
