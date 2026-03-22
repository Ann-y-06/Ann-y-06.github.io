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
  const [categories, setCategories] = useState([]);
  
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

  // 2. Завантаження рецептів через сервер (Завдання 3 за методичкою)
  const loadRecipes = () => {
    fetch("https://recepies-ko8y.onrender.com")
      .then(res => res.json())
      .then(data => {
        // Фільтруємо можливі некоректні записи та зберігаємо відсортований сервером масив
        const validRecipes = data.filter(r => r.title && r.title.trim() !== "");
        setRecipes(validRecipes); 
      })
      .catch(err => console.error("Помилка завантаження:", err));
  };

  useEffect(() => {
    loadRecipes();
    
    // Категорії та коментарі читаємо з Firebase напряму
    onValue(ref(db, 'categories'), snapshot => {
      const data = snapshot.val();
      if (data) setCategories(data);
    });
    onValue(ref(db, 'comments'), snapshot => {
      const data = snapshot.val();
      if (data) setComments(Object.values(data));
    });
  }, []);

  const handleLogout = async () => { await signOut(auth); };

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
    if (isFormVisible) setEditingRecipe(null);
  };

  const handleEditClick = (recipeToEdit) => {
    setEditingRecipe(recipeToEdit);
    setIsFormVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 3. Збереження/Оновлення через бекенд (Завдання 4 за методичкою)
  const handleSaveRecipe = async (recipeData) => {
    if (!user) {
      alert("Ви повинні бути авторизовані!");
      return;
    }

    const dataToSend = {
      ...recipeData,
      author: user.email // Прив'язуємо рецепт до пошти для фільтрації "Мої рецепти"
    };

    try {
      const response = await fetch("https://recepies-ko8y.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        setIsFormVisible(false);
        setEditingRecipe(null);
        loadRecipes(); // Оновлюємо список
      } else {
        const errorData = await response.json();
        alert("Помилка сервера: " + errorData.error);
      }
    } catch (error) {
      console.error("Помилка зв'язку:", error);
    }
  };

  // 4. Нова функція видалення через сервер
  const handleDeleteRecipe = async (recipeId) => {
    if (!window.confirm("Ви впевнені, що хочете видалити цей рецепт?")) return;

    try {
      const response = await fetch(`https://recepies-ko8y.onrender.com/api/recipes${recipeId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        loadRecipes(); // Оновлюємо список після видалення
      } else {
        alert("Не вдалося видалити рецепт");
      }
    } catch (error) {
      console.error("Помилка видалення:", error);
    }
  };

  const handleAddComment = async (newComment) => {
    await set(push(ref(db, 'comments')), newComment);
  };

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
          <Route path="/" element={
            <Home 
              recipes={recipes} 
              isFormVisible={isFormVisible} 
              toggleForm={toggleForm}
              onEdit={handleEditClick}
              onSave={handleSaveRecipe}
              onDelete={handleDeleteRecipe} // ПЕРЕДАЄМО ФУНКЦІЮ ВИДАЛЕННЯ
              editingRecipe={editingRecipe}
              user={user}
            />
          } />
          <Route path="/categories" element={<Categories recipes={recipes} categories={categories} />} />
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