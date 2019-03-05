import React from 'react';
import { renderRoutes } from 'react-router-config';
import Header from '@/common/components/Header';
import { fetchCurrentUser } from '@/common/actions';

const App = ({ route }) => (
    <div>
        <Header />
        {renderRoutes(route.routes)}
    </div>
);

const loadData = ({ dispatch }) => dispatch(fetchCurrentUser());

export default {
    component: App,
    loadData,
};
