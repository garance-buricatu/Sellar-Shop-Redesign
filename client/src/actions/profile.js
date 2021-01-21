import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_PROFILE,
    PROFILE_ERROR,
    AWARD_ERROR,
    UPDATE_PROFILE
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
        // dispatch({
        //     type: PROFILE_ERROR,
        //     payload: { msg: err.response.statusText, status: err.response.status }
        // });
    }
}; 

// Create or update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/profiles', formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data // the newly created profile
        });

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

        if (!edit){
            history.push('/dashboard'); // if new profile is being created, redirect to dashboard
        }

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Add Awards to profile
export const addAwards = (formData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('/api/profiles/awards', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data // profile
        });

        dispatch(setAlert('Award Added', 'success')); 
        
    } catch (err) {
        console.log(err);
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger'))); // prints errors returned by endpoint
        }

        dispatch({
            type: AWARD_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Delete Award
export const deleteAward = id => async dispatch => {
    if (window.confirm('Are you sure? This cannot be undone!')){
        try {
            const res = await axios.delete(`/api/profiles/awards/${id}`);

            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data //profile
            })

            dispatch(setAlert('Award Deleted', 'success'));
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
    }
};

// Add Videos to profile
export const addVideos = (formData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('/api/profiles/videos', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data // profile
        });

        dispatch(setAlert('Video Added', 'success')); 
        
    } catch (err) {
        console.log(err);
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger'))); // prints errors returned by endpoint
        }

        dispatch({
            type: AWARD_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Delete Video
export const deleteVideo = id => async dispatch => {
    if (window.confirm('Are you sure? This cannot be undone!')){
        try {
            const res = await axios.delete(`/api/profiles/videos/${id}`);

            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data //profile
            })

            dispatch(setAlert('Video Deleted', 'success'));
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
    }
};