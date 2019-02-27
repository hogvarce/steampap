import React from 'react';
import App from '@/common/components/App';
import Userlist from "@/common/components/Userlist";

export default [
    {
        path: '/',
        component: App,
        exact: true,
    },
    {
        ...Userlist,
        path: '/users',
    },
];
