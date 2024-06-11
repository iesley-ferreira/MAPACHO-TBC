import { CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/ducks/rootReducer'
import {
  fetchDeliveryDistanceRequest,
  fetchDeliveryOptionPricesRequest,
} from '../../../store/ducks/shipping/actions'
import {
  calculateMotorcycleDelivery,
  calculateScheduledDelivery,
  getFullAddress,
} from './helpers'

interface ShippingOptionsProps {
  setShippingOption: (option: string) => void
}

const ShippingOptions: React.FC<ShippingOptionsProps> = ({
  setShippingOption,
}) => {
  const dispatch = useDispatch()
  const { deliveryOptions, distance, completeAddress, loading, error } =
    useSelector((state: RootState) => state.shipping)

  const [selectedOption, setSelectedOption] = useState('')
  const [motorcycleValue, setMotorcycleValue] = useState<number | null>(null)
  const [scheduledValue, setScheduledValue] = useState<number | null>(null)
  const [loadingOptions, setLoadingOptions] = useState(false)

  const handleDeliveryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.value
    setSelectedOption(selected)
    setShippingOption(selected)
  }

  useEffect(() => {
    if (!loading && completeAddress.postalCode.length === 9 && !error) {
      dispatch(
        fetchDeliveryOptionPricesRequest({
          zipCode: completeAddress.postalCode,
        })
      )
      const fullAddress = getFullAddress(completeAddress)

      dispatch(fetchDeliveryDistanceRequest({ fullAddress }))
    }
  }, [completeAddress.houseNumber])

  useEffect(() => {
    if (distance) {
      const distanceInKm = distance / 1000
      const calculatedMotorcycleValue =
        calculateMotorcycleDelivery(distanceInKm)
      const calculatedScheduledValue = calculateScheduledDelivery(distanceInKm)

      setMotorcycleValue(calculatedMotorcycleValue)
      setScheduledValue(calculatedScheduledValue)
    }
  }, [distance])

  useEffect(() => {
    if (!loading && deliveryOptions.length > 0) {
      setLoadingOptions(false)
    }
  }, [loading, deliveryOptions])

  const formatPrice = (price: number) => {
    return price.toFixed(2).replace('.', ',')
  }

  const getValidDeliveryOptions = () => {
    return deliveryOptions.filter((option) => {
      const price = parseFloat(option.customPrice as unknown as string)
      return !isNaN(price) && price > 0
    })
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow w-full">
      <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">
        Escolha o Método de Entrega
      </h2>
      <div className="space-y-4 w-full">
        <div
          className={`p-4 border rounded-lg ${
            selectedOption === 'buscar-na-loja'
              ? 'border-blue-500 bg-blue-100'
              : 'border-gray-300'
          } cursor-pointer hover:border-blue-500 transition-all w-full`}
          onClick={() =>
            handleDeliveryChange({
              target: { value: 'buscar-na-loja' },
            } as React.ChangeEvent<HTMLInputElement>)
          }
        >
          <label className="flex items-center space-x-4 w-full cursor-pointer">
            <input
              type="radio"
              onChange={handleDeliveryChange}
              name="shipping-option"
              checked={selectedOption === 'buscar-na-loja'}
              value="buscar-na-loja"
              className="form-radio h-5 w-5 text-blue-600"
            />
            <div className="flex-grow">
              <p className="font-medium text-lg">Retirada na Loja</p>
              <div className="text-sm text-gray-600">
                <p>R$ 0,00</p>
                <span>Imediato</span>
              </div>
            </div>
            <img
              src="/public/assets/retiradaNaLojaSoloIcon.png"
              alt="Retirar na Loja"
              className="h-12"
            />
          </label>
        </div>
        {loadingOptions === true ? (
          <div className="flex justify-center">
            <CircularProgress />
          </div>
        ) : (
          completeAddress.postalCode.length === 9 && (
            <>
              {getValidDeliveryOptions().map((option, index) => (
                <div
                  key={index}
                  className={`p-4 border rounded-lg ${
                    selectedOption === option.id.toString()
                      ? 'border-blue-500 bg-blue-100'
                      : 'border-gray-300'
                  } cursor-pointer hover:border-blue-500 transition-all w-full`}
                  onClick={() =>
                    handleDeliveryChange({
                      target: { value: option.id.toString() },
                    } as React.ChangeEvent<HTMLInputElement>)
                  }
                >
                  <label className="flex items-center space-x-4 w-full cursor-pointer">
                    <input
                      type="radio"
                      onChange={handleDeliveryChange}
                      name="shipping-option"
                      checked={selectedOption === option.id.toString()}
                      value={option.id.toString()}
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <div className="flex-grow">
                      <p className="font-medium text-lg">{option.optionName}</p>
                      <div className="text-sm text-gray-600">
                        <p>
                          R${' '}
                          {formatPrice(
                            parseFloat(option.customPrice as unknown as string)
                          )}
                        </p>
                        <span>{option.deliveryTime} dias úteis</span>
                      </div>
                    </div>
                    <img
                      src={`/public/assets/${option.optionName.toLowerCase()}.png`}
                      alt={option.optionName}
                      className="w-12 h-12"
                    />
                  </label>
                </div>
              ))}
              {motorcycleValue !== null && motorcycleValue > 0 && (
                <div
                  className={`p-4 border rounded-lg ${
                    selectedOption === 'motoboy'
                      ? 'border-blue-500 bg-blue-100'
                      : 'border-gray-300'
                  } cursor-pointer hover:border-blue-500 transition-all w-full`}
                  onClick={() =>
                    handleDeliveryChange({
                      target: { value: 'motoboy' },
                    } as React.ChangeEvent<HTMLInputElement>)
                  }
                >
                  <label className="flex items-center space-x-4 w-full cursor-pointer">
                    <input
                      type="radio"
                      onChange={handleDeliveryChange}
                      name="shipping-option"
                      checked={selectedOption === 'motoboy'}
                      value="motoboy"
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <div className="flex-grow">
                      <p className="font-medium text-lg">Motoboy</p>
                      <div className="text-sm text-gray-600">
                        <p>R$ {formatPrice(motorcycleValue)}</p>
                        <span>em até 2 horas</span>
                      </div>
                    </div>
                    <img
                      src="/public/assets/motoboySoloIcon.png"
                      alt="Motoboy"
                      className="w-12 h-12"
                    />
                  </label>
                </div>
              )}
              {scheduledValue !== null && scheduledValue > 0 && (
                <div
                  className={`p-4 border rounded-lg ${
                    selectedOption === 'entrega-programada'
                      ? 'border-blue-500 bg-blue-100'
                      : 'border-gray-300'
                  } cursor-pointer hover:border-blue-500 transition-all w-full`}
                  onClick={() =>
                    handleDeliveryChange({
                      target: { value: 'entrega-programada' },
                    } as React.ChangeEvent<HTMLInputElement>)
                  }
                >
                  <label className="flex items-center space-x-4 w-full cursor-pointer">
                    <input
                      type="radio"
                      onChange={handleDeliveryChange}
                      name="shipping-option"
                      checked={selectedOption === 'entrega-programada'}
                      value="entrega-programada"
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <div className="flex-grow">
                      <p className="font-medium text-lg">Entrega Programada</p>
                      <div className="text-sm text-gray-600">
                        <p>R$ {formatPrice(scheduledValue)}</p>
                        <span>quarta e sábado</span>
                      </div>
                    </div>
                    <img
                      src="/public/assets/entregaProgramadaSoloIcon.png"
                      alt="Entrega Programada"
                      className="h-12"
                    />
                  </label>
                </div>
              )}
            </>
          )
        )}
      </div>
    </div>
  )
}

export default ShippingOptions
