import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signin } from '../../actions/auth';

const Signin = ({
  signin,
  auth: { isAuthenticated, isStatusPending, error },
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    signin(email, password);
  };

  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  if (error === 'Please wait for Admin Approval') {
    return <Navigate to='/for-admin-approval' />;
  }

  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <img
            alt='NB Phonebook'
            src='https://res.cloudinary.com/dnrytcwn6/image/upload/v1743053610/nb-phonebook-logo-no-background_ohlp6c.png'
            className='mx-auto h-20 w-auto mt-5'
          />
          <h2 className='mt-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900'>
            Sign in to your account
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form onSubmit={handleSubmit} className='space-y-6'>
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
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm/6 font-medium text-gray-900'
                >
                  Password
                </label>
                <div className='text-sm'>
                  <a
                    href='/forgot-password'
                    className='font-semibold text-indigo-600 hover:text-indigo-500'
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className='mt-2'>
                <input
                  name='password'
                  type='password'
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='••••••'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                />
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Sign in
              </button>
            </div>
          </form>

          <p className='mt-10 text-center text-sm/6 text-gray-500'>
            No account yet?{' '}
            <a
              href='/sign-up'
              className='font-semibold text-indigo-600 hover:text-indigo-500'
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

Signin.propTypes = {
  signin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { signin })(Signin);
