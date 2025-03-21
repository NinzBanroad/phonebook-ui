import React from 'react';

const ForAdminApproval = () => {
  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <img
            alt='Your Company'
            src='https://cdn-icons-png.flaticon.com/512/5582/5582975.png'
            className='mt-10 mx-auto h-20 w-auto'
          />
          <h1 className='mt-8 text-center text-m/6 tracking-tight text-gray-900'>
            Please wait for the admin to approve your account. Thank you for
            your patience!
          </h1>
        </div>
        <p className='mt-10 text-center text-sm/6 text-gray-500'>
          Go back to Sign in?{' '}
          <a
            href='/'
            className='font-semibold text-indigo-600 hover:text-indigo-500'
          >
            Back
          </a>
        </p>
      </div>
    </>
  );
};

export default ForAdminApproval;
