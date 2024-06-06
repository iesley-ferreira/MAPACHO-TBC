import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createUser } from '../../../api/userApi'
import { IUserCreateParams } from '../../../interfaces/User'

const CustomerForm: React.FC = () => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    postalCode: '',
    address: '',
    city: '',
    state: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const user: IUserCreateParams = {
      nome: formData.firstName + ' ' + formData.lastName,
      email: 'email',
      telefone: '123456789',
      cep: formData.postalCode,
      endereco: formData.address,
      cidade: formData.city,
      estado: formData.state,
      password: formData.password,
    }

    try {
      const response = await dispatch(createUser(user))
      console.log(response) // Dados do usuário cadastrado
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          required
          id="firstName"
          name="firstName"
          label="Nome"
          value={formData.firstName}
          onChange={handleChange}
        />
        <TextField
          required
          id="lastName"
          name="lastName"
          label="Sobrenome"
          value={formData.lastName}
          onChange={handleChange}
        />
        <TextField
          required
          id="postalCode"
          name="postalCode"
          label="CEP"
          value={formData.postalCode}
          onChange={handleChange}
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
        <Button type="submit" variant="contained" color="primary">
          Enviar
        </Button>
      </Stack>
    </form>
  )
}

export default CustomerForm
