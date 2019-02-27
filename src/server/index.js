import express from 'express';
import { matchRoutes } from 'react-router-config';
import createStore from '@/common/createStore';
import Routes from '@/common/routes';
import renderer from './helpers/renderer';

const app = express();
const port = 8080;

app.use(express.static('public'));

app.get('*', (req, res) => {
    const store = createStore();

    const promises = matchRoutes(Routes, req.path).map(({ route }) => route.loadData ? route.loadData(store) : null);

    Promise.all(promises).then(() => {
        res.send(renderer(req, store));
    });
});

app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});
