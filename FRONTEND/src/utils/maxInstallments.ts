export function calculateInstallments(amount: number): number {
  if (amount <= 79) {
    return 1;
  } else if (amount <= 119) {
    return 2;
  } else if (amount <= 159) {
    return 3;
  } else if (amount <= 199) {
    return 4;
  } else if (amount <= 239) {
    return 5;
  } else {
    return 6;
  }
}
