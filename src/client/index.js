import React from 'react';
import axios from 'axios';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { createLogger } from 'redux-logger';
import Routes from '@/common/routes';
import createStore from '@/common/createStore';

const initialState = window.__INIT_STATE__ || {};
delete window.__INIT_STATE__;

const axiosIstant = axios.create({
    baseURL: '/steamapi',
});

const store = createStore(initialState, axiosIstant, createLogger());

render(
    <Provider store={store}>
        <BrowserRouter>
            <div>{renderRoutes(Routes)}</div>
        </BrowserRouter>
    </Provider>,
    document.querySelector('#root')
);
