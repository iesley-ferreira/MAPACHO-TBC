export const calculateDiscount = (code: string): number | null => {
  switch (code) {
    case 'PRIMEIRACOMPRA10':
      return 0.1;
    case 'BRUXELAS420':
      return 0.2;
    default:
      return null;
  }
};
