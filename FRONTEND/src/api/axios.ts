import axios from 'axios'
import { myIp } from '../../../devConfig.json'

const instance = axios.create({
  baseURL: myIp,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default instance
