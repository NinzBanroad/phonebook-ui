import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ContactModal from '../layout/ContactModal';
import {
  getAllUserContacts,
  updateContact,
  deleteUserContact,
  addContact,
} from '../../actions/user';

const UserDashboard = ({
  getAllUserContacts,
  addContact,
  updateContact,
  deleteUserContact,
  user: { contacts },
  auth: { user },
}) => {
  useEffect(() => {
    getAllUserContacts(user.UserID);
  }, []);

  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [contactnumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [contactphoto, setContactPhoto] = useState(null);
  const [updatedContactPhoto, setUpdatedContactPhoto] = useState(null);
  const [previewContactPhoto, setPreviewContactPhoto] = useState(null);
  const [ContactID, setContactID] = useState('');
  const [isOpenAddContact, setIsOpenAddContactModal] = useState(false);
  const [isOpenUpdateContact, setIsOpenUpdateContactModal] = useState(false);

  const onCloseAddContactModal = () => {
    setIsOpenAddContactModal(false);
  };

  const onCloseUpdateContactModal = () => {
    setContactID('');
    setFirstName('');
    setLastName('');
    setContactNumber('');
    setEmail('');
    setUpdatedContactPhoto('');
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
    setIsOpenUpdateContactModal(false);
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
                      <td className='px-6 py-10 text-center'>
                        NO AVAILABLE CONTACTS
                      </td>
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
                              src={require(`../../../../backend/uploads/${contact.ContactPhoto}`)}
                              alt='Uploaded'
                            />
                          )}
                        </td>
                        <td className='px-6 py-4'>{contact.Firstname}</td>
                        <td className='px-6 py-4'>{contact.Lastname}</td>
                        <td className='px-6 py-4'>{contact.ContactNumber}</td>
                        <td className='px-6 py-4'>{contact.Email}</td>
                        <td className='px-6 py-4'>
                          <button
                            type='button'
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
                            onClick={() => deleteUserContact(contact.ContactID)}
                            className='text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                          >
                            Delete
                          </button>
                        </td>
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
                <div>
                  <label
                    htmlFor='contactnumber'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Contact Number
                  </label>
                  <input
                    type='number'
                    name='contactnumber'
                    placeholder=''
                    onChange={(e) => setContactNumber(e.target.value)}
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
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
                        require(`../../../../backend/uploads/${updatedContactPhoto}`)
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
                <div>
                  <label
                    htmlFor='contactnumber'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Contact Number
                  </label>
                  <input
                    type='number'
                    name='contactnumber'
                    placeholder=''
                    value={contactnumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
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
        </>
      )}
    </>
  );
};

UserDashboard.propTypes = {
  getAllUserContacts: PropTypes.func.isRequired,
  addContact: PropTypes.func.isRequired,
  updateContact: PropTypes.func.isRequired,
  deleteUserContact: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getAllUserContacts,
  addContact,
  updateContact,
  deleteUserContact,
})(UserDashboard);
