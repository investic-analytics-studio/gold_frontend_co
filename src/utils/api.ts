// Base API URL - replace with your actual API base URL
const BASE_API_URL = 'https://your-api-base-url.com';

export const getApiUrl = (path: string): string => {
  return `${BASE_API_URL}${path}`;
}; 