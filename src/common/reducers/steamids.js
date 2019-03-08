import { GET_REQUEST_IDS } from '@/common/actions';

export default (state = [], action) => {
    switch (action.type) {
        case GET_REQUEST_IDS:
            return action.payload.data;
        default:
            return state;
    }
};