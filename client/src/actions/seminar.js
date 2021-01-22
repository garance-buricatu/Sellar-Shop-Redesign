import axios from 'axios';
import { ADD_SEMINAR, SEMINAR_ERROR, GET_SEMINARS, DELETE_SEMINAR, CLEAR_SEMINAR, GET_SEMINAR } from './types'
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

        dispatch(getSeminars());

        dispatch(setAlert('Seminar Added', 'success'));        

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

// delete seminar
export const deleteSeminar = id => async dispatch => {
    if (window.confirm('Are you sure? This cannot be undone!')){
        try {
            const res = await axios.delete(`/api/seminars/${id}`);
    
            dispatch({
                type: DELETE_SEMINAR,
                payload: res.data //profile
            })
    
            dispatch(getSeminars());
    
            dispatch(setAlert('Seminar Deleted', 'success'));
    
        } catch (err) {
            dispatch({
                type: SEMINAR_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
    }
    
};

// get seminar by id
export const getSeminar = id => async dispatch => {
    try {
        const res = await axios.get(`/api/seminars/${id}`);

        dispatch({type: CLEAR_SEMINAR });

        dispatch({
            type: GET_SEMINAR,
            payload: res.data //seminar
        })

    } catch (err) {
        dispatch({
            type: SEMINAR_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};