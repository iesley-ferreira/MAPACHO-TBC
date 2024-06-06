import { Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import React, { useEffect, useMemo } from 'react'
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

  // useEffect(() => {
  //   setAddressLoaded(!loading && !error && address.localidade !== '')
  //   console.log('AQUIIII', address)

  //   if (address && !error && !loading) {
  //     setFormData({
  //       ...formData,
  //       postalCode: address.cep,
  //       address: address.logradouro,
  //       complement: address.complemento,
  //       city: address.localidade,
  //       state: address.uf,
  //       userName: formData.userName,
  //     })
  //     setIsFormValid(formData.userName !== '' && formData.userName.length > 2)
  //   }
  // }, [loading, address, error])
  useEffect(() => {
    console.log('Endereço carregado:', address)
    if (!loading && address && !error) {
      if (address.localidade && address.cep && address.logradouro) {
        // Verifica se as propriedades necessárias existem
        setFormData((prevState) => ({
          ...prevState,
          postalCode: address.cep,
          address: address.logradouro,
          complement: address.complemento || '',
          city: address.localidade,
          state: address.uf,
        }))
        setAddressLoaded(true)
        setIsFormValid(formData.userName !== '' && formData.userName.length > 2)
      } else {
        console.error('Dados de endereço incompletos:', address)
        setAddressLoaded(false)
        setIsFormValid(false)
      }
    } else if (!loading && error) {
      console.error('Erro ao carregar endereço:', error)
      setAddressLoaded(false)
      setIsFormValid(false)
    }
  }, [loading, address, error])

  const isFormValid = useMemo(() => {
    const requiredFieldsFilled =
      formData.postalCode &&
      formData.address &&
      formData.addressNumber &&
      formData.city &&
      formData.state
    const isValidPostalCode = /^[0-9]{8}$/.test(
      normalizeZipCode(formData.postalCode)
    )
    return requiredFieldsFilled && isValidPostalCode
  }, [formData])

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target

    const formattedValue =
      name === 'postalCode' ? formatPostalCode(value) : value

    setFormData({ ...formData, [name]: formattedValue })

    if (name === 'postalCode' && normalizeZipCode(value).length === 8) {
      fetchAddress(value)
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const normalizedData = {
      ...formData,
      postalCode: normalizeZipCode(formData.postalCode),
    }

    console.log('normalizedData', normalizedData)
    //Salvar os dados no estado do usuário
  }

  return (
    <form
      onSubmit={handleSubmit}
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
          className="bg-gray-50 focus:bg-white"
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
          className="bg-gray-50 focus:bg-white"
        />
        {addressLoaded && (
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
              className="bg-gray-50 focus:bg-white"
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
              className="bg-gray-50 focus:bg-white"
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
              className="bg-gray-50 focus:bg-white"
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
              className="bg-gray-50 focus:bg-white"
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
              className="bg-gray-50 focus:bg-white"
            />
          </>
        )}
      </Stack>
    </form>
  )
}

export default AddressForm
