import React, { useState } from 'react';
import RecipeCard from '../components/RecipeCard';

function Categories({ recipes }) {
  const [selectedCategory, setSelectedCategory] = useState('Всі');
  
  // Точні назви категорій з твоєї другої лабораторної
  const categoriesList = [
    'Всі', 
    '🥞 Сніданки', 
    '🍲 Обіди та супи', 
    '🍰 Десерти', 
    '🥗 Вегетаріанські страви', 
    "🥩 М'ясні страви"
  ];

  const filteredRecipes = selectedCategory === 'Всі' 
    ? recipes 
    : recipes.filter(recipe => recipe.category === selectedCategory);

  return (
    <main>
      <section id="categories">
        <h2>Категорії страв</h2>
        
        <div className="category-tags" style={{ marginBottom: '30px' }}>
          {categoriesList.map(category => (
            <a 
              key={category} 
              href="#"
              className="tag" 
              onClick={(e) => {
                e.preventDefault(); // Щоб посилання не перезавантажувало сторінку
                setSelectedCategory(category);
              }}
            >
              {category}
            </a>
          ))}
        </div>

        <div className="recipes-grid">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} />
            ))
          ) : (
            <p style={{ color: '#5d4037', fontStyle: 'italic' }}>У цій категорії поки немає рецептів.</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default Categories;