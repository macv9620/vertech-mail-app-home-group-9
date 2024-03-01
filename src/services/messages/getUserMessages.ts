import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL_FOREST_SERVICE
const ENDPOINT = '/messages/getAll?email='

const getUserMessages = (email: string) => {

  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: BASE_URL + ENDPOINT + email,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  return axios.request(config)
}

export { getUserMessages }
