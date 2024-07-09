import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserFromTokenRequest } from './store/ducks/user/actions';

const AuthInitializer: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setUserFromTokenRequest(token));
    }
  }, []);

  return null;
};

export default AuthInitializer;
