import { combineReducers } from 'redux';
import users from './users';
import auth from './auth';
import admins from './admins';
import games from './games';

export default combineReducers({
    users,
    auth,
    admins,
    games,
});
