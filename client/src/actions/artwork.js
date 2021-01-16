import axios from 'axios';
import { GET_ARTWORKS, ARTWORK_ERROR, ADD_ARTWORK, DELETE_ARTWORK, CLEAR_ARTWORK, EDIT_ARTWORK, GET_ARTWORK } from './types';
import { setAlert } from '../actions/alert'

// get all artworks
export const getArtworks = () => async dispatch => {
    try {
        const res = await axios.get('/api/artworks'); // using token currently stored in local storage
        
        dispatch({
            type: GET_ARTWORKS,
            payload: res.data // array of all artworks
        });

    } catch (err) {

        dispatch({
            type: ARTWORK_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}; 

// add artwork
export const addArtwork = (formData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/artworks', formData, config);

        dispatch({
            type: ADD_ARTWORK,
            payload: res.data // artwork
        });

        dispatch(getArtworks());

        dispatch({type: CLEAR_ARTWORK});

        dispatch(setAlert('Artwork Added', 'success'));        

    } catch (err) {
        console.log(err);
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger'))); // prints errors returned by endpoint
        }

        dispatch({
            type: ARTWORK_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// get artwork by id
export const getArtwork = id => async dispatch => {
    try {
        const res = await axios.get(`/api/artworks/${id}`);

        dispatch({type: CLEAR_ARTWORK});

        dispatch({
            type: GET_ARTWORK,
            payload: res.data //artwork
        })

    } catch (err) {
        dispatch({
            type: ARTWORK_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// edit artwork by id
export const editArtwork = (id, formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put(`/api/artworks/${id}`, formData, config);

        dispatch({
            type: EDIT_ARTWORK,
            payload: res.data // artwork
        });

        dispatch({type: CLEAR_ARTWORK});

        dispatch(setAlert('Artwork Edited', 'success'));
        
        history.push('/dashboard');

    } catch (err) {
        console.log(err);
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger'))); // prints errors returned by endpoint
        }

        dispatch({
            type: ARTWORK_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// delete artwork
export const deleteArtwork = id => async dispatch => {
    if (window.confirm('Are you sure? This cannot be undone!')){
        try {
            const res = await axios.delete(`/api/artworks/${id}`);
    
            dispatch({
                type: DELETE_ARTWORK,
                payload: res.data //profile
            })
    
            dispatch(getArtworks());
    
            dispatch(setAlert('Artwork Deleted', 'success'));
    
        } catch (err) {
            dispatch({
                type: ARTWORK_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
    }
    
};