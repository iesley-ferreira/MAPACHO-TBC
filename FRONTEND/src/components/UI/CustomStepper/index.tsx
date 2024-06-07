import CreditCardIcon from '@mui/icons-material/CreditCard'
import DoneIcon from '@mui/icons-material/Done'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import Stack from '@mui/material/Stack'
import Step from '@mui/material/Step'
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector'
import { StepIconProps } from '@mui/material/StepIcon'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import { styled } from '@mui/material/styles'
import React from 'react'

const darkerGreen = '#006400'

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: `linear-gradient( 95deg, ${darkerGreen} 0%, ${darkerGreen} 100%)`,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: `linear-gradient( 95deg, ${darkerGreen} 0%, ${darkerGreen} 100%)`,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}))

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean }
}>(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient(136deg, rgb(73, 242, 56) 0%, rgb(47, 209, 97) 50%, rgb(7, 176, 111) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient(136deg, rgb(73, 242, 56) 0%, rgb(47, 209, 97) 50%, rgb(7, 176, 111) 100%)',
  }),
}))

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props

  const icons: { [index: string]: React.ReactElement } = {
    1: <LocalShippingIcon />,
    2: <CreditCardIcon />,
    3: <DoneIcon />,
  }

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  )
}

interface CustomizedSteppersProps {
  activeStep: number
}

const steps = ['Entrega', 'Pagamento', 'Compra Finalizada']

const CustomizedSteppers: React.FC<CustomizedSteppersProps> = ({
  activeStep,
}) => {
  return (
    <Stack sx={{ width: '100%' }} spacing={4}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((label, index) => (
          <Step key={label} completed={activeStep > index}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  )
}

export default CustomizedSteppers
