import React from 'react';

// Компонент приймає поточну обрану категорію і функцію для її зміни
function Categories({ selectedCategory, onSelectCategory }) {
  // Список всіх можливих категорій + кнопка "Всі"
  const categoriesList = [
    "Всі", 
    "Сніданки", 
    "Обіди та супи", 
    "Десерти", 
    "Вегетаріанські страви", 
    "М'ясні страви"
  ];

  return (
    <section id="categories" style={{ textAlign: 'center', marginBottom: '30px' }}>
      <h2>Категорії страв</h2>
      <div className="category-tags" style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
        
        {/* Проходимося по масиву категорій і малюємо кнопку для кожної */}
        {categoriesList.map(category => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            style={{
              padding: '10px 20px',
              // Якщо категорія обрана, робимо її помаранчевою, якщо ні — білою
              backgroundColor: selectedCategory === category ? '#d35400' : '#fff',
              color: selectedCategory === category ? '#fff' : '#4a3b32',
              border: '2px solid #d35400',
              borderRadius: '25px',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: '0.3s'
            }}
          >
            {category}
          </button>
        ))}

      </div>
    </section>
  );
}

export default Categories;