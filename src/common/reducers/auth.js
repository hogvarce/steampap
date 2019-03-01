import { FETCH_CURRENT_USER } from "../actions";

export default function(state = null, { payload, type }) {
    switch(type) {
        case FETCH_CURRENT_USER:
            return payload.data || false;
        default:
            return state;
    }
}
