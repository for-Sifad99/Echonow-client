import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'
import { RouterProvider } from 'react-router';
import router from './routes/router';
import AuthProvider from '../contexts/AuthProvider';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {ThemeProvider} from '../hooks/themeContext/themeContext';
import { HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient();


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
         <HelmetProvider>
            <RouterProvider router={router} />
            <Toaster position="top-right" reverseOrder={false} />
         </HelmetProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
