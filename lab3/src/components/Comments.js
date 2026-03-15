import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { ref, push, onValue } from "firebase/database";

// Твої початкові коментарі
const initialComments = [
  { id: 1, author: "Олена", text: "Сирники за вашим рецептом вийшли просто неймовірні! Дуже дякую!" },
  { id: 2, author: "Максим", text: "Карбонара — топ. Тільки я ще трохи часнику додав для аромату." }
];

function Comments() {
  const [comments, setComments] = useState(initialComments);
  const [text, setText] = useState('');
  const user = auth.currentUser;

  useEffect(() => {
    const commentsRef = ref(db, 'comments');
    onValue(commentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const firebaseList = Object.keys(data).map(key => ({
          id: key,
          author: data[key].author,
          text: data[key].text
        }));
        // Об'єднуємо початкові коментарі з тими, що в базі
        setComments([...initialComments, ...firebaseList]);
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Будь ласка, авторизуйтесь!");

    const commentsRef = ref(db, 'comments');
    await push(commentsRef, {
      author: user.email.split('@')[0], // Беремо частину пошти як ім'я
      text: text
    });
    setText(''); 
  };

  return (
    <section style={{ maxWidth: '600px', margin: '40px auto', padding: '0 20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Коментарі користувачів</h2>
      
      <div style={{ marginBottom: '40px' }}>
        {comments.map(c => (
          <article key={c.id} style={{ backgroundColor: '#faf8f5', padding: '15px 20px', borderRadius: '10px', marginBottom: '15px', border: '1px solid #e0d8d0' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#d35400', fontSize: '18px' }}>{c.author}</h4>
            <p style={{ margin: 0, color: '#4a3b32', lineHeight: '1.5' }}>{c.text}</p>
          </article>
        ))}
      </div>

      {user ? (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', backgroundColor: '#fff', padding: '25px', borderRadius: '10px', border: '1px solid #ccc', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 10px 0', textAlign: 'center' }}>Залишити відгук</h3>
          <p style={{textAlign: 'center', color: '#666'}}>Ви пишете як: <strong>{user.email}</strong></p>
          <textarea 
            rows="4" 
            placeholder="Ваш коментар..." 
            value={text} 
            onChange={e => setText(e.target.value)} 
            required 
            style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc', fontFamily: 'inherit', resize: 'vertical' }} 
          />
          <button type="submit" className="btn-submit">Відправити</button>
        </form>
      ) : (
        <p style={{textAlign: 'center', color: '#d35400'}}>Авторизуйтесь, щоб залишити відгук.</p>
      )}
    </section>
  );
}

export default Comments;