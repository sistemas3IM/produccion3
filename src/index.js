import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { SideBarProvider } from './context/sidebar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SideBarProvider>
      <RouterProvider router={router} />
    </SideBarProvider>
  </React.StrictMode>
);
