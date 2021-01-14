import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import artwork from './artwork';
import seminar from './seminar';

export default combineReducers({
    alert,
    auth,
    profile,
    artwork,
    seminar
});