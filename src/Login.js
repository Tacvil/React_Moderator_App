import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from './firebase';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './Login.module.css';
import { useAuth } from './AuthContext'; // Импортируем хук useAuth

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setAuthStatus } = useAuth(); // Получаем функцию setAuthStatus из контекста аутентификации

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const checkModeratorRole = async (user) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.data();

      if (userData && userData.role === 'moderator') {
        console.log('Пользователь - модератор');
        setAuthStatus(true); // Устанавливаем статус аутентификации в true
        navigate('/home');
      } else {
        console.log('Пользователь не является модератором');
      }
    } catch (error) {
      console.error('Ошибка проверки роли пользователя:', error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Пользователь успешно вошел в систему! (Firebase)');
      
      // Проверка роли после успешного входа
      checkModeratorRole(user);
    } catch (error) {
      console.error('Ошибка входа (Firebase):', error.message);
    }
  };

  return (
    <div className={styles['login-container']}>
      <h2>Login</h2>

      <form onSubmit={handleLogin} className={styles['login-form']}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
          required
          sx={{ marginTop: '10px' }}
        />
        <TextField
          label="Password"
          type="password"
          InputLabelProps={{ shrink: true }}
          value={password}
          onChange={handlePasswordChange}
          fullWidth
          required
          sx={{ marginTop: '10px' }}
        />

        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '10px' }}>
          Log In
        </Button>
      </form>
    </div>
  );
};

export default Login;
