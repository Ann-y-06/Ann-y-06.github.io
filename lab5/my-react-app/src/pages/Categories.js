import React, { useState } from 'react';
import RecipeCard from '../components/RecipeCard';

// Тепер ми приймаємо categories з бази даних!
function Categories({ recipes, categories }) {
  const [selectedCategory, setSelectedCategory] = useState('Всі');

  const filteredRecipes = selectedCategory === 'Всі' 
    ? recipes 
    : recipes.filter(recipe => recipe.category === selectedCategory);

  return (
    <main>
      <section id="categories">
        <h2>Категорії рецептів</h2>
        <div className="tags">
          {/* Виводимо категорії прямо з Firebase */}
          {categories && categories.length > 0 ? (
            categories.map((cat, index) => (
              <button 
                key={index} 
                className={`tag ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))
          ) : (
            <p>Завантаження категорій...</p>
          )}
        </div>

        <div className="recipes-grid">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} onEdit={() => {}} />
            ))
          ) : (
            <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#5d4037' }}>
              У цій категорії поки немає рецептів.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

export default Categories;