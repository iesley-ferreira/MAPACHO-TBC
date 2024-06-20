import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const preventDefault = (event: React.SyntheticEvent) => event.preventDefault();

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    // <div className="p-4 md:p-0 md:max-w-md md:mx-auto mt-14">
    //   <div className="text-center mb-4">
    //     <h2 className="text-2xl font-semibold text-gray-800 mb-10">Login</h2>
    //   </div>
    //   <div>
    //     <Provider store={store}>
    //       <LoginForm />
    //     </Provider>
    //   </div>
    //   <div className="flex flex-col items-center justify-center p-3">
    //     <Link href="/cadastro">Cadastre-se</Link>
    //     <br />
    //     <Link href="/esqueci-senha" onClick={preventDefault}>
    //       Esqueci minha senha
    //     </Link>
    //     <p>ou</p>
    //   </div>
    //   <div>
    //     <GoogleLogin />
    //   </div>
    // </div>
    <section className="relative pt-16 pb-72 md:pb-24 bg-gray-50 overflow-hidden">
      <img
        className="absolute top-0 left-0 md:ml-20"
        src="/public/assets/shadow-light-top.png"
        alt="shadow-light-top"
      />
      <div className="relative container px-4 mx-auto">
        <div>
          <a className="inline-block mx-auto mb-8" href="#">
            <img className="h-8" src="aurora-assets/logos/aurora-logo.svg" alt="" />
          </a>
          <div className="max-w-sm mx-auto">
            <div className="text-center mb-20">
              <h3 className="font-heading tracking-tight text-4xl font-bold mb-4">
                Entrar
              </h3>
              {/* <p className="text-gray-500 mb-8">Crie sua conta com o email.</p> */}
            </div>
            <form action="">
              <div className="mb-8">
                <label className="block mb-2 text-sm font-medium" for="">
                  Email
                </label>
                <input
                  className="py-2 px-4 h-11 w-full text-gray-500 placeholder-gray-500 bg-white border border-gray-200 focus:border-yellowGreen-500 rounded-lg shadow-sm outline-none ring-1 ring-transparent focus:ring-yellowGreen-500"
                  type="email"
                  placeholder="Seu email"
                />
              </div>
              <div className="mb-8">
                <label className="block mb-2 text-sm font-medium" for="">
                  Senha
                </label>
                <div className="relative">
                  <input
                    className="relative py-2 px-4 h-11 w-full text-gray-500 placeholder-gray-500 bg-white border border-gray-200 focus:border-yellowGreen-500 rounded-lg shadow-sm outline-none ring-1 ring-transparent focus:ring-yellowGreen-500"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Sua senha"
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-0 mr-3 transform -translate-y-1/2 inline-block focus:outline-none text-gray-500 hover:text-yellowGreen-600"
                  >
                    {showPassword ? (
                      <VisibilityOff onClick={handleClickShowPassword} />
                    ) : (
                      <Visibility onClick={handleClickShowPassword} />
                    )}
                  </button>
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
                  OR
                </span>
                <div className="h-px w-full bg-gray-200"></div>
              </div>
              <a
                className="inline-flex w-full h-12 mb-8 py-2 px-5 items-center justify-center text-base font-bold text-gray-700 hover:text-yellowGreen-700 bg-white border border-gray-200 hover:border-yellowGreen-600 shadow-sm hover:shadow-none rounded-lg transition duration-200"
                href="#"
              >
                <svg
                  width="20"
                  height="20"
                  viewbox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 1.91663C12.0354 1.91663 13.89 2.67488 15.3114 3.91834L13.3034 5.92639C12.4018 5.19322 11.2539 4.74996 10 4.74996C7.10068 4.74996 4.75 7.10064 4.75 9.99996C4.75 12.8993 7.10068 15.25 10 15.25C12.286 15.25 14.2241 13.7867 14.9452 11.7501L15.0633 11.4166H14.7096H10.25V8.58329H17.25V8.61788H17.5H17.9634C18.0412 9.06748 18.0833 9.52903 18.0833 9.99996C18.0833 14.464 14.464 18.0833 10 18.0833C5.53599 18.0833 1.91667 14.464 1.91667 9.99996C1.91667 5.53595 5.53599 1.91663 10 1.91663Z"
                    fill="#FFC107"
                    stroke="#3B5444"
                    stroke-width="0.5"
                  ></path>
                  <path
                    d="M2.6275 6.12121L5.36542 8.12913C6.10625 6.29496 7.90042 4.99996 10 4.99996C11.2746 4.99996 12.4342 5.48079 13.3171 6.26621L15.6742 3.90913C14.1858 2.52204 12.195 1.66663 10 1.66663C6.79917 1.66663 4.02333 3.47371 2.6275 6.12121Z"
                    fill="#FF3D00"
                  ></path>
                  <path
                    d="M10 18.3334C12.1525 18.3334 14.1083 17.5096 15.5871 16.17L13.0079 13.9875C12.1431 14.6452 11.0864 15.0009 10 15C7.8325 15 5.99208 13.618 5.29875 11.6892L2.58125 13.783C3.96042 16.4817 6.76125 18.3334 10 18.3334Z"
                    fill="#4CAF50"
                  ></path>
                  <path
                    d="M18.1713 8.36796H17.5V8.33337H10V11.6667H14.7096C14.3809 12.5902 13.7889 13.3972 13.0067 13.988L13.0079 13.9871L15.5871 16.1696C15.4046 16.3355 18.3333 14.1667 18.3333 10C18.3333 9.44129 18.2758 8.89587 18.1713 8.36796Z"
                    fill="#1976D2"
                  ></path>
                </svg>
                <span className="ml-2">Continuar com o Google</span>
              </a>
              <p className="text-sm text-center">
                <span className="mr-1 text-gray-500">Não tem uma conta?</span>
                <Link
                  className="inline-block text-teal-500 hover:text-yellowGreen-600 font-semibold"
                  to="/login"
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
