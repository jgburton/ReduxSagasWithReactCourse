import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import axios from 'axios';
import reducers from './redux/reducers';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import rootSaga from './redux/sagas'
import createSagaMiddleware from 'redux-saga';
import 'bootstrap/dist/css/bootstrap.min.css';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://rem-rest-api.herokuapp.com/api";

const SagaMiddleware = createSagaMiddleware()

const store = createStore(reducers, applyMiddleware(SagaMiddleware));

SagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
