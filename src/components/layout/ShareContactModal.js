import React from 'react';

const ShareContactModal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <>
      <div className='h-screen flex justify-center items-center'>
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
          role='dialog'
          tabIndex='-1'
          aria-labelledby='modal-title'
        >
          <div className='bg-white dark:bg-neutral-800 shadow-2xl rounded-lg w-96'>
            {/* Modal Header */}
            <div className='flex justify-between items-center py-3 px-4 border-b'>
              <h3 className='text-lg font-bold text-gray-800 dark:text-white'>
                {''}
              </h3>
              <button
                onClick={onClose}
                className='text-gray-800 dark:text-neutral-400 hover:bg-gray-200 dark:hover:bg-neutral-700 p-2 rounded-full'
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className='p-4'>
              <div className='text-gray-800 dark:text-neutral-400'>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShareContactModal;
