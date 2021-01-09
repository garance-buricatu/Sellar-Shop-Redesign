import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_PROFILE,
    PROFILE_ERROR
} from './types';

// Get current user's profile
export const getBonnieProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profiles'); // using token currently stored in local storage
        
        dispatch({
            type: GET_PROFILE,
            payload: res.data // bonnie's profile
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}; 