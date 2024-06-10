import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/ducks/rootReducer'

export const useAddressForm = (setIsFormValid) => {
  const dispatch = useDispatch()
  const { address, loading, error } = useSelector(
    (state: RootState) => state.address
  )
  const [formData, setFormData] = useState({
    userName: '',
    postalCode: '',
    address: '',
    addressNumber: '',
    complement: '',
    city: '',
    state: '',
  })

  const [fieldTouched, setFieldTouched] = useState({
    userName: false,
    postalCode: false,
    address: false,
    addressNumber: false,
    complement: false,
    city: false,
    state: false,
  })

  const normalizeZipCode = (postalCode) => postalCode.replace(/\D/g, '')

  useEffect(() => {
    const isValidPostalCode = /^[0-9]{8}$/.test(
      normalizeZipCode(formData.postalCode)
    )
    setIsFormValid(
      formData.userName &&
        formData.postalCode &&
        formData.address &&
        formData.addressNumber &&
        formData.city &&
        formData.state &&
        isValidPostalCode
    )
  }, [formData, setIsFormValid])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (!fieldTouched[name]) {
      setFieldTouched((prev) => ({ ...prev, [name]: true }))
    }
  }

  return {
    formData,
    handleChange,
    fieldTouched,
    loading,
    addressLoaded: !!address,
  }
}
