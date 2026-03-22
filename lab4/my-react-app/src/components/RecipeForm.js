import React, { useState, useEffect } from 'react';

function RecipeForm({ currentRecipe, onSave }) {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [category, setCategory] = useState("М'ясні страви"); // Стан для категорії
  const [ingredients, setIngredients] = useState('');
  const [instruction, setInstruction] = useState('');
  const [image, setImage] = useState('');

  // Якщо ми натиснули "Редагувати", заповнюємо форму даними рецепту
  useEffect(() => {
    if (currentRecipe) {
      setTitle(currentRecipe.title);
      setTime(currentRecipe.time);
      setCategory(currentRecipe.category || "М'ясні страви"); // Підтягуємо стару категорію
      setIngredients(currentRecipe.ingredients);
      setInstruction(currentRecipe.instruction);
      setImage(currentRecipe.image || '');
    } else {
      // Якщо це новий рецепт, очищаємо поля
      setTitle('');
      setTime('');
      setCategory("М'ясні страви"); // Дефолтна категорія
      setIngredients('');
      setInstruction('');
      setImage('');
    }
  }, [currentRecipe]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...currentRecipe,
      title,
      time,
      category, // Зберігаємо обрану категорію
      ingredients,
      instruction,
      image: image || "https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=400"
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

        {/* Стилізований список вибору категорії */}
        <div className="form-group">
          <label>Категорія:</label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            required
            /* Додаємо стилі, ідентичні твоїм input'ам */
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '8px', /* Твоє фірмове заокруглення */
              fontFamily: 'inherit',
              fontSize: '16px',
              color: '#5d4037', /* Колір тексту як у всієї форми */
              backgroundColor: '#fff',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="Сніданки">Сніданки</option>
            <option value="Обіди та супи">Обіди та супи</option>
            <option value="М'ясні страви">М'ясні страви</option>
            <option value="Десерти">Десерти</option>
            <option value="Вегетаріанські страви">Вегетаріанські страви</option>
          </select>
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