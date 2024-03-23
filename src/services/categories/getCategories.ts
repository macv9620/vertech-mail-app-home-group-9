import axios from 'axios'
import { getAuthHeaders } from '../login/authService'

const BASE_URL = import.meta.env.VITE_BASE_URL_FOREST_SERVICE
const ENDPOINT = '/category/getAll'

const getUserCategories = () => {

  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: BASE_URL + ENDPOINT,
    headers: getAuthHeaders()
      
    
  }

  return axios.request(config)
}

export { getUserCategories }
