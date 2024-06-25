export const dateFormatter = (date: string) => {
  const getDate = new Date(date);
  const formattedDate = getDate.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  return formattedDate;
};
