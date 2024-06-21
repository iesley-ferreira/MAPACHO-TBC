import {
  GoogleLogin as GoogleOAuthLogin,
  GoogleOAuthProvider,
} from '@react-oauth/google';
import axios from 'axios';

// interface CredentialResponse {
//   provider: string
//   user: {
//     id: string
//     name: string
//     email: string
//     picture: string
//   }
// }

function GoogleLogin() {
  const handleSuccess = (credentialResponse: any) => {
    axios
      .post('http://localhost:3001/auth/google', credentialResponse)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Erro ao enviar dados da credencial para o backend:', error);
      });
  };

  return (
    <GoogleOAuthProvider clientId="257701820514-52pftd6ulpsdoqu4mp4t3hihpclmefnn.apps.googleusercontent.com">
      <GoogleOAuthLogin
        onSuccess={handleSuccess}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </GoogleOAuthProvider>
  );
}

export default GoogleLogin;
