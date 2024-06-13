import { ArrowBack } from '@mui/icons-material'
import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <section className="relative py-8 bg-darkBlueGray-500 overflow-hidden">
          <div className="relative container px-4 mx-auto">
            <div className="relative text-center py-12 md:py-24 px-8 2xl:pt-44 2xl:pb-80 bg-white rounded-7xl z-30">
              <div className="relative z-40">
                <h2 className="mb-6 font-medium font-heading text-9xl md:text-10xl xl:text-smxl leading-tight">
                  404
                </h2>
                <p className="max-w-md mb-20 xl:mb-24 mx-auto font-heading font-medium text-3xl leading-10">
                  Wooops. Algo deu errado, mas ja estamos trabalhando para
                  consertar.
                </p>
                <a
                  className="inline-flex items-center pb-2 font-bold tracking-tight text-xl leading-6 text-green-600 hover:text-green-700 border-b border-green-600 hover:border-green-700"
                  href="/"
                >
                  <ArrowBack />
                  <span className="ml-3 mr-2 uppercase">Voltar para Home</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
