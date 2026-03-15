import React, { useState } from 'react';

function CommentList({ comments, onAddComment }) {
  // Стан для полів форми коментаря
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (author.trim() && text.trim()) {
      onAddComment({ author, text }); // Передаємо дані наверх
      setAuthor(''); // Очищаємо поля після відправки
      setText('');
    }
  };

  return (
    <section id="comments">
      <h2>Коментарі користувачів</h2>
      
      {/* Форма додавання коментаря в твоїй стилізації */}
      <div style={{ marginBottom: '40px' }}>
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
      </div>

      {/* Список коментарів */}
      <div id="comments-container">
        {comments.map((comment, index) => (
          <article className="comment" key={index}>
            <h4>{comment.author}:</h4>
            <p>"{comment.text}"</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default CommentList;