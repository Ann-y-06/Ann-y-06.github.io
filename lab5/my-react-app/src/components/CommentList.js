import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Додали для правильного переходу на сторінку входу

function CommentList({ comments, onAddComment, user }) { // Додали user у пропси
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (author.trim() && text.trim()) {
      onAddComment({ author, text });
      setAuthor('');
      setText('');
    }
  };

  return (
    <section id="comments">
      <h2>Коментарі користувачів</h2>
      
      {/* Перевіряємо, чи є користувач */}
      <div style={{ marginBottom: '40px' }}>
        {user ? (
          /* Якщо авторизований - показуємо твою оригінальну форму з 3-ї лаби */
          <form className="recipe-form" onSubmit={handleSubmit}>
            <h3 style={{ marginTop: 0, color: '#5d4037' }}>Залишити коментар</h3>
            <div className="form-group">
              <label>Ваше ім'я:</label>
              <input 
                type="text" 
                value={author} 
                onChange={(e) => setAuthor(e.target.value)} 
                placeholder="Наприклад, Олена" 
                required 
              />
            </div>
            <div className="form-group">
              <label>Коментар:</label>
              <textarea 
                rows="3" 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
                placeholder="Напишіть ваші враження..." 
                required
              ></textarea>
            </div>
            <button type="submit" className="btn-submit">Відправити</button>
          </form>
        ) : (
          /* Якщо гість - показуємо повідомлення */
          <div style={{ backgroundColor: '#fff3cd', padding: '15px', borderRadius: '8px', color: '#856404', textAlign: 'center' }}>
            Щоб залишити коментар, будь ласка, <Link to="/auth" style={{ fontWeight: 'bold', color: '#d35400' }}>увійдіть в акаунт</Link>.
          </div>
        )}
      </div>

      {/* Список коментарів залишається без змін */}
      <div id="comments-container">
        {comments && comments.length > 0 ? (
          comments.map((comment, index) => (
            <article className="comment" key={index}>
              <h4>{comment.author}:</h4>
              <p>"{comment.text}"</p>
            </article>
          ))
        ) : (
          <p style={{ textAlign: 'center', color: '#5d4037' }}>Поки що немає коментарів. Будьте першими!</p>
        )}
      </div>
    </section>
  );
}

export default CommentList;