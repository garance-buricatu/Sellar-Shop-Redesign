import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

import { LOGIN_SUCCESS } from './types';

// Set password
export const setPassword = (curr_password, new_password, new_password2) => async dispatch => {
    
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    const config = {
        headers: {
            'Content-Type':'application/json' 
        }
    }

    const body = JSON.stringify({ curr_password, new_password, new_password2 });

    try {
        const res = await axios.post('/api/users/setPassword', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data 
        });

        dispatch(setAlert('Password has been set', 'success'));

    } catch (err) {
        console.log(err);
        const errors = err.response.data.errors;
        
        if (errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
};