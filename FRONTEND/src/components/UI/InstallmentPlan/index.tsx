import { Typography } from '@mui/material';
import React from 'react';
import { calculateInstallments } from '../../../utils/maxInstallments';
import { priceFormatter } from '../../../utils/priceFormatter';

interface InstallmentPlanProps {
  totalPrice: number;
  color?: string;
}

const renderInstallment = (amount: number): JSX.Element | string => {
  const numberOfInstallments = calculateInstallments(amount);

  const installment = amount / numberOfInstallments;

  return (
    <>
      ou <strong>{numberOfInstallments}x</strong> de{' '}
      <strong>{priceFormatter.format(installment)}</strong>
    </>
  );
};

const InstallmentPlan: React.FC<InstallmentPlanProps> = ({ totalPrice, color }) => {
  return (
    <Typography
      variant="subtitle1"
      sx={{
        fontFamily: 'Montserrat',
        fontSize: '14px',
        fontWeight: 500,
        color: { color },
      }}
    >
      {renderInstallment(totalPrice)}
    </Typography>
  );
};

export default InstallmentPlan;
