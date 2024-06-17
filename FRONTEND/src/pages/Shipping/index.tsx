import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddressForm from '../../components/UI/AddressForm2';
import CustomStepper from '../../components/UI/CustomStepper';
import CustomButton from '../../components/common/CustomButton';

const Shipping: React.FC = () => {
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [shippingOption, setShippingOption] = React.useState('buscar-na-loja');

  const handlePaymentClick = () => {
    navigate('/pagamento');
  };

  useEffect(() => {
    console.log('Shipping Option:', shippingOption);
  }, [shippingOption]);

  return (
    <div className=" flex flex-col items-center w-full mt-20 px-4 py-2">
      <div className="customStepper w-full max-w-2xl my-6">
        <CustomStepper activeStep={0} />
      </div>
      <div className="addressForm my-6 w-full max-w-xl">
        <AddressForm
          setShippingOption={setShippingOption}
          setIsFormValid={setIsFormValid}
        />
      </div>
      <div className="button-pagamento pt-6 pb-6 w-full max-w-xl">
        <CustomButton
          type="button"
          variant="contained"
          size="large"
          disabled={!isFormValid || !shippingOption}
          className=" w-full  max-w-xl"
          onClick={handlePaymentClick}
          sx={{
            backgroundColor: !isFormValid || !shippingOption ? '' : '#22c55e',
            '&:hover': {
              backgroundColor: !isFormValid || !shippingOption ? '' : '#1f9d45',
            },
          }}
        >
          Ir para Pagamento
        </CustomButton>
      </div>
    </div>
  );
};

export default Shipping;
