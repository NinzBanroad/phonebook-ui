import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, user }, logout }) => {
  const name = [];
  if (user !== null) {
    const email = user.Email;
    const chars = email.split('');
    const count = chars.indexOf('@');

    for (let i = 0; i < count; i++) {
      name.push(chars[i]);
    }
  }
  return (
    <>
      <nav className='border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700'>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
          <a
            href='#'
            className='flex items-center space-x-3 rtl:space-x-reverse'
          >
            <img
              src='https://res.cloudinary.com/dnrytcwn6/image/upload/v1743053610/nb-phonebook-logo-no-background_ohlp6c.png'
              className='h-12 w-auto'
              alt='NB Phonebook Logo'
            />
            <span className='self-center text-xl font-semibold whitespace-nowrap dark:text-white'>
              {user && user.isAdmin === 1
                ? 'ADMIN DASHBOARD'
                : 'USER DASHBOARD'}
            </span>
          </a>
          <div className='flex space-x-3 rtl:space-x-reverse'>
            <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white mb-1'>
              {user && name.join('')}
            </span>
            <button
              type='button'
              onClick={logout}
              className='text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-1 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800'
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
