import React from 'react'
import AddressForm from '../../components/UI/AddressForm'
import CustomStepper from '../../components/UI/CustomStepper'
import ShippingOptions from '../../components/UI/ShippingOptions'
import CustomButton from '../../components/common/CustomButton'

interface ShippingProps {
  // Defina as propriedades do componente aqui
}

const Shipping: React.FC<ShippingProps> = () => {
  const [isFormValid, setIsFormValid] = React.useState(false)
  const [shippingOption, setShippingOption] = React.useState('')
  return (
    <div className=" flex flex-col items-center w-full px-4 py-2 ">
      <div className="customStepper w-full max-w-2xl my-6">
        <CustomStepper activeStep={0} />
      </div>
      <div className="addressForm my-6 w-full max-w-xl">
        <AddressForm setIsFormValid={setIsFormValid} />
      </div>
      <div>
        <ShippingOptions />
      </div>
      <div className="button-pagamento py-10 w-full max-w-xl">
        <CustomButton
          type="button"
          variant="contained"
          color="success"
          size="large"
          disabled={!isFormValid || !shippingOption}
          className=" w-full  max-w-xl"
          onClick={() => {
            // envia para pagina de pagamento
          }}
        >
          Pagamento
        </CustomButton>
      </div>
    </div>
  )
}

export default Shipping
