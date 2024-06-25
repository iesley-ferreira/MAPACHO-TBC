import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import GoogleLogin from '../../components/UI/GoogleLogin';
import CustomInput from '../../components/common/CustomInput';
import { loginUserRequest } from '../../store/ducks/user/actions';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(loginUserRequest({ email, password }));
    console.log({ email, password });
  };

  return (
    <section className="relative pt-28 pb-32 bg-gray-50 overflow-hidden">
      <img
        className="absolute top-0 left-0 md:ml-20"
        src="/public/assets/shadow-light-top.png"
        alt="shadow-light-top"
      />
      <div className="relative container px-4 mx-auto">
        <div>
          <div className="max-w-sm mx-auto">
            <div className="text-center mb-20">
              <h3
                className="font-heading tracking-tight text-4xl font-bold mb-4"
                style={{
                  background: 'linear-gradient(to right, #32CD32, #228B22)',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                Login
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-8">
                <label className="block mb-2 text-sm font-medium" htmlFor="email">
                  Email
                </label>

                <CustomInput
                  type="email"
                  placeholder="Seu email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium" htmlFor="password">
                  Senha
                </label>
                <div className="relative">
                  <CustomInput
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Sua senha"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-0 mr-3 transform -translate-y-1/2 inline-block focus:outline-none text-gray-500 hover:text-yellowGreen-600"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </button>
                </div>
                <div className="text-right pt-1 pr-2">
                  <a
                    className="inline-block text-sm font-semibold text-green-600 hover:text-green-500"
                    href="#"
                  >
                    Esqueceu a senha?
                  </a>
                </div>
              </div>
              <button
                className="group relative flex items-center justify-center px-5 h-12 w-full font-bold text-white bg-gradient-to-br from-cyanGreen-800 to-cyan-800 rounded-lg transition-all duration-300 focus:outline-none"
                type="submit"
              >
                <div className="absolute top-0 left-0 w-full h-full rounded-lg ring ring-green-300 animate-pulse group-hover:ring-0 transition duration-300"></div>
                <span>Entrar</span>
              </button>
              <div className="my-4 flex items-center">
                <div className="h-px w-full bg-gray-200"></div>
                <span className="inline-block mx-4 text-xs font-medium text-gray-500">
                  OU
                </span>
                <div className="h-px w-full bg-gray-200"></div>
              </div>
              <div className="flex w-full justify-center">
                <GoogleLogin />
              </div>
              <p className="pt-5 text-sm text-center">
                <span className="mr-1 text-gray-500">Não tem uma conta?</span>
                <Link
                  className="inline-block text-teal-500 hover:text-teal-600 font-semibold"
                  to="/cadastro"
                >
                  Criar conta
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
