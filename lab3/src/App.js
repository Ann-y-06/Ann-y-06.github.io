import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { ref, onValue, push } from "firebase/database";
import { auth, db } from './firebase'; 
import './App.css';
import RecipeCard from './components/RecipeCard';
import RecipeForm from './components/RecipeForm';
import Categories from './components/Categories';
import Comments from './components/Comments';
import Auth from './components/Auth';

function App() {
  const [recipes, setRecipes] = useState([]); // Початковий стан — порожній масив
  const [selectedCategory, setSelectedCategory] = useState("Всі");
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (u) => setUser(u));

    const recipesRef = ref(db, 'recipes');
    onValue(recipesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const firebaseList = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setRecipes(firebaseList); // Тепер беремо ТІЛЬКИ з бази
      } else {
        setRecipes([]);
      }
    });
  }, []);

  const handleAddRecipe = async (newRecipe) => {
    await push(ref(db, 'recipes'), newRecipe);
  };

  const filteredRecipes = selectedCategory === "Всі" 
    ? recipes 
    : recipes.filter(r => r.category === selectedCategory);

  return (
    <Router>
      <header>
        <h1>Світ Рецептів</h1>
        <nav className="main-nav">
          <Link to="/">Рецепти</Link>
          <Link to="/add">Створити рецепт</Link>
          <Link to="/comments">Коментарі</Link>
        </nav>
      </header>
      <main>
        <Auth user={user} />
        <Routes>
          <Route path="/" element={
            <>
              <Categories selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
              <div className="recipes-grid">
                {user ? filteredRecipes.map(r => <RecipeCard key={r.id} recipe={r} />) : <p style={{textAlign: 'center', gridColumn: '1/-1'}}>Авторизуйтесь для перегляду 🔒</p>}
              </div>
            </>
          } />
          <Route path="/add" element={user ? <RecipeForm onAddRecipe={handleAddRecipe} /> : <p>Авторизуйтесь!</p>} />
          <Route path="/comments" element={<Comments />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;