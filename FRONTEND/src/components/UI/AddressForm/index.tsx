import { Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import React, { useMemo } from 'react'
import CustomButton from '../../common/Button/Button'

const AddressForm: React.FC = () => {
  const [formData, setFormData] = React.useState({
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

  const normalizePostalCode = (postalCode: string) => {
    return postalCode.replace(/\D/g, '')
  }

  const isFormValid = useMemo(() => {
    const requiredFieldsFilled =
      formData.postalCode &&
      formData.address &&
      formData.addressNumber &&
      formData.city &&
      formData.state
    const isValidPostalCode = /^[0-9]{8}$/.test(
      normalizePostalCode(formData.postalCode)
    )
    return requiredFieldsFilled && isValidPostalCode
  }, [formData])

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target

    const formattedValue =
      name === 'postalCode' ? formatPostalCode(value) : value

    console.log('formattedValue', formattedValue)

    setFormData({ ...formData, [name]: formattedValue })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Normaliza o CEP antes de enviar
    const normalizedData = {
      ...formData,
      postalCode: normalizePostalCode(formData.postalCode),
    }

    console.log(normalizedData)
    // Implemente o envio dos dados aqui
  }

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5" component="h1" sx={{ mt: 2, mb: 4 }}>
        Formulário de Envio
      </Typography>
      <Stack spacing={2}>
        <TextField
          required
          id="postalCode"
          name="postalCode"
          label="CEP"
          value={formData.postalCode}
          onChange={handleChange}
          inputProps={{ maxLength: 9 }}
        />
        <TextField
          required
          id="address"
          name="address"
          label="Endereço"
          value={formData.address}
          onChange={handleChange}
        />
        <TextField
          required
          id="addressNumber"
          name="addressNumber"
          label="Número"
          value={formData.addressNumber}
          onChange={handleChange}
          type="number"
        />
        <TextField
          id="complement"
          name="complement"
          label="Complemento"
          value={formData.complement}
          onChange={handleChange}
          placeholder="Ex: apartamento, bloco, etc."
        />
        <TextField
          required
          id="city"
          name="city"
          label="Cidade"
          value={formData.city}
          onChange={handleChange}
        />
        <TextField
          required
          id="state"
          name="state"
          label="Estado"
          value={formData.state}
          onChange={handleChange}
        />
        <CustomButton
          type="submit"
          variant="contained"
          color="success"
          size="large"
          disabled={!isFormValid}
        >
          Pagamento
        </CustomButton>
      </Stack>
    </form>
  )
}

export default AddressForm
