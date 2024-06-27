import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddressForm from '../../components/UI/AddressForm';
import CustomStepper from '../../components/UI/CustomizedSteppers';
import CustomButton from '../../components/common/CustomButton';

const Shipping: React.FC = () => {
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = React.useState(false);

  const handlePaymentClick = () => {
    navigate('/pagamento');
  };

  return (
    <div className=" min-h-screen flex flex-col items-center justify-center pb-16">
      <div className="container mx-auto px-3 py-10">
        <div className="customStepper flex align-center justify-center w-full py-16">
          <CustomStepper activeStep={0} />
        </div>
        <div className="addressForm flex justify-center w-full">
          <AddressForm setIsFormValid={setIsFormValid} />
        </div>
        <div className="flex align-center justify-center button-pagamento pt-12 pb-6 w-full">
          <CustomButton
            type="button"
            variant="contained"
            size="large"
            disabled={!isFormValid}
            className="w-full max-w-xl"
            onClick={handlePaymentClick}
            sx={{
              '&:hover': {
                backgroundColor: !isFormValid ? '' : '#1f9d45',
              },
            }}
          >
            Ir para Pagamento
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
