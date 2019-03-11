import { combineReducers } from 'redux';
import games from './games';
import steamids from './steamids';

export default combineReducers({
    games,
    steamids,
});
