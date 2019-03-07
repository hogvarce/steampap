import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from '@/common/reducers';

export default (initialState = {}, axiosInstant) => {
    const store = createStore(reducers, initialState, applyMiddleware(thunk.withExtraArgument(axiosInstant), createLogger()));
    return store;
};
