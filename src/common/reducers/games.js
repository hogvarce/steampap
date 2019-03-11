import { FETCH_GAMES } from '@/common/actions';

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_GAMES:
            return action.payload.data;
        default:
            return state;
    }
};
