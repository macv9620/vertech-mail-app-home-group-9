
import '@testing-library/jest-dom'
import {describe, expect, it, vi} from 'vitest'

import axios from 'axios';
import { postMessage } from '../services/messages/postMessage';

vi.mock('axios');

describe('postMessage', () => {
    it('should send a POST request with the correct data', async () => {
      const BASE_URL = import.meta.env.VITE_BASE_URL_FOREST_SERVICE
      const ENDPOINT = '/messages/create' 
      const messageData = {
        subject: 'Test Subject',
        body: 'Test Body',
        to_user: 'to@example.com',
        from_user: 'from@example.com',
        category_id: 1
      };
      const expectedData = JSON.stringify(messageData);
      const mockRequest = vi.spyOn(axios, 'request');
  
      mockRequest.mockResolvedValueOnce({ data: {
        subject: 'Test Subject',
        body: 'Test Body',
        to_user: 'to@example.com',
        from_user: 'from@example.com',
        category_id: 1
        } 
    });
  
      const response = await postMessage(messageData);
  
      expect(axios.request).toHaveBeenCalledWith({
        method: 'post',
        maxBodyLength: Infinity,
        url: BASE_URL + ENDPOINT,
        headers: {
          'Content-Type': 'application/json'
        },
        data: expectedData
      });
  
      expect(response).toEqual({ data: {
        subject: 'Test Subject',
        body: 'Test Body',
        to_user: 'to@example.com',
        from_user: 'from@example.com',
        category_id: 1
      }  
    });
    });
  });