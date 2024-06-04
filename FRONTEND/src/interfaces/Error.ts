interface ApiError {
  statusCode: number // Código de status HTTP
  message: string // Mensagem de erro
  error: string // Descrição do erro
}

// Define um tipo para erros mais genéricos ou internos da aplicação
interface InternalError {
  message: string // Mensagem de erro
  code: string // Código identificador do erro interno
}

// Cria um tipo unificado que pode ser um ApiError ou um InternalError
type ErrorType = ApiError | InternalError

export default ErrorType
