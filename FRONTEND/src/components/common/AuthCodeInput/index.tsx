import { Box, TextField, styled } from '@mui/material';
import React, { useRef } from 'react';

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

interface AuthCodeInputProps {
  code: string;
  setCode: (code: string) => void;
  handleCodeSubmit: (event: React.FormEvent) => void;
}

const AuthCodeInput: React.FC<AuthCodeInputProps> = ({
  code,
  setCode,
  handleCodeSubmit,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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

  return (
    <form onSubmit={handleCodeSubmit} className="flex flex-col items-center">
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
  );
};

export default AuthCodeInput;
