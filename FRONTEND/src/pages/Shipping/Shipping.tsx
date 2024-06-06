import React from 'react'
import AddressForm from '../../components/UI/AddressForm'
import CustomStepper from '../../components/UI/CustomStepper'
import CustomButton from '../../components/common/CustomButton'

interface ShippingProps {
  // Defina as propriedades do componente aqui
}

const Shipping: React.FC<ShippingProps> = () => {
  const [isFormValid, setIsFormValid] = React.useState(false)
  return (
    <div className=" flex flex-col items-center w-full px-4 py-2 ">
      <div className="customStepper w-full max-w-4xl my-6">
        <CustomStepper activeStep={0} />
      </div>
      <div className="addressForm my-6 w-full max-w-xl">
        <AddressForm setIsFormValid={setIsFormValid} />
      </div>
      <div>
        <p className="text-lg font-medium mt-6">Opções de Envio</p>
        <p className="text-base text-gray-600">Envio padrão</p>
      </div>
      <CustomButton
        type="button"
        variant="contained"
        color="success"
        size="large"
        disabled={!isFormValid}
        className="mt-4 w-full  max-w-xl"
      >
        Pagamento
      </CustomButton>
    </div>
  )
}

export default Shipping
