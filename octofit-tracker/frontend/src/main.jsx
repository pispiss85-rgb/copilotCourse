import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
document.title = codespaceName ? `OctoFit Tracker (${codespaceName})` : 'OctoFit Tracker';

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
