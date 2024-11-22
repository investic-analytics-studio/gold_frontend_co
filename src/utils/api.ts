// Get the API URL from environment variables
const BASE_API_URL = import.meta.env.VITE_BACKEND_API || 'http://localhost:8080';

export const getApiUrl = (path: string): string => {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${BASE_API_URL}/${cleanPath}`;
}; 