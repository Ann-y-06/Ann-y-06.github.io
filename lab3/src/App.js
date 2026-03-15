import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import RecipeCard from './components/RecipeCard';
import RecipeForm from './components/RecipeForm';
import Categories from './components/Categories';
import Comments from './components/Comments'; // Підключаємо справжній компонент коментарів

// Оновлена база рецептів
const initialRecipes = [
  {
    id: 1,
    title: "Ідеальні сирники",
    category: "Сніданки",
    time: "25 хв",
    ingredients: "кисломолочний сир, яйця, цукор, борошно.",
    instruction: "Змішати всі інгредієнти, сформувати сирники та обсмажити на сковорідці.",
    image: "https://gotuimo.com/wp-content/uploads/2025/08/syrnyky-reczept-2.jpg"
  },
  {
    id: 2,
    title: "Гарбузовий крем-суп",
    category: "Обіди та супи",
    time: "40 хв",
    ingredients: "гарбуз, вершки, цибуля, морква, часник, гарбузове насіння.",
    instruction: "Запекти гарбуз, обсмажити овочі, збити все блендером разом із гарячими вершками.",
    image: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?q=80&w=400"
  },
  {
    id: 3,
    title: "Паста Карбонара",
    category: "М'ясні страви",
    time: "20 хв",
    ingredients: "спагетті, бекон, жовтки, сир пекоріно, перець.",
    instruction: "Відварити пасту, обсмажити бекон, змішати жовтки з сиром. З'єднати все разом.",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=400"
  },
  {
    id: 4,
    title: "Шоколадний фондан",
    category: "Десерти",
    time: "30 хв",
    ingredients: "чорний шоколад, вершкове масло, яйця, цукор, борошно.",
    instruction: "Розтопити шоколад з маслом, збити яйця з цукром, випікати 10 хв при 200°C.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=400"
  },
  {
    id: 5,
    title: "Грецький салат",
    category: "Вегетаріанські страви",
    time: "15 хв",
    ingredients: "помідори, огірки, перець, сир фета, маслини, оливкова олія.",
    instruction: "Нарізати всі овочі великими шматками, додати маслини та сир фета. Заправити оливковою олією.",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=400"
  }
];

function App() {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [selectedCategory, setSelectedCategory] = useState("Всі");

  const handleAddRecipe = (newRecipe) => {
    setRecipes([...recipes, newRecipe]);
  };

  const filteredRecipes = selectedCategory === "Всі" 
    ? recipes 
    : recipes.filter(recipe => recipe.category === selectedCategory);

  return (
    <Router>
      <div>
        <header>
          <h1>Світ Рецептів</h1>
          <nav className="main-nav">
            <Link to="/">Рецепти</Link>
            <Link to="/add">Створити рецепт</Link>
            <Link to="/comments">Коментарі</Link>
          </nav>
        </header>
        
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <Categories 
                  selectedCategory={selectedCategory} 
                  onSelectCategory={setSelectedCategory} 
                />
                <section id="my-recipes">
                  <div className="recipes-grid">
                    {filteredRecipes.map(recipe => (
                      <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                    {filteredRecipes.length === 0 && (
                      <p style={{ textAlign: 'center', gridColumn: '1 / -1', fontSize: '18px' }}>
                        У цій категорії ще немає рецептів. 🍽️
                      </p>
                    )}
                  </div>
                </section>
              </>
            } />

            <Route path="/add" element={
              <section>
                <RecipeForm onAddRecipe={handleAddRecipe} />
              </section>
            } />

            {/* Замінили заглушку на справжній компонент коментарів */}
            <Route path="/comments" element={<Comments />} />

          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;