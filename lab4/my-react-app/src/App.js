import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css';

// Firebase
import { auth, db } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { ref, onValue, push, set } from 'firebase/database';

import Home from './pages/Home';
import Categories from './pages/Categories';
import CommentsPage from './pages/CommentsPage';
import AuthForm from './components/AuthForm';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [comments, setComments] = useState([]);
  const [categories, setCategories] = useState([]); // Категорії з БД
  
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [user, setUser] = useState(null);

  // 1. Відстежуємо стан авторизації
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // 2. Завантажуємо дані з Firebase Realtime Database
  useEffect(() => {
    // Читаємо Рецепти
    onValue(ref(db, 'recipes'), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Перетворюємо об'єкт з бази на масив
        const loadedRecipes = Object.keys(data).map(key => ({
          dbKey: key, // Зберігаємо ключ бази для редагування
          ...data[key]
        }));
        setRecipes(loadedRecipes.reverse());
      } else {
        setRecipes([]);
      }
    });

    // Читаємо Категорії
    onValue(ref(db, 'categories'), (snapshot) => {
      const data = snapshot.val();
      if (data) setCategories(data);
    });

    // Читаємо Коментарі
    onValue(ref(db, 'comments'), (snapshot) => {
      const data = snapshot.val();
      if (data) setComments(Object.values(data));
    });
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
    if (isFormVisible) setEditingRecipe(null);
  };

  const handleEditClick = (recipeToEdit) => {
    setEditingRecipe(recipeToEdit);
    setIsFormVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Збереження рецепту в Базу Даних
  const handleSaveRecipe = async (recipeData) => {
    if (!user) return; // Захист

    // Додаємо email автора до рецепту (вимога 25 варіанту)
    const recipeToSave = {
      ...recipeData,
      author: user.email 
    };

    if (editingRecipe && editingRecipe.dbKey) {
      // Оновлюємо існуючий
      await set(ref(db, 'recipes/' + editingRecipe.dbKey), recipeToSave);
    } else {
      // Додаємо новий (push створює унікальний ID)
      const newRecipeRef = push(ref(db, 'recipes'));
      await set(newRecipeRef, recipeToSave);
    }
    setIsFormVisible(false);
    setEditingRecipe(null);
  };

  // Збереження коментаря в Базу
  const handleAddComment = async (newComment) => {
    const newCommentRef = push(ref(db, 'comments'));
    await set(newCommentRef, newComment);
  };

  // ФІЛЬТРУЄМО РЕЦЕПТИ: Показуємо тільки рецепти поточного юзера (Варіант 25)
  // (Або старі рецепти, у яких ще немає поля author)
  const myRecipes = recipes.filter(r => r.author === user?.email || !r.author);

  return (
    <Router>
      <div className="App">
        <header>
          <h1>Світ Рецептів</h1>
          <nav>
            <ul>
              <li><Link to="/">Рецепти</Link></li>
              <li><Link to="/categories">Категорії</Link></li>
              <li><Link to="/comments">Коментарі</Link></li>
              <li>
                {user ? (
                  <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }} style={{ color: '#f39c12' }}>
                    Вийти ({user.email})
                  </a>
                ) : (
                  <Link to="/auth" style={{ color: '#f39c12' }}>Увійти</Link>
                )}
              </li>
            </ul>
          </nav>
        </header>

        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                recipes={recipes} 
                isFormVisible={isFormVisible} 
                toggleForm={toggleForm}
                onEdit={handleEditClick}
                onSave={handleSaveRecipe}
                editingRecipe={editingRecipe}
                user={user}
              />
            } 
          />
          <Route path="/categories" element={<Categories recipes={recipes} categories={categories} />} />
          {/* Передали user сюди: */}
          <Route path="/comments" element={<CommentsPage comments={comments} onAddComment={handleAddComment} user={user} />} />
          <Route path="/auth" element={<AuthForm />} />
        </Routes>

        <footer>
          <p>© 2026 Світ Рецептів. Всі права захищені.</p>
          <p>Контакти: info@recipes-platform.com | +380 (99) 123-45-67</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;