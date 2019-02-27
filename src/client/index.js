import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import Routes from '@/common/routes';
import createStore from '@/common/createStore';

const initialState = window.__INIT_STATE__ || {};
delete window.__INIT_STATE__;

const store = createStore(initialState);

render(
    <Provider store={store}>
        <BrowserRouter>
            <div>{renderRoutes(Routes)}</div>
        </BrowserRouter>
    </Provider>,
    document.querySelector('#root')
);
