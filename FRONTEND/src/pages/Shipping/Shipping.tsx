import React from 'react'
import ErrorBoundary from '../../components/ErrorBunary'
import AddressForm from '../../components/UI/AddressForm'
import CustomStepper from '../../components/UI/CustomStepper'

interface ShippingProps {
  // Defina as propriedades do componente aqui
}

const Shipping: React.FC<ShippingProps> = () => {
  return (
    <>
      <div className="customStepper my-6">
        <CustomStepper activeStep={0} />
      </div>
      <div className="customStepper m-6">
        <ErrorBoundary>
          <AddressForm />
        </ErrorBoundary>
      </div>
    </>
  )
}

export default Shipping
