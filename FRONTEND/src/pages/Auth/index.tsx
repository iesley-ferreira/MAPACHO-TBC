import { Box, Snackbar, TextField, styled } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/ducks/rootReducer';
import { verifyAuthCodeRequest } from '../../store/ducks/user/actions';

const InputBox = styled(TextField)(() => ({
  width: '30px',
  height: '40px',
  margin: '0 2.5px',
  textAlign: 'center',
  borderRadius: '4px',
  fontSize: '24px',
  '& input': {
    textAlign: 'center',
    fontSize: '24px',
    padding: '0',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'gray',
    },
    '&:hover fieldset': {
      borderColor: 'gray',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#ADFF2F',
    },
  },
}));

const Auth: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [counter, setCounter] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { user, error } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/usuario');
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      setSnackbarOpen(true);
    }
  }, [error]);

  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [counter]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    const value = event.target.value;
    if (!/^\d*$/.test(value)) return;

    const newCode = code.split('');
    newCode[index] = value;
    setCode(newCode.join(''));

    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, index: number) => {
    if (event.key === 'Backspace' && index > 0 && !code[index]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData('text');
    if (!/^\d*$/.test(pasteData)) return;

    const newCode = pasteData.split('').slice(0, 6);
    setCode(newCode.join(''));

    newCode.forEach((value, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index]!.value = value;
      }
    });

    if (newCode.length === 6 && inputRefs.current[5]) {
      inputRefs.current[5]!.focus();
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const email = user.email;
    const data = { email, code };
    try {
      dispatch(verifyAuthCodeRequest(data));
    } catch (error: any) {
      console.error('Erro ao verificar o código de autenticação:', error);
    }
  };

  const handleResendCode = () => {
    // const email = user.email;
    // dispatch(resendAuthCodeRequest({ email }));
    setCounter(60);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gray-50 overflow-hidden">
      <img
        className="absolute top-0 left-0 md:ml-20"
        src="/public/assets/shadow-light-top.png"
        alt="shadow-light-top"
      />
      <div className="relative container px-4 mx-auto">
        <div>
          <div className="max-w-sm mx-auto">
            <div className="text-center mb-14">
              <h3
                className="font-heading tracking-tight text-4xl font-bold mb-4"
                style={{
                  background: 'linear-gradient(to right, #32CD32, #228B22)',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                Autenticação
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
              <div className="text-center mb-14">
                <p className="font-heading tracking-tight text-md font-bold mb-4 text-slate-600">
                  Informe o código de autenticação
                </p>
                <p className="font-heading tracking-tight text-md font-bold mb-4 text-slate-600">
                  recebido por e-mail
                </p>
              </div>
              <Box
                display="flex"
                justifyContent="space-between"
                sx={{ marginBottom: '50px', width: '240px' }}
              >
                {Array.from({ length: 6 }).map((_, index) => (
                  <InputBox
                    key={index}
                    variant="outlined"
                    value={code[index] || ''}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    inputRef={(el) => (inputRefs.current[index] = el)}
                    inputProps={{
                      maxLength: 1,
                      style: { textAlign: 'center', fontSize: '24px' },
                      inputMode: 'numeric',
                    }}
                  />
                ))}
              </Box>
              <button
                className="group relative flex items-center justify-center px-5 h-12 w-full font-bold text-white bg-gradient-to-br from-cyanGreen-800 to-cyan-800 rounded-lg transition-all duration-300 focus:outline-none"
                type="submit"
              >
                <div className="absolute top-0 left-0 w-full h-full rounded-lg ring ring-green-300 animate-pulse group-hover:ring-0 transition duration-300"></div>
                <span>Verificar</span>
              </button>
            </form>
            {counter > 0 ? (
              <p className="text-center mt-4 text-slate-600">
                Reenviar código em {counter} segundos
              </p>
            ) : (
              <p className="text-center mt-4 text-slate-600">
                Não recebeu o código?{' '}
                <button onClick={handleResendCode} className="text-purple-700 underline">
                  Reenviar código
                </button>
              </p>
            )}
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000}
              onClose={handleSnackbarClose}
              message="Código de autenticação inválido"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;
