import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  component: React.ElementType;
  [key: string]: any;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  ...rest
}) => {
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAuthenticated = () => {
    // Aqui você pode adicionar sua lógica de autenticação
    // Exemplo: verificar se existe um token no localStorage
    const token = localStorage.getItem('token');
    return !!token;
  };

  return isAuthenticated() ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
