import { Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../../components/UI/RegisterForm';
import { RootState } from '../../store/ducks/rootReducer';
import { createUserRequest } from '../../store/ducks/user/actions';

const Register: React.FC = () => {
  const dispatch = useDispatch();
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
  const { isCodeSent, error, error_message, user } = useSelector(
    (state: RootState) => state.user,
  );

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const name = `${formData.nome} ${formData.sobrenome}`;
    const email = formData.email;
    const password = formData.senha;
    const user = { name, email, password };
    dispatch(createUserRequest(user));
  };

  useEffect(() => {
    if (error) {
      setSnackbarOpen(true);
    }
  }, [error]);

  useEffect(() => {
    if (isCodeSent) {
      navigate('/autenticacao');
    }
  }, [isCodeSent]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <section className="relative pt-28 bg-gray-50 overflow-hidden bg-[url(/public/assets/shadow-light-top.png)] bg-no-repeat bg-cover">
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
            <RegisterForm
              formData={formData}
              setFormData={setFormData}
              handleFormSubmit={handleFormSubmit}
            />
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
