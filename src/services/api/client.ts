import { API_BASE_URL } from '@/constants/api';
import ky from 'ky';

export const apiClient = ky.create({
  prefixUrl: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  hooks: {
    beforeRequest: [
      // request => {
      // Attach auth token if needed
      //    const token = getAuthToken();
      //   if (token) request.headers.set('Authorization', `Bearer ${token}`);
      // },
    ],
    afterResponse: [
      (request, options, response) => {
        // Global response handling/logging
        return response;
      },
    ],
  },
});

