import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

function AuthForm() {
  // Стан для перемикання між "Вхід" та "Реєстрація"
  const [isLogin, setIsLogin] = useState(true); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        // Логіка входу
        await signInWithEmailAndPassword(auth, email, password);
        alert('Успішний вхід!');
      } else {
        // Логіка реєстрації
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Успішна реєстрація!');
      }
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.message); // Виводимо помилку, якщо щось пішло не так
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '40px 0' }}>
      <form className="recipe-form" onSubmit={handleSubmit}>
        <h3 style={{ marginTop: 0, textAlign: 'center', color: '#5d4037' }}>
          {isLogin ? 'Вхід в акаунт' : 'Реєстрація'}
        </h3>
        
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        <div className="form-group">
          <label>Електронна пошта:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="mail@example.com" 
            required 
          />
        </div>
        <div className="form-group">
          <label>Пароль:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Мінімум 6 символів" 
            required 
          />
        </div>
        
        <button type="submit" className="btn-submit">
          {isLogin ? 'Увійти' : 'Зареєструватися'}
        </button>

        <p style={{ textAlign: 'center', marginTop: '15px', cursor: 'pointer', color: '#d35400', textDecoration: 'underline' }} 
           onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Немає акаунту? Зареєструватися' : 'Вже є акаунт? Увійти'}
        </p>
      </form>
    </div>
  );
}

export default AuthForm;