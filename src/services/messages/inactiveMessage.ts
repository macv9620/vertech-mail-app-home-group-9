import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL_FOREST_SERVICE
const ENDPOINT = '/messages/delete'

const inactiveMessage = (messageId: number) => {
  const data = JSON.stringify({
    message_id: messageId
  })

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

export { inactiveMessage }
