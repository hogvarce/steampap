import { FETCH_CURRENT_GAME } from '@/common/actions';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_CURRENT_GAME:
            return action.payload.data;
        default:
            return state;
    }
};
