import React from 'react';

// Компонент приймає "props" (властивості), у нашому випадку — об'єкт recipe
function RecipeCard({ recipe }) {
  return (
    // ВАЖЛИВО: У React замість слова "class" використовується "className"
    <article className="recipe-card">
      <img src={recipe.image} alt={recipe.title} />
      <h3>{recipe.title}</h3>
      <p><strong>Час:</strong> {recipe.time}</p>
      <p><strong>Інгредієнти:</strong> {recipe.ingredients}</p>
      <p><strong>Інструкція:</strong> {recipe.instruction}</p>
    </article>
  );
}

export default RecipeCard;