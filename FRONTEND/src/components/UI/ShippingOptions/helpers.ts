import { IAddress } from '../../../store/ducks/shipping/types'

export const calculateMotorcycleDelivery = (distanceInKm: number) => {
  let value = 0
  if (distanceInKm <= 2) {
    value = 6
  } else if (distanceInKm <= 5) {
    value = 8
  } else if (distanceInKm <= 7) {
    value = 10
  } else if (distanceInKm <= 10) {
    value = 15
  } else if (distanceInKm <= 15) {
    value = 20
  } else if (distanceInKm <= 20) {
    value = 25
  } else if (distanceInKm <= 25) {
    value = 30
  } else {
    return null
  }
  return value
}

export const calculateScheduledDelivery = (distanceInKm: number) => {
  let value = 0
  if (distanceInKm <= 8) {
    value = 6
  } else if (distanceInKm <= 20) {
    value = 10
  } else {
    return null
  }
  return value
}

export const getFullAddress = (completeAddress: IAddress) => {
  return `${completeAddress.address}, ${completeAddress.houseNumber}, - ${completeAddress.city}, ${completeAddress.state}, ${completeAddress.postalCode}`
}
