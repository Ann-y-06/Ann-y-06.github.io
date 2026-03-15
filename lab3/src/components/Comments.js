import React, { useState } from 'react';

// Базові коментарі
const initialComments = [
  { id: 1, author: "Олена", text: "Сирники за вашим рецептом вийшли просто неймовірні! Дуже дякую!" },
  { id: 2, author: "Максим", text: "Карбонара — топ. Тільки я ще трохи часнику додав для аромату." }
];

function Comments() {
  const [comments, setComments] = useState(initialComments);
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');

  // Функція для додавання нового коментаря
  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = { id: Date.now(), author: author, text: text };
    setComments([...comments, newComment]); // Додаємо новий коментар у масив
    setAuthor(''); // Очищаємо поле імені
    setText('');   // Очищаємо поле тексту
  };

  return (
    <section style={{ maxWidth: '600px', margin: '40px auto', padding: '0 20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Коментарі користувачів</h2>
      
      {/* Список коментарів */}
      <div style={{ marginBottom: '40px' }}>
        {comments.map(c => (
          <article key={c.id} style={{ backgroundColor: '#faf8f5', padding: '15px 20px', borderRadius: '10px', marginBottom: '15px', border: '1px solid #e0d8d0' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#d35400', fontSize: '18px' }}>{c.author}</h4>
            <p style={{ margin: 0, color: '#4a3b32', lineHeight: '1.5' }}>{c.text}</p>
          </article>
        ))}
      </div>

      {/* Форма для додавання відгуку */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', backgroundColor: '#fff', padding: '25px', borderRadius: '10px', border: '1px solid #ccc', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <h3 style={{ margin: '0 0 10px 0', textAlign: 'center' }}>Залишити відгук</h3>
        
        <input 
          type="text" 
          placeholder="Ваше ім'я" 
          value={author} 
          onChange={e => setAuthor(e.target.value)} 
          required 
          style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc', fontFamily: 'inherit' }} 
        />
        
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
    </section>
  );
}

export default Comments;