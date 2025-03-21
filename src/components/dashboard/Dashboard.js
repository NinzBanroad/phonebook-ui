import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import Navbar from '../layout/Navbar';

const Dashboard = ({ auth: { user } }) => {
  return (
    <>
      <Navbar />
      {user === null ? (
        <Spinner />
      ) : (
        <section className='dashboard-container'>
          {user.isAdmin === 1 ? <AdminDashboard /> : <UserDashboard />}
        </section>
      )}
    </>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(Dashboard);
