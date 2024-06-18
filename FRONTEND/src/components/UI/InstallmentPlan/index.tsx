import { Typography } from '@mui/material';
import React from 'react';
import { priceFormatter } from '../../../utils/priceFormatter';

interface InstallmentPlanProps {
  totalPrice: number;
}

const renderInstallment = (price: number): string => {
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
  return `${tier.installments}x de ${priceFormatter.format(installment)}`;
};

const InstallmentPlan: React.FC<InstallmentPlanProps> = ({ totalPrice }) => {
  return (
    <Typography
      variant="subtitle1"
      sx={{
        fontFamily: 'Montserrat',
        fontSize: '14px',
        color: 'green',
      }}
    >
      até {renderInstallment(totalPrice)} sem Juros
    </Typography>
  );
};

export default InstallmentPlan;
