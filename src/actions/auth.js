import api from '../utils/api';
import { setAlert } from './alert';
import {
  USER_LOADED,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_ERROR,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  LOGOUT,
  AUTH_ERROR,
} from './types';

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get('/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Verify Email
export const verifyEmail = (email) => async (dispatch) => {
  const body = { email };
  try {
    const res = await api.post(`/auth/verify-email/`, body);
    dispatch({
      type: VERIFY_EMAIL_SUCCESS,
      payload: res.data.msg,
    });

    dispatch(setAlert(res.data.msg, 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => console.log(error));
    }

    dispatch({
      type: VERIFY_EMAIL_ERROR,
      payload: errors[0].msg,
    });

    dispatch(setAlert(errors[0].msg, 'error'));
  }
};

// Change Password
export const changePassword = (email, password) => async (dispatch) => {
  const body = { email, password };

  try {
    const res = await api.post('/auth/change-password', body);
    dispatch({
      type: CHANGE_PASSWORD_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => console.log(error));
    }

    dispatch({
      type: CHANGE_PASSWORD_ERROR,
    });
  }
};

// Signin User
export const signin = (email, password) => async (dispatch) => {
  const body = { email, password };

  try {
    const res = await api.post('/auth/sign-in', body);
    dispatch({
      type: SIGNIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => console.log(error));
    }

    dispatch({
      type: SIGNIN_FAIL,
    });
  }
};

// Signup User
export const signup = (email, password) => async (dispatch) => {
  const body = { email, password };
  try {
    await api.post('/auth/sign-up', body);

    dispatch({
      type: SIGNUP_SUCCESS,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => console.log(error));
    }

    dispatch({
      type: SIGNUP_FAIL,
    });
  }
};

// Logout
export const logout = () => ({ type: LOGOUT });
