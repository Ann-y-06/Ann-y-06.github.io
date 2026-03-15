import React from 'react';
import RecipeCard from '../components/RecipeCard';
import RecipeForm from '../components/RecipeForm';

// Прибрали comments та onAddComment з пропсів
function Home({ recipes, isFormVisible, toggleForm, onEdit, onSave, editingRecipe }) {
  return (
    <main>
      <section id="my-recipes">
        <h2>Рецепти</h2>
        
        <button id="show-form-btn" className="btn-submit" style={{ display: 'block', margin: '20px 0' }} onClick={toggleForm}>
          {isFormVisible ? (editingRecipe ? 'Скасувати редагування' : 'Скасувати') : '+ Додати рецепт'}
        </button>

        {isFormVisible && <RecipeForm currentRecipe={editingRecipe} onSave={onSave} />}

        <div className="recipes-grid">
          {recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} onEdit={onEdit} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;