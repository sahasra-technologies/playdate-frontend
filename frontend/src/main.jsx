// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import { GameProvider } from './context/GameContext.jsx';
import {UserProvider} from './components/Login/UserContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <GameProvider>
        <UserProvider>
                <App />
        </UserProvider>
      </GameProvider>
    </ThemeProvider>
  </React.StrictMode>
);
