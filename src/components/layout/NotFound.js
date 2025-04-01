import React from 'react';

const NotFound = () => {
  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <img
            alt='Page Not Found'
            src='https://www.digitalmesh.com/blog/wp-content/uploads/2020/05/404-error.jpg'
            className='mt-10 mx-auto h-auto w-auto'
          />
        </div>
        <p className='mt-10 text-center text-sm/6 text-gray-500'>
          Go back to Dashboard?{' '}
          <a
            href='/dashboard'
            className='font-semibold text-indigo-600 hover:text-indigo-500'
          >
            Back
          </a>
        </p>
      </div>
    </>
  );
};

export default NotFound;
