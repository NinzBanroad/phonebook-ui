import {
  GET_ALL_USER_CONTACTS,
  GET_ALL_USER_CONTACTS_ERROR,
  ADD_CONTACT_SUCCESS,
  ADD_CONTACT_ERROR,
  UPDATE_CONTACT_SUCCESS,
  UPDATE_CONTACT_ERROR,
  DELETE_USER_CONTACT_SUCCESS,
  DELETE_USER_CONTACT_ERROR,
  GET_ALL_ACTIVE_USERS,
  GET_ALL_ACTIVE_USERS_ERROR,
  SHARED_CONTACTS_WITH_SUCCESS,
  SHARED_CONTACTS_WITH_ERROR,
  CLEAR_CONTACTS,
  CLEAR_USERS,
} from '../actions/types';

const initialState = {
  loading: true,
  contacts: null,
  users: null,
  error: {},
};

function userReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_ACTIVE_USERS:
      return {
        ...state,
        users: payload,
        loading: false,
      };
    case GET_ALL_ACTIVE_USERS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case GET_ALL_USER_CONTACTS:
      return {
        ...state,
        contacts: payload,
        loading: false,
      };
    case GET_ALL_USER_CONTACTS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case ADD_CONTACT_SUCCESS:
      return {
        ...state,
        contacts: [payload, ...state.contacts],
        loading: false,
      };
    case ADD_CONTACT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case SHARED_CONTACTS_WITH_SUCCESS:
      return {
        ...state,
        msg: payload,
        loading: false,
      };
    case SHARED_CONTACTS_WITH_ERROR:
      return {
        ...state,
        msg: payload,
        loading: false,
      };
    case UPDATE_CONTACT_SUCCESS:
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.ContactID === payload.ContactID ? payload.contact : contact
        ),
        loading: false,
      };
    case UPDATE_CONTACT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case DELETE_USER_CONTACT_SUCCESS:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.ContactID !== payload
        ),
        loading: false,
      };
    case DELETE_USER_CONTACT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_CONTACTS:
      return {
        ...state,
        contacts: null,
        loading: false,
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: null,
        loading: false,
      };
    default:
      return state;
  }
}

export default userReducer;
