import { Typography } from '@mui/material'
import React from 'react'

interface InstallmentPlanProps {
  totalPrice: number
}

const renderInstallment = (price: number): string => {
  const tiers = [
    { upperBound: 79, installments: 1 },
    { upperBound: 120, installments: 2 },
    { upperBound: 160, installments: 3 },
    { upperBound: 200, installments: 4 },
    { upperBound: 240, installments: 5 },
    { upperBound: Infinity, installments: 6 },
  ]

  const tier = tiers.find((t) => price <= t.upperBound)
  if (!tier) return ''

  const installment = price / tier.installments
  return `${tier.installments}x de R$${installment.toFixed(2).replace('.', ',')}`
}

const InstallmentPlan: React.FC<InstallmentPlanProps> = ({ totalPrice }) => {
  return (
    <Typography variant="subtitle1" color="textSecondary">
      ou {renderInstallment(totalPrice)} sem Juros
    </Typography>
  )
}

export default InstallmentPlan
