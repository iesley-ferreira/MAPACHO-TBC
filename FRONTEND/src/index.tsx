import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <GoogleOAuthProvider clientId="257701820514-m5dcd3scqcu5d342c8e81t2hikjf1ai8.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>,
  // </React.StrictMode>
);
