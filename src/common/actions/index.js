import axios from 'axios';

export const FETCH_CURRENT_GAME = 'fetch_current_game';
export const fetchCurrentGame = (appid = 220) => async (dispatch, getState, api) => {
    const res = await api.get(`/ISteamUserStats/GetSchemaForGame/v2/?key=${steamkey}&appid=${appid}`);
    dispatch({
        type: FETCH_CURRENT_GAME,
        payload: res,
    });
};

export const FETCH_GAMES = 'fetch_games';
export const GET_REQUEST_IDS = 'get_ids';
export const fetchGames = (steamids) => async (dispatch, getState, api) => {
    // const steamids = [
    //     '76561198061514868', '76561197960434622', '76561197960498879',
    // ];
    dispatch({
        type: GET_REQUEST_IDS,
        payload: { data: steamids },
    });
    if (!steamids) {
        dispatch({
            type: FETCH_GAMES,
            payload: { data: [] },
        });
    }
    let multiplayer = { data: [] };
    try {
        multiplayer = await axios.get(`http://localhost:8080/steamspy`);
    } catch (e) {
        console.log(e);
    }
    const requests = await steamids.map(steamid => api.get(`http://localhost:8080/steampowered/?steamid=${steamid}`));
    await Promise.all(requests).then((results) => {
        const res = composeGames(results, multiplayer);
        dispatch({
            type: FETCH_GAMES,
            payload: { data: res },
        });
    }).catch(() => {
        dispatch({
            type: FETCH_GAMES,
            payload: { data: [] },
        });
    });
};

export function composeGames(responses, multiplayer) {
    return responses.reduce((result, res) => {
        return [...result, ...filterMulteplayer(res.data.response.games, multiplayer.data)];
    }, []);
}

function filterMulteplayer(games = [], multiplayer = {}) {
    const result = [];
    games.forEach((game) => {
        if (multiplayer[game.appid])
            result.push(multiplayer[game.appid]);
    });
    return result;
}
