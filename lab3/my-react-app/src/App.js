import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css';

import Home from './pages/Home';
import Categories from './pages/Categories';
import CommentsPage from './pages/CommentsPage';

const initialRecipes = [
    {
        title: "Ідеальні сирники",
        time: "25 хв",
        ingredients: "кисломолочний сир, яйця, цукор, борошно.",
        instruction: "Змішати всі інгредієнти, сформувати сирники та обсмажити на сковорідці.",
        image: "https://gotuimo.com/wp-content/uploads/2025/08/syrnyky-reczept-2.jpg",
        category: "🥞 Сніданки"
    },
    {
        title: "Паста Карбонара",
        time: "20 хв",
        ingredients: "спагетті, бекон, жовтки, сир пекоріно, перець.",
        instruction: "Відварити пасту, обсмажити бекон, змішати жовтки з сиром. З'єднати все разом.",
        image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=400",
        category: "🥩 М'ясні страви"
    },
    {
        title: "Шоколадний фондан",
        time: "30 хв",
        ingredients: "чорний шоколад, вершкове масло, яйця, цукор, борошно.",
        instruction: "Розтопити шоколад з маслом, збити яйця з цукром, випікати 10 хв при 200°C.",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=400",
        category: "🍰 Десерти"
    },
    {
        title: "Гарбузовий крем-суп",
        time: "40 хв",
        ingredients: "гарбуз, вершки, цибуля, морква, часник, гарбузове насіння.",
        instruction: "Запекти гарбуз, обсмажити овочі, збити все блендером разом із гарячими вершками.",
        image: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?q=80&w=400",
        category: "🍲 Обіди та супи"
    },
    {
        title: "Запечений батат з нутом",
        time: "45 хв",
        ingredients: "батат, відварений нут, оливкова олія, паприка, свіжий шпинат.",
        instruction: "Нарізати батат кубиками, змішати з нутом, спеціями та олією. Запікати 30 хв при 200°C. Подавати на подушці зі шпинату.",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400",
        category: "🥗 Вегетаріанські страви"
    }
];

const initialComments = [
    { author: "Олена", text: "Сирники за вашим рецептом вийшли просто неймовірні! Дуже дякую!" },
    { author: "Максим", text: "Карбонара — топ. Тільки я ще трохи часнику додав для аромату." }
];

function App() {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [comments, setComments] = useState(initialComments);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null); // Стан для редагування

  // Кнопка показати/сховати форму
  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
    if (isFormVisible) setEditingRecipe(null); // Скидаємо редагування при закритті
  };

  // Коли клікаємо "Редагувати" на картці
  const handleEditClick = (recipeToEdit) => {
    setEditingRecipe(recipeToEdit);
    setIsFormVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Скрол догори до форми
  };

  // Коли сабмітимо форму (зберігаємо зміни або додаємо новий)
  const handleSaveRecipe = (recipeData) => {
    if (editingRecipe) {
      // Оновлюємо існуючий
      setRecipes(recipes.map(r => r === editingRecipe ? recipeData : r));
    } else {
      // Додаємо новий на початок масиву
      setRecipes([recipeData, ...recipes]);
    }
    setIsFormVisible(false);
    setEditingRecipe(null);
  };

  const handleAddComment = (newComment) => {
    setComments([...comments, newComment]); // Додаємо новий коментар у кінець списку
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
              {/* Змінили якір на повноцінний Link */}
              <li><Link to="/comments">Коментарі</Link></li> 
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
              />
            } 
          />
          <Route 
            path="/categories" 
            element={<Categories recipes={recipes} />} 
          />
          {/* Додали новий маршрут для коментарів */}
          <Route 
            path="/comments" 
            element={<CommentsPage comments={comments} onAddComment={handleAddComment} />} 
          />
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