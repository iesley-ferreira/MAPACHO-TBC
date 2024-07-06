import { Typography } from '@mui/material';
import React from 'react';
import { priceFormatter } from '../../../utils/priceFormatter';

interface InstallmentPlanProps {
  totalPrice: number;
  color?: string;
}

const renderInstallment = (price: number): JSX.Element | string => {
  const tiers = [
    { upperBound: 79, installments: 1 },
    { upperBound: 120, installments: 2 },
    { upperBound: 160, installments: 3 },
    { upperBound: 200, installments: 4 },
    { upperBound: 240, installments: 5 },
    { upperBound: Infinity, installments: 6 },
  ];

  const tier = tiers.find((t) => price <= t.upperBound);
  if (!tier) return '';

  const installment = price / tier.installments;
  return (
    <>
      ou <strong>{tier.installments}x</strong> de{' '}
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
