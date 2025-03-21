import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { verifyEmail, changePassword } from '../../actions/auth';

const ForgotPassword = ({
  verifyEmail,
  changePassword,
  auth: { isVerified, isAuthenticated, isStatusPending },
}) => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(false);

  const handleCheckConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    if (newPassword === e.target.value) {
      setIsValidConfirmPassword(true);
    } else {
      setIsValidConfirmPassword(false);
    }
  };

  const handleVerifyEmail = (e) => {
    e.preventDefault();

    verifyEmail(email);
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    const password = confirmPassword;

    changePassword(email, password);
  };

  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  if (isStatusPending) {
    return <Navigate to='/for-admin-approval' />;
  }

  return (
    <>
      {isVerified ? (
        <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
          <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
            <h2 className='mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900'>
              Reset Password
            </h2>
          </div>

          <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
            <form onSubmit={handleSubmitPassword} className='space-y-6'>
              <div>
                <div className='flex items-center justify-between'>
                  <label
                    htmlFor='newPassword'
                    className='block text-sm/6 font-medium text-gray-900'
                  >
                    New Password
                  </label>
                </div>
                <div className='mt-2'>
                  <input
                    name='newPassword'
                    type='password'
                    required
                    placeholder='••••••'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                  />
                </div>
              </div>
              <div>
                <div className='flex items-center justify-between'>
                  <label
                    htmlFor='confirmPassword'
                    className='block text-sm/6 font-medium text-gray-900'
                  >
                    Confirm Password
                  </label>
                </div>
                <div className='mt-2'>
                  <input
                    name='confirmPassword'
                    type='password'
                    required
                    placeholder='••••••'
                    value={confirmPassword}
                    onChange={handleCheckConfirmPassword}
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                  />
                </div>
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
              <div>
                <button
                  type='submit'
                  className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
          <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
            <h2 className='mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900'>
              Forgot Password?
            </h2>
          </div>

          <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
            <form onSubmit={handleVerifyEmail} className='space-y-6'>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm/6 font-medium text-gray-900'
                >
                  Email Address
                </label>
                <div className='mt-2'>
                  <input
                    type='email'
                    name='email'
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                    placeholder='name@company.com'
                  />
                </div>
              </div>
              <div>
                <button
                  type='submit'
                  className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                  Verify Email
                </button>
              </div>
            </form>
            <p className='mt-10 text-center text-sm/6 text-gray-500'>
              Back to{' '}
              <a
                href='/'
                className='font-semibold text-indigo-600 hover:text-indigo-500'
              >
                Sign In
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

ForgotPassword.propTypes = {
  verifyEmail: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { verifyEmail, changePassword })(
  ForgotPassword
);
