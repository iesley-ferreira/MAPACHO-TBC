import Link from '@mui/material/Link'
import { Provider } from 'react-redux'
import GoogleLogin from '../../components/UI/GoogleLogin'
import LoginForm from '../../components/UI/LoginForm'
import store from '../../store'

const preventDefault = (event: React.SyntheticEvent) => event.preventDefault()

export default function CustomerForm() {
  return (
    <div className="p-4 md:p-0 md:max-w-md md:mx-auto mt-14">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-10">Login</h2>
      </div>
      <div>
        <Provider store={store}>
          <LoginForm />
        </Provider>
      </div>
      <div className="flex flex-col items-center justify-center p-3">
        <Link href="/cadastro">Cadastre-se</Link>
        <br />
        <Link href="/esqueci-senha" onClick={preventDefault}>
          Esqueci minha senha
        </Link>
        <p>ou</p>
      </div>
      <div>
        <GoogleLogin />
      </div>
    </div>
  )
}
