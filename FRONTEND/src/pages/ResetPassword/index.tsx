import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import CustomInput from '../../components/common/CustomInput';
import { RootState } from '../../store/ducks/rootReducer';
import { setNewPasswordRequest } from '../../store/ducks/password/actions';
import Lottie from 'lottie-react';
import lockerOpen from '../../../public/assets/images/password/lockerOpen.json';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const validatePassword = (password: string): string | null => {
  const minLength = 6;
  const hasNumber = /\d/;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

  if (password.length < minLength) {
    return `A senha deve ter pelo menos ${minLength} caracteres.`;
  }
  if (!hasNumber.test(password)) {
    return 'A senha deve conter pelo menos um número.';
  }
  if (!hasSpecialChar.test(password)) {
    return 'A senha deve conter pelo menos um caractere especial.';
  }
  return null;
};

const ResetPassword: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { error, message } = useSelector((state: RootState) => state.password);

  const token = new URLSearchParams(location.search).get('token');

  useEffect(() => {
    if (message && error) {
      setSnackbarOpen(true);
      setTimeout(() => {
        setSnackbarOpen(false);
      }, 6000);
    } else if (message && !error) {
      setSnackbarOpen(true);
      setTimeout(() => {
        setSnackbarOpen(false);
        navigate('/login');
      }, 2750);
    }
  }, [message]);

  const handleNewPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
    if (errors.newPassword)
      setErrors((prevErrors) => ({ ...prevErrors, newPassword: '' }));
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
    if (errors.confirmPassword)
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: '' }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    const passwordValidationError = validatePassword(newPassword);

    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }
    if (passwordValidationError) {
      newErrors.newPassword = passwordValidationError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm() && token) {
      dispatch(setNewPasswordRequest({ token, newPassword }));
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <section className="relative bg-gray-50 overflow-hidden bg-[url(/public/assets/shadow-light-top.png)] bg-no-repeat bg-cover">
      <div className="flex flex-col justify-center container min-h-screen mx-auto">
        {message && !error ? (
          <Lottie
            animationData={lockerOpen}
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
                  Redefinir Senha
                </h3>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium" htmlFor="newPassword">
                    Nova Senha
                  </label>
                  <div className="relative">
                    <CustomInput
                      type={showPassword ? 'text' : 'password'}
                      name="newPassword"
                      id="newPassword"
                      placeholder="Sua nova senha"
                      value={newPassword}
                      onChange={handleNewPasswordChange}
                      className="py-2 px-4 h-11 w-full text-gray-500 placeholder-gray-500 bg-white border border-gray-200 focus:border-yellowGreen-500 rounded-lg shadow-sm outline-none ring-1 ring-transparent focus:ring-yellowGreen-500"
                    />
                    <button
                      type="button"
                      className="absolute top-1/2 right-0 mr-3 transform -translate-y-1/2 inline-block focus:outline-none text-gray-500 hover:text-yellowGreen-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <p className="text-red-500 text-xs">{errors.newPassword}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-medium"
                    htmlFor="confirmPassword"
                  >
                    Confirmar Senha
                  </label>

                  <CustomInput
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirme sua nova senha"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    className="py-2 px-4 h-11 w-full text-gray-500 placeholder-gray-500 bg-white border border-gray-200 focus:border-yellowGreen-500 rounded-lg shadow-sm outline-none ring-1 ring-transparent focus:ring-yellowGreen-500"
                  />

                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
                  )}
                </div>

                <button
                  className="group relative flex items-center justify-center px-5 h-12 w-full font-bold text-white bg-gradient-to-br from-cyanGreen-800 to-cyan-800 rounded-lg transition-all duration-300 focus:outline-none"
                  type="submit"
                >
                  <div className="absolute top-0 left-0 w-full h-full rounded-lg animate-pulse group-hover:ring-2 ring-green-300 transition duration-300"></div>
                  <span>Redefinir Senha</span>
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
        message={message}
      />
    </section>
  );
};

export default ResetPassword;
