import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, onValue } from "firebase/database";

const Categories = ({ selectedCategory, onSelectCategory }) => {
  const [categories, setCategories] = useState(["Всі"]);

  useEffect(() => {
    // Посилання на шлях 'categories' у базі 
    const categoriesRef = ref(db, 'categories');

    // Отримання даних у реальному часі 
    onValue(categoriesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCategories(data);
      }
    });
  }, []);

  return (
    <nav className="categories">
      {categories.map((category, index) => (
        <button 
          key={index} 
          className={selectedCategory === category ? 'active' : ''}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </nav>
  );
};

export default Categories;