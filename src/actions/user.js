import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_ALL_USER_CONTACTS,
  GET_ALL_USER_CONTACTS_ERROR,
  GET_ALL_ACTIVE_USERS,
  GET_ALL_ACTIVE_USERS_ERROR,
  ADD_CONTACT_SUCCESS,
  ADD_CONTACT_ERROR,
  UPDATE_CONTACT_SUCCESS,
  UPDATE_CONTACT_ERROR,
  DELETE_USER_CONTACT_SUCCESS,
  DELETE_USER_CONTACT_ERROR,
  SHARED_CONTACTS_WITH_SUCCESS,
  SHARED_CONTACTS_WITH_ERROR,
  CLEAR_CONTACTS,
} from './types';

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/

// Get All Active Users
export const getAllActiveUsers = (ContactID) => async (dispatch) => {
  try {
    const res = await api.get(`/user/all-active-users/${ContactID}`);
    dispatch({
      type: GET_ALL_ACTIVE_USERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ALL_ACTIVE_USERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get All Users
export const getAllUserContacts = (UserID) => async (dispatch) => {
  dispatch({ type: CLEAR_CONTACTS });
  try {
    const res = await api.get(`/user/all-contacts/${UserID}`);
    dispatch({
      type: GET_ALL_USER_CONTACTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ALL_USER_CONTACTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//
export const sharedContactsWith = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/user/share-contacts-with', formData);

    dispatch({
      type: SHARED_CONTACTS_WITH_SUCCESS,
      payload: res.data,
    });
    dispatch(setAlert(res.data.msg, 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => console.log(error));
    }
    dispatch({
      type: SHARED_CONTACTS_WITH_ERROR,
    });
    dispatch(setAlert(errors[0].msg, 'error'));
  }
};

// Add Contact
export const addContact = (UserID, formData) => async (dispatch) => {
  try {
    const res = await api.post(`/user/add-contact/${UserID}`, formData);

    dispatch({
      type: ADD_CONTACT_SUCCESS,
      payload: res.data.contact,
    });
    dispatch(setAlert(res.data.msg, 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => console.log(error));
    }

    dispatch({
      type: ADD_CONTACT_ERROR,
    });
    dispatch(setAlert(errors[0].msg, 'error'));
  }
};

// Update Contact
export const updateContact = (ContactID, formData) => async (dispatch) => {
  try {
    const res = await api.put(`/user/update-contact/${ContactID}`, formData);

    dispatch({
      type: UPDATE_CONTACT_SUCCESS,
      payload: { ContactID, contact: res.data.contact },
    });
    dispatch(setAlert(res.data.msg, 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => console.log(error));
    }
    dispatch({
      type: UPDATE_CONTACT_ERROR,
    });
    dispatch(setAlert(errors[0].msg, 'error'));
  }
};

// Delete Contact
export const deleteUserContact = (ContactID) => async (dispatch) => {
  try {
    const res = await api.delete(`/user/delete-contact/${ContactID}`);

    dispatch({
      type: DELETE_USER_CONTACT_SUCCESS,
      payload: ContactID,
    });
    dispatch(setAlert(res.data.msg, 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => console.log(error));
    }
    dispatch({
      type: DELETE_USER_CONTACT_ERROR,
    });
    dispatch(setAlert(errors[0].msg, 'error'));
  }
};
