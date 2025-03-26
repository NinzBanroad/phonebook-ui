import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LOGOUT } from './actions/types';

//components
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import Dashboard from './components/dashboard/Dashboard';
import ForAdminApproval from './components/auth/ForAdminApproval';
import ForgotPassword from './components/auth/ForgotPassword';
import NotFound from './components/layout/NotFound';
import Alert from './components/layout/Alert';

//Private Route
import PrivateRoute from './components/routing/PrivateRoute';

// Redux
import { Provider } from 'react-redux';
import store from './store';

import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

import './App.css';

const App = () => {
  useEffect(() => {
    // check for token in LS when app first runs
    if (localStorage.token) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token);
    }
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Alert />
        <Routes>
          <Route path='/' element={<Signin />} />
          <Route path='/sign-up' element={<Signup />} />
          <Route path='/for-admin-approval' element={<ForAdminApproval />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route
            path='/dashboard'
            element={<PrivateRoute component={Dashboard} />}
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
