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

interface AddressFormProps {
  setShippingOption: (option: string) => void;
  setIsFormValid: (isFormValid: boolean) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({
  setShippingOption,
  setIsFormValid,
}) => {
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
          <TextField
            name="postalCode"
            label="CEP"
            fullWidth
            value={form.postalCode}
            onChange={handleCepChange}
            required
            disabled={form.postalCode.length === 9}
            size="small"
          />
        </Grid>
        <Grid item xs={4}>
          {form.postalCode.length === 9 ? (
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleCepReset}
            >
              Alterar
            </Button>
          ) : (
            <>
              {loading ? (
                <CircularProgress size={20} color="info" />
              ) : (
                <Button variant="contained" color="primary" fullWidth>
                  Buscar
                </Button>
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
            <ShippingOptions setShippingOption={setShippingOption} />
          </Box>
          <Typography variant="body1" mb={2}>
            Endereço
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="address"
                label="Endereço"
                fullWidth
                value={form.address}
                onChange={handleChange}
                required
                size="small"
                error={errors.address}
                helperText={errors.address ? 'Este campo é obrigatório' : ''}
                sx={{
                  '& .MuiOutlinedInput-root': { '&.Mui-error': { borderColor: 'red' } },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="number"
                label="Número"
                fullWidth
                value={form.number}
                onChange={handleChange}
                required
                size="small"
                error={errors.number}
                helperText={errors.number ? 'Este campo é obrigatório' : ''}
                sx={{
                  '& .MuiOutlinedInput-root': { '&.Mui-error': { borderColor: 'red' } },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="complement"
                label="Complemento"
                fullWidth
                value={form.complement}
                onChange={handleChange}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="neighborhood"
                label="Bairro"
                fullWidth
                value={form.neighborhood}
                onChange={handleChange}
                required
                size="small"
                error={errors.neighborhood}
                helperText={errors.neighborhood ? 'Este campo é obrigatório' : ''}
                sx={{
                  '& .MuiOutlinedInput-root': { '&.Mui-error': { borderColor: 'red' } },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="city"
                label="Cidade"
                fullWidth
                value={form.city}
                onChange={handleChange}
                required
                size="small"
                error={errors.city}
                helperText={errors.city ? 'Este campo é obrigatório' : ''}
                sx={{
                  '& .MuiOutlinedInput-root': { '&.Mui-error': { borderColor: 'red' } },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="state"
                label="Estado"
                fullWidth
                value={form.state}
                onChange={handleChange}
                required
                size="small"
                error={errors.state}
                helperText={errors.state ? 'Este campo é obrigatório' : ''}
                sx={{
                  '& .MuiOutlinedInput-root': { '&.Mui-error': { borderColor: 'red' } },
                }}
              />
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default AddressForm;
