import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import reduxStore from './methods/redux';

let store = undefined;
reduxStore().then(value => {
    store = value;


    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root'),
    );

})

