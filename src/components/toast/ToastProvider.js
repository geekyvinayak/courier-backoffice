// toast/ToastProvider.js
import React from 'react';
import { Toaster } from 'react-hot-toast';

const ToastProvider = () => {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          borderRadius: '8px',
          background: '#333',
          color: '#fff',
        },
        success: {
          iconTheme: {
            primary: '#4caf50',
            secondary: '#fff',
          },
        },
        error: {
          iconTheme: {
            primary: '#f44336',
            secondary: '#fff',
          },
        },
        warning: {
          iconTheme: {
            primary: '#ffa726',
            secondary: '#fff',
          },
        },
      }}
    />
  );
};

export default ToastProvider;
