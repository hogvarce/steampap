import express from 'express';
import axios from 'axios';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';
import createStore from '@/common/createStore';
import Routes from '@/common/routes';
import renderer from './helpers/renderer';
import steam from './helpers/steamapi';

const app = express();
const port = process.env.PORT || 8080;
const apiUrl = 'http://api.steampowered.com';

app.use('/steamapi', proxy(apiUrl, {
    proxyReqOptDecorator(opts) {
        opts.headers['x-forwarded-host'] = `localhost:${port}`;
        return opts;
    }
}));

app.use(express.static('public'));

app.get('/api', async (req, res) => {
    const result = await steam(2100);
    res.send(result);
});

app.get('*', (req, res) => {
    const axiosIstant = axios.create({
        baseURL: apiUrl,
        headers: { cookie: req.get('cookie') || '' },
    });
    const ids = req.query.ids ? req.query.ids.split(',').map(id => id.trim()) : null;
    const store = createStore({}, axiosIstant);
    const promises = matchRoutes(Routes, req.path)
        .map(({ route }) => route.loadData ? route.loadData(store, ids) : null)
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
