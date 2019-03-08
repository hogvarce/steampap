import { combineReducers } from 'redux';
import game from './game';
import games from './games';
import steamids from './steamids';

export default combineReducers({
    game,
    games,
    steamids,
});
