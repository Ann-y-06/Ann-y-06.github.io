import React from 'react';

function RecipeCard({ recipe, onEdit }) {
  return (
    <article className="recipe-card">
      <img src={recipe.image} alt={recipe.title} />
      <h3>{recipe.title}</h3>
      <p><strong>Час:</strong> {recipe.time}</p>
      <p><strong>Інгредієнти:</strong> {recipe.ingredients}</p>
      <p><strong>Інструкція:</strong> {recipe.instruction}</p>
      <button 
        className="edit-btn" 
        onClick={() => onEdit(recipe)}
        style={{ backgroundColor: '#d35400', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}
      >
        ✏️ Редагувати
      </button>
    </article>
  );
}

export default RecipeCard;