import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import CustomInput from '../../common/CustomInput';
import GoogleLogin from '../GoogleLogin';
import { formatPhoneNumber, validatePassword } from './helpers';

interface RegisterFormProps {
  formData: {
    nome: string;
    sobrenome: string;
    telefone: string;
    email: string;
    senha: string;
    confirmarSenha: string;
  };
  setFormData: (formData: {
    nome: string;
    sobrenome: string;
    telefone: string;
    email: string;
    senha: string;
    confirmarSenha: string;
  }) => void;
  handleFormSubmit: (event: React.FormEvent) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  formData,
  setFormData,
  handleFormSubmit,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.nome) newErrors.nome = 'Nome é obrigatório';
    if (!formData.sobrenome) newErrors.sobrenome = 'Sobrenome é obrigatório';
    if (!formData.telefone) {
      newErrors.telefone = 'Telefone é obrigatório';
    } else if (formData.telefone.replace(/\D/g, '').length !== 11) {
      newErrors.telefone = 'Telefone deve conter 11 números';
    }
    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.senha) {
      newErrors.senha = 'Senha é obrigatória';
    } else if (!validatePassword(formData.senha)) {
      newErrors.senha =
        'A senha deve ter pelo menos 6 caracteres, incluindo um número e um caractere especial.';
    }
    if (!formData.confirmarSenha) {
      newErrors.confirmarSenha = 'Confirmação de senha é obrigatória';
    } else if (formData.senha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = 'As senhas não coincidem';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newValue = name === 'telefone' ? formatPhoneNumber(value) : value;
    setFormData({ ...formData, [name]: newValue });

    if (errors[name]) {
      validateForm();
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      handleFormSubmit(event);
    }
  };

  console.log('formData', formData);

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium" htmlFor="nome">
          Nome
        </label>
        <CustomInput
          type="text"
          name="nome"
          placeholder="Primeiro nome"
          value={formData.nome}
          onChange={handleChange}
        />
        {errors.nome && <p className="text-red-500 text-xs">{errors.nome}</p>}
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium" htmlFor="sobrenome">
          Sobrenome
        </label>
        <CustomInput
          type="text"
          name="sobrenome"
          placeholder="Segundo nome"
          value={formData.sobrenome}
          onChange={handleChange}
        />
        {errors.sobrenome && <p className="text-red-500 text-xs">{errors.sobrenome}</p>}
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium" htmlFor="telefone">
          Telefone
        </label>
        <CustomInput
          type="tel"
          name="telefone"
          placeholder="(XX) XXXXX-XXXX"
          maxLength={15}
          value={formData.telefone}
          onChange={handleChange}
        />
        {errors.telefone && <p className="text-red-500 text-xs">{errors.telefone}</p>}
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium" htmlFor="email">
          Email
        </label>
        <CustomInput
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium" htmlFor="Senha">
          Senha
        </label>
        <div className="relative">
          <CustomInput
            type={showPassword ? 'text' : 'password'}
            name="senha"
            placeholder="Senha"
            value={formData.senha}
            onChange={handleChange}
          />
          <button
            type="button"
            className="absolute top-1/2 right-0 mr-3 transform -translate-y-1/2 inline-block focus:outline-none text-gray-500 hover:text-yellowGreen-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </button>
        </div>
        {errors.senha && <p className="text-red-500 text-xs">{errors.senha}</p>}
      </div>
      <div className="mb-8">
        <label className="block mb-2 text-sm font-medium" htmlFor="confirmarSenha">
          Confirmar Senha
        </label>
        <CustomInput
          className="py-2 px-4 h-11 w-full text-gray-500 placeholder-gray-500 bg-white border border-gray-200 focus:border-yellowGreen-500 rounded-lg shadow-sm outline-none ring-1 ring-transparent focus:ring-yellowGreen-500"
          type={showPassword ? 'text' : 'password'}
          name="confirmarSenha"
          placeholder="Confirmar Senha"
          value={formData.confirmarSenha}
          onChange={handleChange}
        />
        {errors.confirmarSenha && (
          <p className="text-red-500 text-xs">{errors.confirmarSenha}</p>
        )}
      </div>
      <button
        className="group relative flex items-center justify-center px-5 h-12 w-full font-bold text-white bg-gradient-to-br from-cyanGreen-800 to-cyan-800 rounded-lg transition-all duration-300 focus:outline-none"
        type="submit"
      >
        <div className="absolute top-0 left-0 w-full h-full rounded-lg ring ring-green-300 animate-pulse group-hover:ring-0 transition duration-300"></div>
        <span>Registrar</span>
      </button>
      <div className="my-4 flex items-center">
        <div className="h-px w-full bg-gray-200"></div>
        <span className="inline-block mx-4 text-xs font-medium text-gray-500">OU</span>
        <div className="h-px w-full bg-gray-200"></div>
      </div>
      <div className="flex w-full justify-center">
        <GoogleLogin />
      </div>
    </form>
  );
};

export default RegisterForm;
