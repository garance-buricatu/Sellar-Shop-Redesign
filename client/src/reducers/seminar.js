import { ADD_SEMINAR, SEMINAR_ERROR, GET_SEMINARS, DELETE_SEMINAR, CLEAR_SEMINAR } from '../actions/types'

const initialState = {
    seminar: null,
    seminars: [],
    loading: true,
    error: {}
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type){
        case ADD_SEMINAR: 
            return {
                ...state,
                seminar: payload,
                loading: false
            }
        case SEMINAR_ERROR:
            return {
                ...state,
                seminar: null,
                loading: false,
                error: payload
            }
        case CLEAR_SEMINAR:
            return {
                ...state,
                seminar: null,
                loading: false
            }
        case GET_SEMINARS:
            return {
                ...state,
                seminars: payload,
                loading: false
            }
        case DELETE_SEMINAR:
        default:
            return state;
    }
}
