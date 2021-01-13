import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, AWARD_ERROR, CLEAR_PROFILE } from "../actions/types";

const initialState = {
    profile: null,
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state, // current state (immutable)
                profile: payload,
                loading:false
            }
        case AWARD_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
                profile: null
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                loading: false
            }
        default:
            return state;
    }
}