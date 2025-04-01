import { combineReducers } from 'redux';
import auth from '../reducers/auth';
import user from '../reducers/user';
import admin from '../reducers/admin';

export default combineReducers({
  //list of reducers here
  auth,
  user,
  admin,
});
