import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL_FOREST_SERVICE
const ENDPOINT = '/messages/updateCategory'

const updateCategoryMessage = (userInfo: IUpdateMessageCategory) => {
  const data = JSON.stringify(userInfo)

  const config = {
    method: 'patch',
    maxBodyLength: Infinity,
    url: BASE_URL + ENDPOINT,
    headers: {
      'Content-Type': 'application/json'
    },
    data
  }

  return axios.request(config)
}

export { updateCategoryMessage }
