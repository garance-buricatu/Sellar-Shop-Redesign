import { GET_ARTWORKS, ARTWORK_ERROR, ADD_ARTWORK, DELETE_ARTWORK, CLEAR_ARTWORK, EDIT_ARTWORK, GET_ARTWORK } from '../actions/types'

const initialState = {
    artwork: null,
    artworks: [],
    loading: true,
    error: {}
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type){
        case ADD_ARTWORK:
        case DELETE_ARTWORK:
        case EDIT_ARTWORK:
        case GET_ARTWORK:
            return {
                ...state,
                artwork: payload,
                loading: false
            }
        case GET_ARTWORKS:
            return {
                ...state,
                artworks: payload,
                loading: false
            }
        case ARTWORK_ERROR:
            return {
                ...state,
                artowrk: null,
                loading: false,
                error: payload
            }
        case CLEAR_ARTWORK:
            return {
                ...state,
                artwork: null,
                loading: false
            }
        default:
            return state;
    }
}