import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes'
import store from './store'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* <ErrorBoundary> */}
        <AppRoutes />
        {/* </ErrorBoundary> */}
      </BrowserRouter>
    </Provider>
  )
}

export default App
