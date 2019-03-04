import { FETCH_ADMINS } from '@/common/actions';

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_ADMINS:
            return action.payload.data;
        default:
            return state;
    }
};
