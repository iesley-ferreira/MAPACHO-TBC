import React from 'react'
// import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ErrorBoundary from '../../components/ErrorBunary'
import AddressForm from '../../components/UI/AddressForm'
import CustomStepper from '../../components/UI/CustomStepper'
import ShippingOptions from '../../components/UI/ShippingOptions'
import CustomButton from '../../components/common/CustomButton'

interface ShippingProps {
  // Defina as propriedades do componente aqui
}

//TODO: Implementar a função de envio de dados para o backend e salvar no estado global da aplicação

const Shipping: React.FC<ShippingProps> = () => {
  // const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isFormValid, setIsFormValid] = React.useState(false)
  const [shippingOption, setShippingOption] = React.useState('')

  const handlePaymentClick = () => {
    // dispatch(updateUserShippingOption(shippingOption))
    navigate('/pagamento')
  }

  return (
    <div className=" flex flex-col items-center w-full px-4 py-2 ">
      <div className="customStepper w-full max-w-2xl my-6">
        <CustomStepper activeStep={0} />
      </div>
      <div className="addressForm my-6 w-full max-w-xl">
        <ErrorBoundary>
          <AddressForm setIsFormValid={setIsFormValid} />
        </ErrorBoundary>
      </div>
      <div className="shippingOptions my-6 w-full max-w-xl">
        <ErrorBoundary>
          <ShippingOptions setShippingOption={setShippingOption} />
        </ErrorBoundary>
      </div>
      <div className="button-pagamento py-10 w-full max-w-xl">
        <CustomButton
          type="button"
          variant="contained"
          color="success"
          size="large"
          disabled={!isFormValid || !shippingOption}
          className=" w-full  max-w-xl"
          onClick={handlePaymentClick}
        >
          Pagamento
        </CustomButton>
      </div>
    </div>
  )
}

export default Shipping
