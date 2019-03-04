import React from 'react';

export const ErrorPage = ({ staticContext = {} }) => {
    staticContext.notFound = true;
    return (
        <h1>
            Oooops, not found anything! Sorry.
        </h1>
    );
}

export default {
    component: ErrorPage,
};
