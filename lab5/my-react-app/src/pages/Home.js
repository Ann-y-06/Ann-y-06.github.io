import React, { useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import RecipeForm from '../components/RecipeForm';
import { Link } from 'react-router-dom';

// Додаємо onDelete сюди, щоб помилка зникла
function Home({ recipes, isFormVisible, toggleForm, onEdit, onSave, onDelete, editingRecipe, user }) {
  const [showOnlyMine, setShowOnlyMine] = useState(false);

  const displayedRecipes = showOnlyMine 
    ? recipes.filter(r => r.author === user?.email)
    : recipes;

  return (
    <main>
      <section id="my-recipes">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <h2>{showOnlyMine ? 'Мої рецепти' : 'Всі рецепти'}</h2>
          
          {user && (
            <div>
              <button 
                className={`tag ${!showOnlyMine ? 'active' : ''}`} 
                onClick={() => setShowOnlyMine(false)}
                style={{ marginRight: '10px', cursor: 'pointer' }}
              >
                Всі рецепти
              </button>
              <button 
                className={`tag ${showOnlyMine ? 'active' : ''}`} 
                onClick={() => setShowOnlyMine(true)}
                style={{ cursor: 'pointer' }}
              >
                Мої рецепти
              </button>
            </div>
          )}
        </div>

        {user ? (
          <>
            <button id="show-form-btn" className="btn-submit" style={{ display: 'block', margin: '20px 0' }} onClick={toggleForm}>
              {isFormVisible ? (editingRecipe ? 'Скасувати редагування' : 'Скасувати') : '+ Додати рецепт'}
            </button>
            {isFormVisible && <RecipeForm currentRecipe={editingRecipe} onSave={onSave} />}
          </>
        ) : (
          <div style={{ backgroundColor: '#fff3cd', padding: '15px', borderRadius: '8px', marginBottom: '20px', color: '#856404', textAlign: 'center' }}>
            Хочете додати свій рецепт? <Link to="/auth" style={{ fontWeight: 'bold', color: '#d35400' }}>Увійдіть в акаунт</Link>
          </div>
        )}

        <div className="recipes-grid">
          {displayedRecipes.length > 0 ? (
            displayedRecipes.map((recipe, index) => (
              <RecipeCard 
                key={recipe.id || index} 
                recipe={recipe} 
                onEdit={onEdit} 
                onDelete={onDelete} 
                showControls={showOnlyMine} 
              />
            ))
          ) : (
            <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#5d4037', padding: '20px' }}>
              Тут поки що немає рецептів.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

export default Home;