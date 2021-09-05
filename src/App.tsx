import React, {useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './layouts';

import LandingPage  from './pages/LandingPage';
import AboutPage from './pages/AboutPage';

function App() {
  const [light, setTheme] = useState(false);
  const [connected, setConnected] = useState(false);
  const [omitted, setOmitted] = useState(false);

  return (
    <Router>
      <Switch>
        <Layout light={light} connected={connected} setConnected={setConnected} omitted={omitted} setOmitted={setOmitted} setTheme={setTheme}>
          <Route exact path='/'>
            <LandingPage connected={connected} setConnected={setConnected} omitted={omitted} setOmitted={setOmitted}/>
          </Route>
          <Route exact path='/about'>
            <AboutPage connected={connected} setConnected={setConnected} omitted={omitted} setOmitted={setOmitted}/>
          </Route>
        </Layout>
      </Switch>
    </Router>
  );
}

export default App;
