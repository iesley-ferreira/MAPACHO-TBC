import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomInput from '../../components/common/CustomInput';
import { RootState } from '../../store/ducks/rootReducer';
import { resetPasswordRequest } from '../../store/ducks/password/actions';
import Lottie from 'lottie-react';
import sendEmail from '../../../public/assets/images/password/sendEmail.json';

const ForgotPassword: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { error, errorMessage, message } = useSelector(
    (state: RootState) => state.password,
  );

  useEffect(() => {
    if (message) {
      setSnackbarOpen(true);
      setTimeout(() => {
        setSnackbarOpen(false);
        navigate('/login');
      }, 6000);
    }
  }, [message]);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(resetPasswordRequest({ email }));
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <section className="relative bg-gray-50 overflow-hidden">
      <div className="flex flex-col justify-center container min-h-screen mx-auto">
        {message ? (
          <Lottie
            animationData={sendEmail}
            style={{ width: '240px', margin: '0 auto', paddingBottom: '40px' }}
          />
        ) : (
          <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-sm mx-auto">
              <div className="text-center mb-20">
                <h3
                  className="font-heading tracking-tight text-3xl font-bold mb-4"
                  style={{
                    background: 'linear-gradient(to right, #32CD32, #228B22)',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  Recuperar senha
                </h3>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-8">
                  <label className="block mb-2 text-sm font-medium" htmlFor="email">
                    Email
                  </label>
                  <CustomInput
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Seu email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                <button
                  className="group relative flex items-center justify-center px-5 h-12 w-full font-bold text-white bg-gradient-to-br from-cyanGreen-800 to-cyan-800 rounded-lg transition-all duration-300 focus:outline-none"
                  type="submit"
                >
                  <div className="absolute top-0 left-0 w-full h-full rounded-lg animate-pulse group-hover:ring-2 ring-green-300 transition duration-300"></div>
                  Resetar senha
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={8000}
        onClose={handleSnackbarClose}
        message={error ? errorMessage : message}
      />
    </section>
  );
};

export default ForgotPassword;
