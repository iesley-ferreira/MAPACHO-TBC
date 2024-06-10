import { CircularProgress, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAddressRequest } from '../../../store/ducks/address/actions'
import { RootState } from '../../../store/ducks/rootReducer'

interface AddressFormProps {
  setIsFormValid: (isFormValid: boolean) => void
}

const AddressForm: React.FC<AddressFormProps> = ({ setIsFormValid }) => {
  const dispatch = useDispatch()
  const { address, loading, error } = useSelector(
    (state: RootState) => state.address
  )

  const [addressLoaded, setAddressLoaded] = React.useState(false)

  const [formData, setFormData] = React.useState({
    userName: '',
    postalCode: '',
    address: '',
    addressNumber: '',
    complement: '',
    city: '',
    state: '',
  })

  const [fieldTouched, setFieldTouched] = useState({
    userName: false,
    postalCode: false,
    address: false,
    addressNumber: false,
    complement: false,
    city: false,
    state: false,
  })

  const [errors, setErrors] = useState({
    userName: '',
    postalCode: '',
    address: '',
    addressNumber: '',
    complement: '',
    city: '',
    state: '',
  })

  useEffect(() => {
    const newErrors = { ...errors }

    if (addressLoaded) {
      Object.keys(formData).forEach((field) => {
        if (!formData[field as keyof typeof formData].trim()) {
          newErrors[field as keyof typeof formData] = 'Este campo é obrigatório'
        }
      })
    }

    if (formData.postalCode.length === 8) {
      if (!formData.userName.trim()) {
        newErrors.userName = 'Este campo é obrigatório'
      }
      if (!formData.addressNumber.trim()) {
        newErrors.addressNumber = 'Este campo é obrigatório'
      }
    }

    setErrors(newErrors)
  }, [addressLoaded, formData, errors])

  useEffect(() => {
    if (!loading && address && !error) {
      setFormData({
        userName: formData.userName,
        postalCode: address.cep,
        address: address.logradouro,
        complement: address.complemento || '',
        city: address.localidade,
        state: address.uf,
        addressNumber: formData.addressNumber,
      })
      setErrors({
        ...errors,
        postalCode: '',
        address: '',
        addressNumber: '',
        complement: '',
        city: '',
        state: '',
      })
      setAddressLoaded(true)
    } else if (!loading && error) {
      setErrors((prev) => ({ ...prev, postalCode: 'CEP inválido' }))
    }
  }, [address, loading, error])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    let newValue = value

    if (name === 'postalCode') {
      newValue = value.replace(/\D/g, '')

      if (newValue.length === 8) {
        dispatch(fetchAddressRequest({ zipCode: newValue }))
        setErrors((prev) => ({ ...prev, postalCode: '' }))
      } else {
        setErrors((prev) => ({
          ...prev,
          postalCode:
            newValue.length > 0
              ? 'CEP precisa ter 8 dígitos'
              : 'Este campo é obrigatório',
        }))
      }
    } else if (name === 'userName') {
      const nameParts = value.trim().split(' ')
      if (
        nameParts.length >= 2 &&
        nameParts.every((part) => part.length >= 2)
      ) {
        setErrors((prev) => ({ ...prev, userName: '' }))
      } else {
        setErrors((prev) => ({
          ...prev,
          userName:
            value.trim() !== ''
              ? 'Nome e sobrenome são obrigatórios'
              : 'Este campo é obrigatório',
        }))
      }
    } else {
      if (
        addressLoaded &&
        !newValue.trim() &&
        ['address', 'city', 'state'].includes(name)
      ) {
        setErrors((prev) => ({ ...prev, [name]: 'Este campo é obrigatório' }))
      } else {
        setErrors((prev) => ({ ...prev, [name]: '' }))
      }
    }

    setFormData({ ...formData, [name]: newValue })
    setFieldTouched({ ...fieldTouched, [name]: true })
  }

  const isError = (field: keyof typeof formData) => {
    if (
      addressLoaded &&
      ['address', 'city', 'state'].includes(field) &&
      !formData[field]
    ) {
      return true
    }
    return !!errors[field]
  }

  useEffect(() => {
    const requiredFieldsFilled = Object.values(formData).every(
      (value) => value !== ''
    )
    const noErrors = Object.values(errors).every((value) => !value)
    setIsFormValid(requiredFieldsFilled && noErrors)
  }, [formData, errors])

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="p-6 bg-white shadow-lg w-full max-w-4xl mx-auto rounded-lg relative"
    >
      {loading && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <CircularProgress />
          </div>
        </>
      )}
      <Typography
        variant="h5"
        component="h1"
        sx={{ mt: 2, mb: 4 }}
        className="text-xl font-semibold mb-4"
      >
        Formulário de Envio
      </Typography>
      <Stack spacing={3} className="w-full">
        <TextField
          fullWidth
          required
          size="small"
          id="userName"
          name="userName"
          label="Nome Completo"
          value={formData.userName}
          onChange={handleChange}
          className=" bg-white focus:bg-white"
          variant="standard"
          error={isError('userName')}
          helperText={
            errors.userName ||
            (isError('userName') ? 'Este campo é obrigatório' : '')
          }
          InputLabelProps={{
            style: {
              color: isError('userName') ? 'red' : 'green',
            },
          }}
          inputProps={{
            style: {
              color: isError('userName') ? 'red' : 'green',
            },
          }}
        />

        <TextField
          fullWidth
          required
          size="small"
          id="postalCode"
          name="postalCode"
          label="CEP"
          value={formData.postalCode}
          onChange={handleChange}
          className=" bg-white focus:bg-white"
          variant="standard"
          error={!!errors.postalCode || error}
          helperText={errors.postalCode}
          InputLabelProps={{
            style: {
              color: isError('postalCode') ? 'red' : 'green',
            },
          }}
          inputProps={{
            style: {
              color: isError('postalCode') ? 'red' : 'green',
            },
            maxLength: 8,
          }}
        />

        {addressLoaded && formData.postalCode.length === 9 && (
          <>
            <TextField
              fullWidth
              required
              size="small"
              id="address"
              name="address"
              label="Endereço"
              value={formData.address}
              onChange={handleChange}
              className="bg-white focus:bg-white"
              variant="standard"
              error={isError('address')}
              helperText={
                errors.address || isError('address')
                  ? 'Este campo é obrigatório'
                  : ''
              }
              InputLabelProps={{
                style: {
                  color: isError('address') ? 'red' : 'green',
                },
              }}
              inputProps={{
                style: {
                  color: isError('address') ? 'red' : 'green',
                },
              }}
            />
            <TextField
              fullWidth
              required
              size="small"
              id="addressNumber"
              name="addressNumber"
              label="Número"
              value={formData.addressNumber}
              onChange={handleChange}
              type="number"
              placeholder="Ex: 92"
              className="bg-white focus:bg-white"
              variant="standard"
              error={isError('addressNumber')}
              helperText={
                errors.addressNumber || isError('addressNumber')
                  ? 'Este campo é obrigatório'
                  : ''
              }
              InputLabelProps={{
                style: {
                  color: isError('addressNumber') ? 'red' : 'green',
                },
              }}
              inputProps={{
                style: {
                  color: isError('addressNumber') ? 'red' : 'green',
                },
              }}
            />
            <TextField
              fullWidth
              size="small"
              id="complement"
              name="complement"
              label="Complemento"
              value={formData.complement}
              onChange={handleChange}
              placeholder="Ex: apartamento, bloco, etc."
              className="bg-white focus:bg-white"
              variant="standard"
              InputLabelProps={{
                style: {
                  color: isError('complement') ? 'red' : 'green',
                },
              }}
              inputProps={{
                style: {
                  color: isError('complement') ? 'red' : 'green',
                },
              }}
            />
            <TextField
              fullWidth
              required
              size="small"
              id="city"
              name="city"
              label="Cidade"
              value={formData.city}
              onChange={handleChange}
              className="bg-white focus:bg-white"
              variant="standard"
              error={isError('city')}
              helperText={
                errors.city || isError('city') ? 'Este campo é obrigatório' : ''
              }
              InputLabelProps={{
                style: {
                  color: isError('city') ? 'red' : 'green',
                },
              }}
              inputProps={{
                style: {
                  color: isError('city') ? 'red' : 'green',
                },
              }}
            />
            <TextField
              fullWidth
              required
              size="small"
              id="state"
              name="state"
              label="Estado"
              value={formData.state}
              onChange={handleChange}
              className="bg-white focus:bg-white"
              variant="standard"
              error={isError('state')}
              helperText={
                errors.state || isError('state')
                  ? 'Este campo é obrigatório'
                  : ''
              }
              InputLabelProps={{
                style: {
                  color: isError('state') ? 'red' : 'green',
                },
              }}
              inputProps={{
                style: {
                  color: isError('state') ? 'red' : 'green',
                },
              }}
            />
          </>
        )}
      </Stack>
    </form>
  )
}

export default AddressForm
