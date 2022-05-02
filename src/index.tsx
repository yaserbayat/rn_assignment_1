import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import App from 'App';
import {Provider} from "react-redux";
import {PersistGate} from 'redux-persist/integration/react';
import {persist, store} from "./store";

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persist}>
            <Router>
                <App />
            </Router>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);
