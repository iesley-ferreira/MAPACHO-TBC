import { Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAddressRequest } from '../../../store/ducks/address/actions'
import { RootState } from '../../../store/ducks/rootReducer'

interface AddressFormProps {
  setIsFormValid: (isFormValid: boolean) => void
}

//Salvar numero formData no estado global
//Mais ajustes no preenchimento do form

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

  const formatPostalCode = (postalCode: string) => {
    const cleaned = postalCode.replace(/\D/g, '')
    return cleaned.length > 5
      ? `${cleaned.slice(0, 5)}-${cleaned.slice(5)}`
      : cleaned
  }

  const normalizeZipCode = (postalCode: string) => {
    return postalCode.replace(/\D/g, '')
  }

  const fetchAddress = async (postalCode: string) => {
    const cleanedZipCode = normalizeZipCode(postalCode)
    if (cleanedZipCode.length === 8) {
      dispatch(fetchAddressRequest({ zipCode: cleanedZipCode }))
    }
  }

  useEffect(() => {
    if (!loading && address && !error) {
      setFormData((prev) => ({
        ...prev,
        postalCode: address.cep,
        address: address.logradouro,
        complement: address.complemento || '',
        city: address.localidade,
        state: address.uf,
      }))
      setAddressLoaded(true)
      // Atualiza todos os campos para não tocados, exceto os que já foram alterados
      setFieldTouched((prev) => ({
        ...prev,
        address: false,
        complement: false,
        city: false,
        state: false,
        postalCode: false, // Adicione postalCode aqui se for necessário
      }))
    }
  }, [address, loading, error])

  useEffect(() => {
    const requiredFieldsFilled =
      formData.userName !== '' &&
      formData.postalCode !== '' &&
      formData.address !== '' &&
      formData.addressNumber !== '' &&
      formData.city !== '' &&
      formData.state !== ''

    const isValidPostalCode = /^[0-9]{8}$/.test(
      normalizeZipCode(formData.postalCode)
    )

    setIsFormValid(requiredFieldsFilled && isValidPostalCode)
  }, [formData])

  useEffect(() => {
    if (formData.postalCode.replace(/\D/g, '').length === 8) {
      fetchAddress(formData.postalCode)
    }
  }, [formData.postalCode])

  const isError = (field: keyof typeof formData) => {
    // Só verifica erros se o campo foi tocado ou se o endereço foi carregado
    return (fieldTouched[field] || addressLoaded) && !formData[field]
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Marca como tocado só quando o usuário interage
    if (!fieldTouched[name]) {
      setFieldTouched((prev) => ({ ...prev, [name]: true }))
    }
  }

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="p-6 bg-white shadow-lg w-full max-w-4xl mx-auto rounded-lg"
    >
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
          label="Nome"
          value={formData.userName}
          onChange={handleChange}
          className=" bg-white focus:bg-white"
          variant="standard"
          error={isError('addressNumber')}
          helperText={
            isError('addressNumber') ? 'Este campo é obrigatório' : ''
          }
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
          inputProps={{ maxLength: 9 }}
          className="bg-white focus:bg-white"
          variant="standard"
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
                isError('addressNumber') ? 'Este campo é obrigatório' : ''
              }
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
            />
          </>
        )}
      </Stack>
    </form>
  )
}

export default AddressForm
