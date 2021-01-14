import axios from 'axios';
import { ADD_SEMINAR, SEMINAR_ERROR, GET_SEMINARS } from './types'
import { setAlert } from '../actions/alert'

// get all seminars
export const getSeminars = () => async dispatch => {
    try {
        const res = await axios.get('/api/seminars'); // using token currently stored in local storage
        
        dispatch({
            type: GET_SEMINARS,
            payload: res.data // array of all seminars
        });

    } catch (err) {

        dispatch({
            type: SEMINAR_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}; 

// add seminar
export const addSeminar = (formData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/seminars', formData, config);

        dispatch({
            type: ADD_SEMINAR,
            payload: res.data // seminar
        });

        dispatch(setAlert('Artwork Added', 'success'));        

    } catch (err) {
        console.log(err);
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger'))); // prints errors returned by endpoint
        }

        dispatch({
            type: SEMINAR_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};