import { Box, Card } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateOrderByPixRequest } from '../../../store/ducks/order/actions';
import { RootState } from '../../../store/ducks/rootReducer';
import CustomInput from '../../common/CustomInput';

export interface PixQRCodeProps {
  total: number;
}

const PixQRCode: React.FC<PixQRCodeProps> = ({ total }) => {
  const dispatch = useDispatch();
  const [showQRCode, setShowQRCode] = useState(false);
  const [pixDetails, setPixDetails] = useState({
    email: '',
    identificationType: 'cpf',
    identificationNumber: '',
  });

  const { ticketUrl } = useSelector((state: RootState) => state.order);

  useEffect(() => {
    if (ticketUrl) {
      setShowQRCode(true);
    }
  }, [ticketUrl]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setPixDetails({ ...pixDetails, [name]: value });
  };

  const generateQRCode = () => {
    console.log('Generating QR code');

    dispatch(
      generateOrderByPixRequest({
        transaction_amount: total,
        description: 'Pagamento mapacho-tbc teste',
        paymentMethodId: 'pix',
        email: pixDetails.email,
        // email: 'iesley_ferreira@hotmail.com',
        identificationType: pixDetails.identificationType,
        // identificationType: 'cpf',
        number: pixDetails.identificationNumber,
        // number: '12345678909',
      }),
    );
  };

  return (
    <div className="mt-4 flex w-full justify-center">
      {showQRCode && ticketUrl ? (
        <Box display={'flex'} flexDirection={'column'} width={'100%'} gap={4}>
          <Card sx={{ width: '100%', height: 620 }}>
            <iframe src={ticketUrl} width="100%" height="100%" />
          </Card>
        </Box>
      ) : (
        <div className='className="flex flex-col'>
          <div className="mb-4">
            <label htmlFor="input-01-2" className="mb-1.5 inline-block text-sm">
              email
            </label>
            <CustomInput
              id="input-01-2"
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleInputChange}
              value={pixDetails.email}
              maxLength={30}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="select-identification-type"
              className="mb-1.5 inline-block text-sm"
            >
              Tipo de Identificação
            </label>
            <select
              id="select-identification-type"
              name="identificationType"
              onChange={handleInputChange}
              value={pixDetails.identificationType}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="cpf">CPF</option>
              <option value="rg">RG</option>
              <option value="outro">CNPJ</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="input-identification-number"
              className="mb-1.5 inline-block text-sm"
            >
              Número de Identificação
            </label>
            <CustomInput
              id="input-identification-number"
              name="identificationNumber"
              type="text"
              placeholder="Número de Identificação"
              onChange={handleInputChange}
              value={pixDetails.identificationNumber}
              maxLength={30}
            />
          </div>
          <div className="flex w-full justify-center py-4">
            <button
              onClick={generateQRCode}
              className="px-4 py-2 text-sm text-white font-heading uppercase bg-gray-800 hover:bg-gray-700 rounded-md"
            >
              Gerar QR code
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export { PixQRCode };
