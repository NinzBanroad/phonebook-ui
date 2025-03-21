import {
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_ERROR,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isStatusPending: null,
  isVerified: false,
  msg: '',
  loading: true,
  user: null,
};

function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case SIGNIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case SIGNIN_FAIL:
      return {
        ...state,
        error: payload,
        isStatusPending: true,
        loading: false,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        isStatusPending: true,
        loading: false,
        token: null,
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        msg: payload,
        isVerified: true,
        loading: false,
      };
    case VERIFY_EMAIL_ERROR:
      return {
        ...state,
        msg: payload,
        isVerified: false,
        loading: false,
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        error: payload,
        isStatusPending: true,
        loading: false,
      };
    case AUTH_ERROR:
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
}

export default authReducer;
