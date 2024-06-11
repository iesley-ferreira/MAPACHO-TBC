import axios from './axiosConfig'

export const fetchDistance = async (
  fullAddress: string
): Promise<{ distance: number }> => {
  const response = await axios.get<{ distance: number }>(
    `directions?address=${fullAddress}`
  )
  return response.data
}
