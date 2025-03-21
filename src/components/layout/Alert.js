import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const alertStyles = {
  success:
    'flex items-center p-4 mb-4 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400',
  error:
    'flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400',
};

const Alert = ({ alerts }) => (
  <>
    {alerts.map((alert) => (
      <div key={alert.id} className={`${alertStyles[alert.type]}`}>
        {alert.msg}
      </div>
    ))}
  </>
);

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
