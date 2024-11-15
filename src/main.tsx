import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ampli } from './ampli';

ampli.load({
  environment:
      import.meta.env.VITE_ENVIRONMENT == "production"
          ? "production"
          : "staging",
  client: {
      apiKey: import.meta.env.VITE_AMPLITUDE_API_KEY,
      configuration: {
          defaultTracking: true
      }
  },
}) 


const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
)
