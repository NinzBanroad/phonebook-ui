import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import UserModal from '../layout/UserModal';
import {
  getAllUsers,
  checkCurrentPassword,
  approveUser,
  addUser,
  updateUser,
  deleteUser,
} from '../../actions/admin';

const AdminDashboard = ({
  getAllUsers,
  checkCurrentPassword,
  addUser,
  updateUser,
  deleteUser,
  approveUser,
  admin: { users, isValid, msg },
}) => {
  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [changePassword, setChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(false);
  const [UserID, setUserID] = useState('');
  const [isOpenAddUser, setIsOpenAddUserModal] = useState(false);
  const [isOpenUpdateUser, setIsOpenUpdateUserModal] = useState(false);

  const onCloseAddUserModal = () => {
    setIsOpenAddUserModal(false);
  };

  const onCloseUpdateUserModal = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setIsValidConfirmPassword(false);
    setChangePassword(false);
    setIsOpenUpdateUserModal(false);
  };

  const handleCheckCurrentPassword = (e) => {
    setCurrentPassword(e.target.value);
    checkCurrentPassword(UserID, e.target.value);
  };

  const handleCheckConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    if (newPassword === e.target.value) {
      setIsValidConfirmPassword(true);
    } else {
      setIsValidConfirmPassword(false);
    }
  };

  const handleAddUserSubmit = (e) => {
    e.preventDefault();
    addUser(email, password);
    setIsOpenAddUserModal(false);
  };

  // loop the users and check the id then set the value in the Input Field
  const handleUpdateUser = (id) => {
    setIsOpenUpdateUserModal(true);
    for (let i = 0; i < users.length; i++) {
      if (id === users[i].UserID) {
        setEmail(users[i].Email);
        setUserID(users[i].UserID);
      }
    }
  };
  const handleUpdateUserSubmit = (e) => {
    e.preventDefault();

    if (changePassword) {
      const formData = {
        email,
        password: confirmPassword,
      };
      updateUser(UserID, formData);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setIsValidConfirmPassword(false);
      setChangePassword(false);
      setIsOpenUpdateUserModal(false);
    } else {
      const formData = {
        email,
        password: '',
      };
      updateUser(UserID, formData);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setIsValidConfirmPassword(false);
      setChangePassword(false);
      setIsOpenUpdateUserModal(false);
    }
  };

  return (
    <>
      {users === null ? (
        <Spinner />
      ) : (
        <>
          <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-8 py-3 mt-10'>
            <button
              type='button'
              onClick={() => setIsOpenAddUserModal(true)}
              class='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Add User
            </button>
          </div>
          <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-3 lg:px-8'>
            <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th scope='col' className='px-6 py-3'>
                    Email
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Active Account
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Status
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => (
                  <tr
                    key={i}
                    className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200'
                  >
                    <td className='px-6 py-4'>{user.Email}</td>
                    <td className='px-6 py-4'>
                      {user.isActive === 1 ? 'YES' : 'NO'}
                    </td>
                    <td className='px-6 py-4'>{user.Status}</td>
                    <td className='px-6 py-4'>
                      {user.Status === 'approved' ? (
                        <>
                          <button
                            type='button'
                            onClick={() => handleUpdateUser(user.UserID)}
                            class='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                          >
                            Edit
                          </button>
                          <button
                            type='button'
                            onClick={() => deleteUser(user.UserID)}
                            class='text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                          >
                            Delete
                          </button>
                        </>
                      ) : (
                        <button
                          type='button'
                          onClick={() => approveUser(user.UserID, 'approved')}
                          class='text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
                        >
                          Approve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Add User Modal */}
          <UserModal show={isOpenAddUser} onClose={onCloseAddUserModal}>
            <div className='p-4 md:p-5'>
              <form onSubmit={handleAddUserSubmit} className='space-y-4'>
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
                <div>
                  <label
                    htmlFor='password'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Password
                  </label>
                  <input
                    type='password'
                    name='password'
                    placeholder='••••••'
                    onChange={(e) => setPassword(e.target.value)}
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
          </UserModal>
          {/* Update User Modal */}
          <UserModal show={isOpenUpdateUser} onClose={onCloseUpdateUserModal}>
            <div className='p-4 md:p-5'>
              <form onSubmit={handleUpdateUserSubmit} className='space-y-4'>
                <div>
                  <label
                    htmlFor='email'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Email Address
                  </label>
                  <input
                    id='email'
                    type='email'
                    name='email'
                    value={email}
                    placeholder='name@company.com'
                    onChange={(e) => setEmail(e.target.value)}
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                    required
                  />
                </div>
                <button
                  onClick={() => setChangePassword(true)}
                  className='block mb-2 text-sm font-thin text-gray-900 dark:text-white'
                >
                  Change Password?
                </button>
                {changePassword && (
                  <>
                    <div>
                      <label
                        htmlFor='currentPassword'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                      >
                        Current Password
                      </label>
                      <input
                        id='currentPassword'
                        type='password'
                        name='currentPassword'
                        placeholder='••••••'
                        value={currentPassword}
                        onChange={handleCheckCurrentPassword}
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                        required
                      />
                    </div>
                    <p
                      className={`${
                        isValid && currentPassword.length > 0
                          ? 'text-xs text-green-500'
                          : 'text-xs text-red-500'
                      }`}
                    >
                      {currentPassword.length > 0 && msg}
                    </p>
                    <div>
                      <label
                        htmlFor='newPassword'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                      >
                        New Password
                      </label>
                      <input
                        id='newPassword'
                        type='password'
                        name='newPassword'
                        value={newPassword}
                        placeholder='••••••'
                        onChange={(e) => setNewPassword(e.target.value)}
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor='confirmPassword'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                      >
                        Confirm Password
                      </label>
                      <input
                        id='confirmPassword'
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        placeholder='••••••'
                        onChange={handleCheckConfirmPassword}
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                        required
                      />
                    </div>
                    <p
                      className={`${
                        isValidConfirmPassword && confirmPassword.length > 0
                          ? 'text-xs text-green-500'
                          : 'text-xs text-red-500'
                      }`}
                    >
                      {confirmPassword.length === 0
                        ? ''
                        : isValidConfirmPassword
                        ? `New and Confirm Password match`
                        : `New and Confirm Password doesn't match`}
                    </p>
                  </>
                )}
                <button
                  type='submit'
                  className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                  Submit
                </button>
              </form>
            </div>
          </UserModal>
        </>
      )}
    </>
  );
};
AdminDashboard.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
  checkCurrentPassword: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  approveUser: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  admin: state.admin,
});

export default connect(mapStateToProps, {
  getAllUsers,
  checkCurrentPassword,
  approveUser,
  addUser,
  updateUser,
  deleteUser,
})(AdminDashboard);
