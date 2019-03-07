import express from 'express';
import axios from 'axios';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';
import createStore from '@/common/createStore';
import Routes from '@/common/routes';
import renderer from './helpers/renderer';

const app = express();
const port = process.env.PORT || 8080;
const apiUrl = 'https://react-ssr-api.herokuapp.com';

app.use('/api', proxy(apiUrl, {
    proxyReqOptDecorator(opts) {
        opts.headers['x-forwarded-host'] = `localhost:${port}`;
        return opts;
    }
}));
app.use(express.static('public'));

app.get('*', (req, res) => {
    const axiosIstant = axios.create({
        baseURL: apiUrl,
        headers: { cookie: req.get('cookie') || '' },
    });``
    const store = createStore({}, axiosIstant);
    const promises = matchRoutes(Routes, req.path)
        .map(({ route }) => route.loadData ? route.loadData(store) : null)
        .map((promise) => {
            if (promise) {
                return new Promise((resolve) => {
                    promise.then(resolve).catch(resolve);
                });
            }
            return null;
        });

    Promise.all(promises).then(() => {
        const context = {};
        const content = renderer(req, store, context);

        if (context.url) {
            return res.redirect(301, context.url);
        }

        if (context.notFound) {
            res.status(404);
        }

        res.send(content);
    });
});

app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});
