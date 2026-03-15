import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

function Auth({ user }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Користувача створено успішно! 🎉");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      alert("Помилка: " + error.message);
    }
  };

  if (user) {
    return (
      <div className="user-info-panel">
        <p>👋 Вітаємо, <strong>{user.email}</strong>!</p>
        <button className="btn-submit" style={{width: 'auto', padding: '8px 20px'}} onClick={() => signOut(auth)}>Вийти</button>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <h3>{isRegistering ? 'Створити акаунт' : 'Вхід у систему'}</h3>
      <form className="auth-form" onSubmit={handleAuth}>
        <input 
          type="email" 
          placeholder="Електронна пошта" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Пароль (мін. 6 символів)" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit" className="btn-submit">
          {isRegistering ? 'Зареєструватися' : 'Увійти'}
        </button>
      </form>
      <p className="auth-toggle-text">
        {isRegistering ? 'Вже маєте профіль?' : 'Вперше у нас?'}
        <span className="auth-toggle-link" onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Увійти' : 'Створити акаунт'}
        </span>
      </p>
    </div>
  );
}

export default Auth;