import api from '../utils/api';
import { toast } from 'react-toastify';
import {
  GET_ALL_USERS,
  GET_ALL_USERS_ERROR,
  CHECK_CURRENT_PASSWORD_SUCCESS,
  CHECK_CURRENT_PASSWORD_ERROR,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  APPROVE_USER_SUCCESS,
  APPROVE_USER_ERROR,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
} from './types';

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/

// Get All Users
export const getAllUsers = () => async (dispatch) => {
  try {
    const res = await api.get('/admin/all-users');
    dispatch({
      type: GET_ALL_USERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ALL_USERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Check Current Password
export const checkCurrentPassword = (UserID, password) => async (dispatch) => {
  const body = { password };
  try {
    const res = await api.post(`/admin/check-current-password/${UserID}`, body);
    dispatch({
      type: CHECK_CURRENT_PASSWORD_SUCCESS,
      payload: res.data.msg,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: CHECK_CURRENT_PASSWORD_ERROR,
      payload: errors[0].msg,
    });
  }
};

// Approve User
export const approveUser = (UserID, status) => async (dispatch) => {
  try {
    const res = await api.put(`/admin/approve-user/${UserID}`, {
      status: status,
    });

    dispatch({
      type: APPROVE_USER_SUCCESS,
      payload: { UserID, user: res.data.user },
    });
    toast.success(res.data.msg, {
      position: 'top-right',
    });
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: APPROVE_USER_ERROR,
    });

    toast.error(errors[0].msg, {
      position: 'top-right',
    });
  }
};

// Add User
export const addUser = (email, password) => async (dispatch) => {
  const body = { email, password };

  try {
    const res = await api.post('/admin/add-user', body);

    dispatch({
      type: ADD_USER_SUCCESS,
      payload: res.data.user,
    });
    toast.success(res.data.msg, {
      position: 'top-right',
    });
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: ADD_USER_ERROR,
    });

    toast.error(errors[0].msg, {
      position: 'top-right',
    });
  }
};

// Update User
export const updateUser = (UserID, formData) => async (dispatch) => {
  try {
    const res = await api.put(`/admin/update-user/${UserID}`, formData);

    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: { UserID, user: res.data.user },
    });
    toast.success(res.data.msg, {
      position: 'top-right',
    });
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: UPDATE_USER_ERROR,
    });

    toast.error(errors[0].msg, {
      position: 'top-right',
    });
  }
};

// Delete User
export const deleteUser = (UserID) => async (dispatch) => {
  try {
    const res = await api.delete(`/admin/delete-user/${UserID}`);

    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: UserID,
    });
    toast.success(res.data.msg, {
      position: 'top-right',
    });
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: DELETE_USER_ERROR,
    });

    toast.error(errors[0].msg, {
      position: 'top-right',
    });
  }
};
