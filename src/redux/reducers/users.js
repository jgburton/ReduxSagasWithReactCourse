import { Types } from '../actions/users';

const INTIIAL_STATE = {
    items: []
};

export default function users(state = INTIIAL_STATE, action) {
    switch (action.type) {
        case Types.GET_USERS_SUCCESS:{
            return {
                item: action.payload.items
            }
        }
        default: {
            return state;
        }
    }
}