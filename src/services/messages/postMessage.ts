import axios from 'axios'
import { getAuthHeaders } from '../login/authService'

const BASE_URL = import.meta.env.VITE_BASE_URL_FOREST_SERVICE
const ENDPOINT = '/messages/create'

const postMessage = (userInfo: IPostMessageData) => {
  const data = JSON.stringify(userInfo)

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: BASE_URL + ENDPOINT,
    headers: getAuthHeaders(),
    data
  }
  
  return axios.request(config)
}

export { postMessage }
