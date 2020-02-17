import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import AuthContext from '../../authContext';
import firebaseApp from '../../firebase';

const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(setCurrentUser);
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser: currentUser }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = forbidExtraProps({
  children: PropTypes.element.isRequired
});

export default AuthProvider;
