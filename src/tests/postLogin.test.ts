import '@testing-library/jest-dom'
import { afterEach, describe, expect, it, vi} from 'vitest'
import axios from 'axios';
import { postLogin } from '../services/login/postLogin';

vi.mock('axios');

describe('postLogin', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should make a POST request with the correct data', async () => {
    
    const ENDPOINT = '/users/login';
    const BASE_URL = import.meta.env.VITE_BASE_URL_FOREST_SERVICE;

    const userInfo = {
      email: 'testuser',
      password: 'testpassword'
    };


    const expectedData = JSON.stringify(userInfo);

    await postLogin(userInfo);

    expect(axios.request).toHaveBeenCalledWith({
        method: 'post',
        maxBodyLength: Infinity,
        url: BASE_URL + ENDPOINT,
        headers: {
            'Content-Type': 'application/json'
        },
        data: expectedData
    });
  });

  it('should return the response from the server', async () => {

    const userInfo = {
        email: 'testuser',
        password: 'testpassword'
    };

    const responseData = {
        token: 'testtoken'
    };

    (axios.request as jest.Mock).mockResolvedValueOnce({ data: responseData });

    const response = await postLogin(userInfo);

    expect(response).toEqual({ data: responseData });
  });
});