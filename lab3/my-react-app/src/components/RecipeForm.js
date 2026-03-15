import React, { useState, useEffect } from 'react';

function RecipeForm({ currentRecipe, onSave }) {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instruction, setInstruction] = useState('');
  const [image, setImage] = useState('');

  // Якщо ми натиснули "Редагувати", заповнюємо форму даними рецепту
  useEffect(() => {
    if (currentRecipe) {
      setTitle(currentRecipe.title);
      setTime(currentRecipe.time);
      setIngredients(currentRecipe.ingredients);
      setInstruction(currentRecipe.instruction);
      setImage(currentRecipe.image || '');
    } else {
      // Якщо це новий рецепт, очищаємо поля
      setTitle('');
      setTime('');
      setIngredients('');
      setInstruction('');
      setImage('');
    }
  }, [currentRecipe]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...currentRecipe, // Зберігаємо стару категорію, якщо вона була
      title,
      time,
      ingredients,
      instruction,
      image: image || "https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=400",
      category: currentRecipe ? currentRecipe.category : "Всі" // Категорія за замовчуванням
    });
  };

  return (
    <div id="recipe-form-container">
      <form className="recipe-form" onSubmit={handleSubmit}>
        <h3>{currentRecipe ? 'Редагувати рецепт' : 'Створити новий рецепт'}</h3>
        
        <div className="form-group">
          <label>Назва страви:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Наприклад, Гарбузовий крем-суп" required />
        </div>
        <div className="form-group">
          <label>Час приготування (хв):</label>
          <input type="text" value={time} onChange={(e) => setTime(e.target.value)} placeholder="45 хв" required />
        </div>
        <div className="form-group">
          <label>Інгредієнти:</label>
          <textarea rows="3" value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder="Перерахуйте інгредієнти..." required></textarea>
        </div>
        <div className="form-group">
          <label>Інструкція приготування:</label>
          <textarea rows="5" value={instruction} onChange={(e) => setInstruction(e.target.value)} placeholder="Опишіть кроки..." required></textarea>
        </div>
        <div className="form-group">
          <label>Посилання на фото:</label>
          <input type="url" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://..." />
        </div>
        <button type="submit" className="btn-submit">
          {currentRecipe ? 'Зберегти зміни' : 'Опублікувати'}
        </button>
      </form>
    </div>
  );
}

export default RecipeForm;