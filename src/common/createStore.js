import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '@/common/reducers';

export default (initialState = {}, axiosInstant, logger) => {
    const middleware = logger ? applyMiddleware(thunk.withExtraArgument(axiosInstant), logger) :  applyMiddleware(thunk.withExtraArgument(axiosInstant));
    const store = createStore(reducers, initialState, middleware);
    return store;
};
