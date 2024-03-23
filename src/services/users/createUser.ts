import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL_FOREST_SERVICE
const ENDPOINT = '/users/create'

const postUser = (userInfo: IPostUserData) => {
  const data = JSON.stringify(userInfo)
  console.log (BASE_URL)
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: BASE_URL + ENDPOINT,
    headers: {
      'Content-Type': 'application/json'
    },
    data
  }

  return axios.request(config)
}

export { postUser }
