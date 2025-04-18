import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; // Импортируем AuthProvider

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider> {/* Оберните приложение вокруг AuthProvider */}
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
