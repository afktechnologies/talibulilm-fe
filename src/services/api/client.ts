import { API_BASE_URL } from '@/constants/api';
import ky from 'ky';

// This client is for public, unauthenticated content reads only (surahs,
// hadiths, qna, ...) — it runs in the browser and never sees the
// access/refresh tokens, which live in httpOnly cookies server-side (see
// src/lib/auth). Anything that needs the logged-in user's session should go
// through /api/backend/[...path] instead, not through this client.
export const apiClient = ky.create({
  prefixUrl: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  hooks: {
    afterResponse: [
      (request, options, response) => {
        // Global response handling/logging
        return response;
      },
    ],
  },
});

