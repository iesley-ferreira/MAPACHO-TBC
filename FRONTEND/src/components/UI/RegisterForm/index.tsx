import { Box, Button, Container, TextField, Typography } from '@mui/material'
import { useState } from 'react'

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    telefone: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Aqui você pode adicionar a lógica para enviar os dados para o servidor
    console.log(formData)
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Registro de Usuário
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="nome"
            label="Nome"
            name="nome"
            autoComplete="nome"
            autoFocus
            value={formData.nome}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="sobrenome"
            label="Sobrenome"
            name="sobrenome"
            autoComplete="sobrenome"
            value={formData.sobrenome}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="telefone"
            label="Telefone"
            name="telefone"
            autoComplete="telefone"
            type="tel"
            value={formData.telefone}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="senha"
            label="Senha"
            name="senha"
            type="password"
            value={formData.senha}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="confirmarSenha"
            label="Confirmar Senha"
            name="confirmarSenha"
            type="password"
            value={formData.confirmarSenha}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Registrar
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default RegisterForm
