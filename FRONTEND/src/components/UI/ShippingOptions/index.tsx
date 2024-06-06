import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Ajuste de acordo com suas actions
import { RootState } from '../../../store/ducks/rootReducer'

interface ShippingOptionsProps {}

//Disparar ação para calcular fretes

const ShippingOptions: React.FC<ShippingOptionsProps> = () => {
  const { address, loading, error } = useSelector(
    (state: RootState) => state.address
  )
  const dispatch = useDispatch()

  const [selectedOption, setSelectedOption] = useState('')
  const [showDeliveryMethods, setShowDeliveryMethods] = useState(false)

  const handleDeliveryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.value
    setSelectedOption(selected)
    dispatch(updateShippingOption(selected)) // Envio da opção selecionada para o Redux
  }

  useEffect(() => {
    // Supondo que existam funções de fetch para calcular preços de envio baseados no CEP do endereço
    if (!loading && address.zipCode && !error) {
      calculateDeliveryOptions()
    } else {
      setShowDeliveryMethods(false)
    }
  }, [address.zipCode])

  const calculateDeliveryOptions = async () => {
    try {
      dispatch(setLoading(true))
      // Suponha que você tenha funções para calcular as opções de entrega
      const options = await fetchDeliveryOptions(address.zipCode)
      // Simulando a obtenção de opções de entrega
      dispatch(setDeliveryOptions(options))
      setShowDeliveryMethods(true)
      dispatch(setLoading(false))
    } catch (error) {
      console.error('Erro ao calcular opções de envio: ', error)
      dispatch(setError(error.message))
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">
        Escolha o Método de Entrega
      </h2>
      {showDeliveryMethods ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Exemplo de uma opção de envio */}
          <div
            className={`p-4 border rounded-lg ${selectedOption === 'standard' ? 'border-blue-500 bg-blue-100' : 'border-gray-300'} cursor-pointer hover:border-blue-500 transition-all`}
            onClick={() => setSelectedOption('standard')}
          >
            <label className="flex items-center space-x-4">
              <input
                type="radio"
                onChange={handleDeliveryChange}
                name="shipping-option"
                checked={selectedOption === 'standard'}
                value="standard"
                className="form-radio h-5 w-5 text-blue-600"
              />
              <div>
                <p className="font-medium text-lg">Standard</p>
                <div className="text-sm text-gray-600">
                  <p>R$ 20,00</p>
                  <span>5-7 dias úteis</span>
                </div>
              </div>
            </label>
          </div>
          {/* Adicione mais opções de envio aqui conforme necessário */}
        </div>
      ) : (
        <div className="text-center text-gray-600">
          <p>
            *Preencha o formulário de endereço para obter opções de entrega.
          </p>
        </div>
      )}
    </div>
  )
}

export default ShippingOptions
