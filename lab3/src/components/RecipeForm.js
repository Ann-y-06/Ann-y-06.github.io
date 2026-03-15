import React, { useState } from 'react';

// Компонент приймає функцію onAddRecipe від батька (App.js)
function RecipeForm({ onAddRecipe }) {
  // Створюємо "пам'ять" для кожного поля форми
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instruction, setInstruction] = useState('');
  const [category, setCategory] = useState('Сніданки'); // Категорія за замовчуванням
  const [image, setImage] = useState('');

  // Функція, яка спрацьовує при натисканні "Опублікувати"
  const handleSubmit = (event) => {
    event.preventDefault(); // Зупиняємо перезавантаження сторінки

    // Створюємо об'єкт нового рецепту
    const newRecipe = {
      id: Date.now(), // Генеруємо унікальний ID
      title: title,
      time: time,
      ingredients: ingredients,
      instruction: instruction,
      category: category,
      // Якщо фото не додали, ставимо заглушку
      image: image ? image : "https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=400"
    };

    // Передаємо новий рецепт наверх, у головний файл
    onAddRecipe(newRecipe);

    // Очищаємо поля форми
    setTitle(''); setTime(''); setIngredients(''); setInstruction(''); setImage('');
    alert('Ваш рецепт успішно додано!');
  };

  return (
    <form className="recipe-form" onSubmit={handleSubmit} style={{ margin: '20px auto' }}>
      <h3>Створити новий рецепт</h3>
      
      <div className="form-group">
        <label>Назва страви:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>

      <div className="form-group">
        <label>Категорія:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Сніданки">Сніданки</option>
          <option value="Обіди та супи">Обіди та супи</option>
          <option value="Десерти">Десерти</option>
          <option value="Вегетаріанські страви">Вегетаріанські страви</option>
          <option value="М'ясні страви">М'ясні страви</option>
        </select>
      </div>

      <div className="form-group">
        <label>Час (хв):</label>
        <input type="text" value={time} onChange={(e) => setTime(e.target.value)} required />
      </div>

      <div className="form-group">
        <label>Інгредієнти:</label>
        <textarea rows="3" value={ingredients} onChange={(e) => setIngredients(e.target.value)} required></textarea>
      </div>

      <div className="form-group">
        <label>Інструкція:</label>
        <textarea rows="4" value={instruction} onChange={(e) => setInstruction(e.target.value)} required></textarea>
      </div>

      <div className="form-group">
        <label>Посилання на фото:</label>
        <input type="url" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://..." />
      </div>

      <button type="submit" className="btn-submit">Опублікувати</button>
    </form>
  );
}

export default RecipeForm;