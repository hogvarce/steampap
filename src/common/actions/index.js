import axios from 'axios';
import { hasIn } from 'lodash';

export const steamkey = '7D5F2FA02FF09ACA687DE979BE355B30';

export const FETCH_USERS = 'fetch_users';
export const fetchUsers = () => async (dispatch, getState, api) => {
    const res = await api.get('/users');
    dispatch({
        type: FETCH_USERS,
        payload: res,
    });
};

export const FETCH_CURRENT_USER = 'fetch_current_user';
export const fetchCurrentUser = () => async (dispatch, getState, api) => {
    const res = await api.get('/current_user');
    dispatch({
        type: FETCH_CURRENT_USER,
        payload: res,
    });
};

export const FETCH_ADMINS = 'fetch_admins';
export const fetchAdmins = () => async (dispatch, getState, api) => {
    const res = await api.get('/admins');
    dispatch({
        type: FETCH_ADMINS,
        payload: res,
    });
};

export const FETCH_CURRENT_GAME = 'fetch_current_game';
export const fetchCurrentGame = (appid) => async (dispatch) => {
    const res = await axios.get(`http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=${steamkey}&appid=${appid}`);
    dispatch({
        type: FETCH_CURRENT_GAME,
        payload: res,
    });
};

export const FETCH_GAMES = 'fetch_games';
export const fetchGames = () => async (dispatch) => {
    const steamids = [
        '76561198061514868', '76561197960434622', '76561197960498879',
    ];
    const multiplayer = await axios.get(`http://steamspy.com/api.php?request=tag&tag=Multiplayer`);
    const requests = await steamids.map(steamid => axios.get(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamkey}&steamid=${steamid}&format=json`));
    await Promise.all(requests).then((results) => {
        const res = composeGames(results, multiplayer);
        dispatch({
            type: FETCH_GAMES,
            payload: { data: res },
        });
    });
};

export function composeGames(responses, multiplayer) {
    return responses.reduce((result, res) => {
        return [...result, ...filterMulteplayer(res.data.response.games, multiplayer.data)];
    }, []);
}

function filterMulteplayer(games, multiplayer) {
    const result = [];
    games.forEach((game) => {
        if (multiplayer[game.appid])
            result.push(multiplayer[game.appid]);
    });
    return result;
}
