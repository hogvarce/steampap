import React from 'react';
import { renderRoutes } from 'react-router-config';
import Header from '@/common/components/Header';
import { fetchGames } from '@/common/actions';

const App = ({ route }) => (
    <div>
        <Header />
        {renderRoutes(route.routes)}
    </div>
);

const loadData = ({ dispatch }, params) => dispatch(fetchGames(params));

export default {
    component: App,
    loadData,
};
