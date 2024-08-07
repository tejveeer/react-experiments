import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './site/App';
import Navbar from './site/Navbar';

import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
