import { Snackbar } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axiosConfig';
import RegisterForm from '../../components/UI/RegisterForm';
import AuthCodeInput from '../../components/common/AuthCodeInput';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    telefone: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [code, setCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const email = formData.email;
    const password = formData.senha;
    const name = `${formData.nome} ${formData.sobrenome}`;
    try {
      const response = await axios.post(`auth/signUp`, { email, password, name });

      console.log('response', response);

      if (response.data.message) {
        setIsCodeSent(true);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setSnackbarOpen(true);
      } else {
        console.error('Erro ao registrar usuário:', error);
      }
    }
  };

  const handleCodeSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const email = formData.email;
    try {
      const response = await axios.post(`auth/verifyAuthCode`, { email, code });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/usuario');
      }
    } catch (error: any) {
      console.error('Erro ao verificar o código de autenticação:', error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <section className="relative pt-28 bg-gray-50 overflow-hidden">
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
                Cadastro
              </h3>
            </div>
            {!isCodeSent ? (
              <RegisterForm
                formData={formData}
                setFormData={setFormData}
                handleFormSubmit={handleFormSubmit}
              />
            ) : (
              <AuthCodeInput
                code={code}
                setCode={setCode}
                handleCodeSubmit={handleCodeSubmit}
              />
            )}
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000}
              onClose={handleSnackbarClose}
              message="O email já está cadastrado"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
