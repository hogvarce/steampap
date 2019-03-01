import React from 'react';
import { renderToString } from "react-dom/server";
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import Routes from '@/common/routes';

const renderer = (req, store) => {
    const content = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.path} context={{}}>
                <div>{renderRoutes(Routes)}</div>
            </StaticRouter>
        </Provider>
    );
    const state = serialize(store.getState());
    return `
        <html>
            <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
            </head>
            <body>
                <div id="root">${content}</div>
                <script>
                    window.__INIT_STATE__= ${state};      
                </script>
                <script src="bundle.js"></script>
            </body>
        </html>
    `;
};

export default renderer;
