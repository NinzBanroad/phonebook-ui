import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import {
  CLEAR_USERS,
  RESET_SHARED_CONTACTS_WITH,
  RESET_UPDATE_CONTACT,
} from '../../actions/types';
import Spinner from '../layout/Spinner';
import ContactModal from '../layout/ContactModal';
import {
  getAllActiveUsers,
  getAllUserContacts,
  updateContact,
  deleteUserContact,
  addContact,
  sharedContactsWith,
} from '../../actions/user';
import ShareContactModal from '../layout/ShareContactModal';

const UserDashboard = ({
  getAllUserContacts,
  addContact,
  updateContact,
  deleteUserContact,
  sharedContactsWith,
  user: { contacts, users, contact_updated, shared_contacts_with_updated },
  auth: { user },
}) => {
  const dispatch = useDispatch();
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [contactnumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [contactphoto, setContactPhoto] = useState(null);
  const [updatedContactPhoto, setUpdatedContactPhoto] = useState(null);
  const [previewContactPhoto, setPreviewContactPhoto] = useState(null);
  const [ContactID, setContactID] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isOpenAddContact, setIsOpenAddContactModal] = useState(false);
  const [isOpenUpdateContact, setIsOpenUpdateContactModal] = useState(false);
  const [isOpenShareContact, setIsOpenShareContactModal] = useState(false);

  // Fetch all user contacts when the component mounts
  useEffect(() => {
    getAllUserContacts(user.UserID);
  }, [getAllUserContacts, user.UserID]);

  useEffect(() => {
    if (contact_updated) {
      getAllUserContacts(user.UserID); // Trigger when contact is updated
      dispatch({ type: RESET_UPDATE_CONTACT }); // Reset flag after fetching
    }
  }, [getAllUserContacts, user.UserID, contact_updated, dispatch]);

  useEffect(() => {
    if (shared_contacts_with_updated) {
      getAllUserContacts(user.UserID); // Trigger when shared contacts with are updated
      dispatch({ type: RESET_SHARED_CONTACTS_WITH }); // Reset flag after fetching
    }
  }, [getAllUserContacts, user.UserID, shared_contacts_with_updated, dispatch]);

  // will filter the users who are already shared with the contact
  useEffect(() => {
    if (users && users.length > 0) {
      setSelectedUsers(
        users.filter((user) => user.isShared).map((user) => user.UserID)
      );
    }
  }, [users]);

  const onCloseShareContactModal = () => {
    dispatch({ type: CLEAR_USERS });
    setSelectedUsers([]);
    setIsOpenShareContactModal(false);
  };

  const onCloseAddContactModal = () => {
    setContactNumber('');
    setIsOpenAddContactModal(false);
    setPreviewContactPhoto('');
  };

  const onCloseUpdateContactModal = () => {
    setContactID('');
    setFirstName('');
    setLastName('');
    setContactNumber('');
    setEmail('');
    setUpdatedContactPhoto('');
    setPreviewContactPhoto('');
    setIsOpenUpdateContactModal(false);
  };

  //handle change for add contact photo
  const onChangeContactPhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      setContactPhoto(e.target.files[0]);
      setPreviewContactPhoto(URL.createObjectURL(file));
    }
  };

  //handle change for update contact photo
  const onChangeUpdatedContactPhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUpdatedContactPhoto(e.target.files[0]);
      setPreviewContactPhoto(URL.createObjectURL(file));
    }
  };

  const handleSharedContactsWith = (userid) => {
    // Toggle the selectedUsers array
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userid)
        ? prevSelected.filter((id) => id !== userid)
        : [...prevSelected, userid]
    );
  };

  const handleShareContact = (id) => {
    setContactID(id);
    dispatch(getAllActiveUsers(id));
    setIsOpenShareContactModal(true);
  };

  // loop the users and check the id then set the value in the Input Field
  const handleUpdateContact = (id) => {
    setIsOpenUpdateContactModal(true);
    for (let i = 0; i < contacts.length; i++) {
      if (id === contacts[i].ContactID) {
        setContactID(contacts[i].ContactID);
        setFirstName(contacts[i].Firstname);
        setLastName(contacts[i].Lastname);
        setContactNumber(contacts[i].ContactNumber);
        setEmail(contacts[i].Email);
        setUpdatedContactPhoto(contacts[i].ContactPhoto);
      }
    }
  };

  const handleAddContactSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('contactnumber', contactnumber);
    formData.append('email', email);

    if (contactphoto) formData.append('contactphoto', contactphoto);

    addContact(user.UserID, formData);
    setContactNumber('');
    setContactPhoto('');
    setPreviewContactPhoto('');
    setIsOpenAddContactModal(false);
  };

  const handleUpdateContactSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('contactnumber', contactnumber);
    formData.append('email', email);

    if (updatedContactPhoto)
      formData.append('contactphoto', updatedContactPhoto);

    updateContact(ContactID, formData);
    setContactNumber('');
    setUpdatedContactPhoto('');
    setPreviewContactPhoto('');
    setIsOpenUpdateContactModal(false);
  };

  const handleSubmitSelectedUsers = (e) => {
    e.preventDefault();

    const formData = {
      UserID: user.UserID,
      ContactID: ContactID,
      sharedWith: selectedUsers,
    };

    sharedContactsWith(formData);
    dispatch({ type: CLEAR_USERS });
    setSelectedUsers([]);
    setIsOpenShareContactModal(false);
  };

  return (
    <>
      {contacts === null ? (
        <Spinner />
      ) : (
        <>
          <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-8 py-3 mt-10'>
            <button
              type='button'
              onClick={() => setIsOpenAddContactModal(true)}
              className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Add Contact
            </button>
          </div>
          <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-3 lg:px-4'>
            <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th scope='col' className='px-6 py-3'></th>
                  <th scope='col' className='px-6 py-3'>
                    Firstname
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Lastname
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Contact Number
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Email Address
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    # of Users you <br />
                    shared this contact with
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {contacts.length === 0 ? (
                  <>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td className='pt-5'>NO AVAILABLE CONTACTS </td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </>
                ) : (
                  <>
                    {contacts.map((contact, i) => (
                      <tr
                        key={i}
                        className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200'
                      >
                        <td className='px-6 py-4'>
                          {contact.ContactPhoto && (
                            <img
                              className='rounded-full w-10 h-10'
                              src={`https://res.cloudinary.com/dnrytcwn6/image/upload/${contact.ContactPhoto}`}
                              alt='Uploaded'
                            />
                          )}
                        </td>
                        <td className='px-6 py-4'>{contact.Firstname}</td>
                        <td className='px-6 py-4'>{contact.Lastname}</td>
                        <td className='px-6 py-4'>{contact.ContactNumber}</td>
                        <td className='px-6 py-4'>{contact.Email}</td>
                        <td className='px-6 py-4'>
                          {!contact.sharedWith
                            ? user.UserID === contact.UserID
                              ? 0
                              : ''
                            : contact.sharedWith.length}
                        </td>
                        {user.UserID === contact.UserID ? (
                          <td className='px-6 py-4'>
                            <button
                              onClick={() =>
                                handleShareContact(contact.ContactID)
                              }
                              className='text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
                            >
                              Share
                            </button>
                            <button
                              type='button'
                              onClick={() =>
                                handleUpdateContact(contact.ContactID)
                              }
                              className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                            >
                              Edit
                            </button>
                            <button
                              type='button'
                              onClick={() =>
                                deleteUserContact(contact.ContactID)
                              }
                              className='text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                            >
                              Delete
                            </button>
                          </td>
                        ) : (
                          <></>
                        )}
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
          {/* Add Contact Modal */}
          <ContactModal
            show={isOpenAddContact}
            onClose={onCloseAddContactModal}
          >
            <div className='p-4 md:p-5'>
              <form onSubmit={handleAddContactSubmit} className='space-y-4'>
                <div className='flex flex-wrap items-center justify-center'>
                  <img
                    className='rounded-full w-20 h-20'
                    src={
                      previewContactPhoto ||
                      'https://freepngimg.com/download/icon/thoughts/2570-default-profile-picture-grey-male.png'
                    }
                    alt='Uploaded'
                  />
                </div>
                <div>
                  <label
                    htmlFor='contactphoto'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Contact Photo
                  </label>
                  <input
                    type='file'
                    name='contactphoto'
                    placeholder=''
                    onChange={onChangeContactPhoto}
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                  />
                </div>
                <div>
                  <label
                    htmlFor='firstname'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Firstname
                  </label>
                  <input
                    type='text'
                    name='firstname'
                    placeholder=''
                    onChange={(e) => setFirstName(e.target.value)}
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor='lastname'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Lastname
                  </label>
                  <input
                    type='text'
                    name='lastname'
                    placeholder=''
                    onChange={(e) => setLastName(e.target.value)}
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                    required
                  />
                </div>
                <div className='relative'>
                  <label
                    htmlFor='contactnumber'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Contact Number
                  </label>
                  <p className='absolute text-sm pt-2 items-center justify-center pl-2 text-slate-700'>
                    +63
                  </p>
                  <input
                    type='number'
                    name='contactnumber'
                    placeholder='+639123456789'
                    value={contactnumber}
                    onChange={(e) => {
                      // Allow only numbers, ensure the first digit is not 0, and limit to 10 digits
                      if (
                        (/^[1-9][0-9]*$/.test(e.target.value) ||
                          e.target.value === '') &&
                        e.target.value.length <= 10
                      ) {
                        setContactNumber(e.target.value);
                      }
                    }}
                    className='w-full bg-transparent text-sm placeholder:text-slate-400 text-slate-700 border border-slate-200 rounded-md pl-10 pr-20 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor='email'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Email Address
                  </label>
                  <input
                    type='email'
                    name='email'
                    placeholder='name@company.com'
                    onChange={(e) => setEmail(e.target.value)}
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                    required
                  />
                </div>
                <button
                  type='submit'
                  className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                  Submit
                </button>
              </form>
            </div>
          </ContactModal>
          {/* Update Contact Modal */}
          <ContactModal
            show={isOpenUpdateContact}
            onClose={onCloseUpdateContactModal}
          >
            <div className='p-4 md:p-5'>
              <form onSubmit={handleUpdateContactSubmit} className='space-y-4'>
                <div className='flex flex-wrap items-center justify-center'>
                  {updatedContactPhoto && (
                    <img
                      className='rounded-full w-20 h-20'
                      src={
                        previewContactPhoto ||
                        `https://res.cloudinary.com/dnrytcwn6/image/upload/${updatedContactPhoto}`
                      }
                      alt='Uploaded'
                    />
                  )}
                </div>
                <div>
                  <label
                    htmlFor='contactphoto'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Contact Photo
                  </label>
                  <input
                    type='file'
                    name='contactphoto'
                    placeholder=''
                    onChange={onChangeUpdatedContactPhoto}
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                  />
                </div>
                <div>
                  <label
                    htmlFor='firstname'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Firstname
                  </label>
                  <input
                    type='text'
                    name='firstname'
                    placeholder=''
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor='lastname'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Lastname
                  </label>
                  <input
                    type='text'
                    name='lastname'
                    placeholder=''
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                    required
                  />
                </div>
                <div class='relative'>
                  <label
                    htmlFor='contactnumber'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Contact Number
                  </label>
                  <p class='absolute text-sm pt-2 items-center justify-center pl-2 text-slate-700'>
                    +63
                  </p>
                  <input
                    type='number'
                    name='contactnumber'
                    placeholder='+639123456789'
                    value={contactnumber}
                    onChange={(e) => {
                      // Allow only numbers, ensure the first digit is not 0, and limit to 10 digits
                      if (
                        (/^[1-9][0-9]*$/.test(e.target.value) ||
                          e.target.value === '') &&
                        e.target.value.length <= 10
                      ) {
                        setContactNumber(e.target.value);
                      }
                    }}
                    className='w-full bg-transparent text-sm placeholder:text-slate-400 text-slate-700 border border-slate-200 rounded-md pl-10 pr-20 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor='email'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Email Address
                  </label>
                  <input
                    type='email'
                    name='email'
                    placeholder='name@company.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                    required
                  />
                </div>
                <button
                  type='submit'
                  className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                  Submit
                </button>
              </form>
            </div>
          </ContactModal>
          <ShareContactModal
            show={isOpenShareContact}
            onClose={onCloseShareContactModal}
          >
            <div className='p-4 md:p-5'>
              <form onSubmit={handleSubmitSelectedUsers} className='space-y-4'>
                <div>
                  <label
                    htmlFor='contactphoto'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Share Contacts With
                  </label>
                </div>
                {users &&
                  users.map((user) => (
                    <div key={user.UserID} className='flex items-center mb-4'>
                      <input
                        id={`checkbox-${user.UserID}`} // Unique id for each checkbox
                        type='checkbox'
                        checked={selectedUsers.includes(user.UserID)}
                        onChange={() => handleSharedContactsWith(user.UserID)}
                        className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                      />
                      <label
                        htmlFor={`checkbox-${user.UserID}`} // Match the id of the input
                        className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                      >
                        {user.Email}
                      </label>
                    </div>
                  ))}
                <button
                  type='submit'
                  className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                  Save
                </button>
              </form>
            </div>
          </ShareContactModal>
        </>
      )}
    </>
  );
};

UserDashboard.propTypes = {
  getAllActiveUsers: PropTypes.func.isRequired,
  getAllUserContacts: PropTypes.func.isRequired,
  addContact: PropTypes.func.isRequired,
  updateContact: PropTypes.func.isRequired,
  deleteUserContact: PropTypes.func.isRequired,
  sharedContactsWith: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getAllActiveUsers,
  getAllUserContacts,
  addContact,
  updateContact,
  deleteUserContact,
  sharedContactsWith,
})(UserDashboard);
