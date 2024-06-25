export const formatPhoneNumber = (value: string) => {
  value = value.replace(/\D/g, '');

  if (value.length > 0) {
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
  }
  if (value.length > 9) {
    value = value.replace(/(\d{5})(\d)/, '$1-$2');
  }

  return value;
};

export const validatePassword = (password: string) => {
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
  return passwordRegex.test(password);
};
