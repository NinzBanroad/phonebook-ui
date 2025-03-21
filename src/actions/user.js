import api from '../utils/api';
import {
  GET_ALL_USER_CONTACTS,
  GET_ALL_USER_CONTACTS_ERROR,
  ADD_CONTACT_SUCCESS,
  ADD_CONTACT_ERROR,
  UPDATE_CONTACT_SUCCESS,
  UPDATE_CONTACT_ERROR,
  DELETE_USER_CONTACT,
  DELETE_USER_CONTACT_ERROR,
} from './types';

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/

// Get All Users
export const getAllUserContacts = (UserID) => async (dispatch) => {
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

// Add Contact
export const addContact = (UserID, formData) => async (dispatch) => {
  try {
    const res = await api.post(`/user/add-contact/${UserID}`, formData);

    dispatch({
      type: ADD_CONTACT_SUCCESS,
      payload: res.data.contact,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => console.log(error));
    }

    dispatch({
      type: ADD_CONTACT_ERROR,
    });
  }
};

// Update Contact
export const updateContact = (ContactID, formData) => async (dispatch) => {
  try {
    const res = await api.put(`/user/update-contact/${ContactID}`, formData);

    dispatch({
      type: UPDATE_CONTACT_SUCCESS,
      payload: { ContactID, contact: res.data },
    });
  } catch (err) {
    dispatch({
      type: UPDATE_CONTACT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Contact
export const deleteUserContact = (ContactID) => async (dispatch) => {
  try {
    await api.delete(`/user/delete-contact/${ContactID}`);

    dispatch({
      type: DELETE_USER_CONTACT,
      payload: ContactID,
    });
  } catch (err) {
    dispatch({
      type: DELETE_USER_CONTACT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
