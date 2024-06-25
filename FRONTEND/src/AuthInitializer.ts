import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserFromToken } from './store/ducks/user/actions';

const AuthInitializer: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('TOKEN', token);

      dispatch(setUserFromToken(token));
    }
  }, []);

  return null;
};

export default AuthInitializer;
