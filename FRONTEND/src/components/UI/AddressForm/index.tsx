import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/ducks/rootReducer';
import { fetchAddressRequest } from '../../../store/ducks/shipping/actions';
import ShippingOptions from '../ShippingOptions';
import CustomInput from '../../common/CustomInput';

interface AddressFormProps {
  setIsFormValid: (isFormValid: boolean) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ setIsFormValid }) => {
  const { completeAddress, loading } = useSelector((state: RootState) => state.shipping);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    postalCode: '',
  });
  const [errors, setErrors] = useState({
    address: false,
    number: false,
    neighborhood: false,
    city: false,
    state: false,
  });

  useEffect(() => {
    if (completeAddress.postalCode !== '') {
      setForm({
        ...form,
        ...completeAddress,
      });
      validateForm({
        ...form,
        ...completeAddress,
      });
    }
  }, [completeAddress]);

  useEffect(() => {
    if (form.postalCode.length === 8) {
      const zipCode = form.postalCode;
      dispatch(fetchAddressRequest({ zipCode }));
    }
  }, [form.postalCode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedForm = {
      ...form,
      [name]: value,
    };
    setForm(updatedForm);
    validateForm(updatedForm);
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const valueClean = value.replace(/\D/g, '');
    const updatedForm = {
      ...form,
      postalCode: valueClean,
    };
    setForm(updatedForm);
    validateForm(updatedForm);
  };

  const handleCepReset = () => {
    const resetForm = {
      postalCode: '',
      address: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
    };
    setForm(resetForm);
    setErrors({
      address: false,
      number: false,
      neighborhood: false,
      city: false,
      state: false,
    });
    setIsFormValid(false);
  };

  const validateForm = (formToValidate: typeof form) => {
    const newErrors = {
      address: !formToValidate.address,
      number: !formToValidate.number,
      neighborhood: !formToValidate.neighborhood,
      city: !formToValidate.city,
      state: !formToValidate.state,
    };
    setErrors(newErrors);
    setIsFormValid(!Object.values(newErrors).some((error) => error));
  };

  return (
    <Box component="form" sx={{ mt: 3 }}>
      <div className="border-b border-coolGray-200 mb-6">
        <Typography component="h6" variant="h5" sx={{ mt: 2, mb: 2, color: '#22c55e' }}>
          <LocationOnIcon
            sx={{
              color: 'white',
              border: '2px solid #22c55e',
              borderRadius: '20%',
              backgroundColor: '#22c55e',
              padding: '2px',
              mr: 1,
              mb: 0.5,
            }}
          />
          Entrega
        </Typography>
      </div>
      <Grid container spacing={2} mb={6} alignItems="center">
        <Grid item xs={8}>
          <CustomInput
            name="postalCode"
            type="text"
            placeholder="CEP"
            value={form.postalCode}
            onChange={handleCepChange}
            disabled={form.postalCode.length === 9}
          />
        </Grid>
        <Grid item xs={4}>
          {form.postalCode.length === 9 ? (
            <button
              className="group relative flex items-center justify-center px-5 h-11 w-full font-bold text-white bg-gradient-to-br from-violet-800 to-violet-400 rounded-lg transition-all duration-300 focus:outline-none"
              type="submit"
              onClick={handleCepReset}
            >
              <div className="absolute top-0 left-0 w-full h-full rounded-lg  animate-pulse group-hover:ring-2 ring-indigo-300 transition duration-300"></div>
              <span>Alterar</span>
            </button>
          ) : (
            <>
              {loading ? (
                <CircularProgress size={20} color="info" />
              ) : (
                <button
                  className="group relative flex items-center justify-center px-5 h-11 w-full font-bold text-white bg-gradient-to-br from-cyanGreen-800 to-cyan-800 rounded-lg transition-all duration-300 focus:outline-none"
                  type="submit"
                >
                  <div
                    className="absolute top-0 left-0 w-full h-full rounded-lg  animate-pulse transition duration-300 group-hover:ring-2
                  ring-green-300 "
                  ></div>
                  <span>Buscar</span>
                </button>
              )}
            </>
          )}
        </Grid>
      </Grid>
      {form.postalCode.length === 9 && !loading && (
        <>
          <Box mt={3} mb={6}>
            <Typography variant="body1" mb={1}>
              Opções de Frete
            </Typography>
            <ShippingOptions />
          </Box>
          <Typography variant="body1" mb={2}>
            Endereço
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomInput
                name="address"
                type="text"
                placeholder="Endereço"
                value={form.address}
                onChange={handleChange}
              />
              {errors.address && (
                <p className="text-red-500 text-xs">*Endereço obrigatório</p>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomInput
                name="number"
                type="text"
                placeholder="Número"
                value={form.number}
                onChange={handleChange}
              />
              {errors.number && (
                <p className="text-red-500 text-xs">*Número obrigatório</p>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomInput
                name="complement"
                type="text"
                placeholder="Complemento"
                value={form.complement}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                name="neighborhood"
                type="text"
                placeholder="Complemento"
                value={form.neighborhood}
                onChange={handleChange}
              />
              {errors.neighborhood && (
                <p className="text-red-500 text-xs">*Bairro obrigatório</p>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomInput
                name="city"
                type="text"
                placeholder="Cidade"
                value={form.city}
                onChange={handleChange}
              />
              {errors.city && <p className="text-red-500 text-xs">*Cidade obrigatório</p>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomInput
                name="state"
                type="text"
                placeholder="Cidade"
                value={form.state}
                onChange={handleChange}
              />
              {errors.state && (
                <p className="text-red-500 text-xs">*Estado obrigatório</p>
              )}
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default AddressForm;
