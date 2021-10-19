import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'; 
import reduxStore from 'methods/redux';

let store = undefined;
reduxStore().then(value => {
    store = value;


    ReactDOM.render(
        <React.StrictMode>
            <Provider store={store}>
                        <App />
            </Provider>
        </React.StrictMode>,
        document.getElementById('root'),
    );

})

