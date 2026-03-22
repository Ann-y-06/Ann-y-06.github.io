import React, { useState } from 'react';

function RecipeCard({ recipe, onEdit, onDelete, showControls }) {
  // Стани для ефекту затемнення (hover)
  const [isEditHovered, setIsEditHovered] = useState(false);
  const [isDeleteHovered, setIsDeleteHovered] = useState(false);

  // Спільний стиль для кнопок (твої соковиті налаштування)
  const getButtonStyle = (isHovered, baseColor, hoverColor) => ({
    backgroundColor: isHovered ? hoverColor : baseColor, // Зміна кольору при наведенні
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '12px', // Твої кругляші
    cursor: 'pointer',
    flex: 1,
    fontWeight: 'bold', // Жирний шрифт
    fontFamily: 'inherit',
    fontSize: '14px',
    transition: 'all 0.3s ease', // Плавне затемнення
    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)', // Легкий підйом
    boxShadow: isHovered ? '0 4px 8px rgba(0,0,0,0.2)' : '0 2px 4px rgba(0,0,0,0.1)'
  });

  return (
    <article className="recipe-card">
      <img src={recipe.image || "https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=400"} alt={recipe.title} />
      <h3>{recipe.title}</h3>
      <p><strong>Час:</strong> {recipe.time} хв</p>
      <p><strong>Інгредієнти:</strong> {recipe.ingredients}</p>
      <p><strong>Інструкція:</strong> {recipe.instruction}</p>
      
      {showControls && (
        <div className="recipe-controls" style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
          <button 
            className="edit-btn" 
            onClick={() => onEdit(recipe)}
            onMouseEnter={() => setIsEditHovered(true)} // Мишка зайшла
            onMouseLeave={() => setIsEditHovered(false)} // Мишка пішла
            style={getButtonStyle(isEditHovered, '#d35400', '#a04000')} // Оранжевий -> Темно-оранжевий
          >
            ✏️ Редагувати
          </button>
          
          <button 
            className="delete-btn" 
            onClick={() => onDelete(recipe.id)}
            onMouseEnter={() => setIsDeleteHovered(true)}
            onMouseLeave={() => setIsDeleteHovered(false)}
            style={getButtonStyle(isDeleteHovered, '#c0392b', '#922b21')} // Червоний -> Темно-червоний
          >
            🗑️ Видалити
          </button>
        </div>
      )}
    </article>
  );
}

export default RecipeCard;