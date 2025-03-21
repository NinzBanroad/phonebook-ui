import {
  GET_ALL_USERS,
  GET_ALL_USERS_ERROR,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  APPROVE_USER,
  APPROVE_USER_ERROR,
  DELETE_USER,
  DELETE_USER_ERROR,
  CHECK_CURRENT_PASSWORD_SUCCESS,
  CHECK_CURRENT_PASSWORD_ERROR,
} from '../actions/types';

const initialState = {
  loading: true,
  users: null,
  error: {},
  msg: '',
  isValid: false,
};

function adminReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_USERS:
      return {
        ...state,
        users: payload,
        loading: false,
      };
    case GET_ALL_USERS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CHECK_CURRENT_PASSWORD_SUCCESS:
      return {
        ...state,
        isValid: true,
        msg: payload,
        loading: false,
      };
    case CHECK_CURRENT_PASSWORD_ERROR:
      return {
        ...state,
        msg: payload,
        isValid: false,
        loading: false,
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        users: [payload, ...state.users],
        loading: false,
      };
    case ADD_USER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.map((user) =>
          user.UserID === payload.UserID ? payload.user : user
        ),
        loading: false,
      };
    case UPDATE_USER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case APPROVE_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user.UserID === payload.UserID ? payload.user : user
        ),
        loading: false,
      };
    case APPROVE_USER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.UserID !== payload),
        loading: false,
      };
    case DELETE_USER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}

export default adminReducer;
