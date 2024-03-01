import '@testing-library/jest-dom'
import { describe, expect, it, vi} from 'vitest'

import axios from 'axios';
import { getUserMessages } from '../services/messages/getUserMessages';

vi.mock('axios');

describe('getUserMessages', () => {
  it('should make a GET request to the correct URL with the provided email', async () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL_FOREST_SERVICE
    const ENDPOINT = '/messages/getAll?email='
    const email = 'test@example.com';
    const expectedUrl = BASE_URL + ENDPOINT + email;

    await getUserMessages(email);

    expect(axios.request).toHaveBeenCalledWith({
      method: 'get',
      maxBodyLength: Infinity,
      url: expectedUrl,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  });
});