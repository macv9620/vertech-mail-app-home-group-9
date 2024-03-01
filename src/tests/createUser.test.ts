import '@testing-library/jest-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import axios from 'axios';
import { postUser } from '../services/users/createUser';

vi.mock('axios');

describe('postUser', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should send a POST request with the correct data', async () => {
    const userInfo = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123'
    };

    const expectedData = JSON.stringify(userInfo);

    vi.spyOn(axios, 'request').mockResolvedValueOnce({ data: expectedData });

    const BASE_URL = import.meta.env.VITE_BASE_URL_FOREST_SERVICE; 
    const ENDPOINT = '/users/create';

    const response = await postUser(userInfo);

    expect(axios.request).toHaveBeenCalledTimes(1);
    expect(axios.request).toHaveBeenCalledWith({
        method: 'post',
        maxBodyLength: Infinity,
        url: BASE_URL + ENDPOINT,
        headers: {
            'Content-Type': 'application/json'
        },
        data: expectedData
    });

    expect(response).toEqual({ data: expectedData });
  });
});