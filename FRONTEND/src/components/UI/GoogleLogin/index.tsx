import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { GoogleCredential } from '../../../interfaces/GoogleCredential';

interface GoogleLoginProps {
  handleLogin: (credentialResponse: GoogleCredential) => void;
}

const GoogleLoginComponent: React.FC<GoogleLoginProps> = ({ handleLogin }) => {
  const handleSuccess = (credentialResponse: any) => {
    const decoded = jwtDecode(credentialResponse?.credential) as GoogleCredential;

    handleLogin(decoded);
  };

  const handleError = () => {
    console.log('Login Failed');
  };

  return <GoogleLogin onSuccess={handleSuccess} onError={handleError} />;
};

export default GoogleLoginComponent;
