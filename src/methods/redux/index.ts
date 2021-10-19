import { applyMiddleware, createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
// import activity from './reducers/activity';
// import esusu from './reducers/esusu';
// import individual from './reducers/individual';
// import groups from './reducers/groups';
// import apy from './reducers/apy';
// import cooperative from './reducers/cooperative';
import ConnectWalletReducer from './reducers/ConnectWalletReducer';
import DashboardReducer from './reducers/DashboardReducer';
// import xendToken from './reducers/xend-token';
// import leaderboard from './reducers/leaderboard';
//import helper from './reducers/helper';

const reducers = combineReducers({
    // activity,
    // esusu,
    // groups,
    // cooperative,
    // individual,
    // helper,
    // apy,
    // xendToken,
    // leaderboard,
    DashboardReducer,
    ConnectWalletReducer,
});

async function reduxStore() {
    const initstore: any = undefined;

    return createStore(reducers, initstore, composeWithDevTools(applyMiddleware(thunk)));
}

export default reduxStore;
