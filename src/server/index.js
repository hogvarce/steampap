import express from 'express';
import axios from 'axios';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';
import bodyParser from'body-parser';
import createStore from '@/common/createStore';
import Routes from '@/common/routes';
import renderer from './helpers/renderer';

const app = express();
const port = process.env.PORT || 8080;
const apiUrl = 'http://api.steampowered.com';
const steamkey = '7D5F2FA02FF09ACA687DE979BE355B30';

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/steamspy', async (req, res) => {
    const { data } = await axios.get('http://steamspy.com/api.php?request=tag&tag=Multiplayer');
    res.send(data);
});

app.get('/steampowered', async (req, res) => {
    const { steamid } = req.query;
    if (!steamid) {
        res.send({ data: [] });
        return;
    }
    const { data } = await axios.get(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamkey}&steamid=${steamid}&format=json`);
    res.send(data);
});

app.get('*', (req, res) => {
    const baseUrl = req.headers.host;
    const ids = req.query.ids ? req.query.ids.split(',').map(id => id.trim()) : null;
    const store = createStore({}, baseUrl);
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
