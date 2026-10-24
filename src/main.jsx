import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// 1) Tailwind (base + utilitários)  2) tokens e estilos do projeto, em ordem de dependência
import './index.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/buttons.css';
import './styles/layout.css';
import './styles/sections.css';
import './styles/chat.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
