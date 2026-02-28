// 1. Масиви з даними
const recipesData = [
    {
        title: "Ідеальні сирники",
        time: "25 хв",
        ingredients: "кисломолочний сир, яйця, цукор, борошно.",
        instruction: "Змішати всі інгредієнти, сформувати сирники та обсмажити на сковорідці.",
        image: "https://gotuimo.com/wp-content/uploads/2025/08/syrnyky-reczept-2.jpg"
    },
    {
        title: "Паста Карбонара",
        time: "20 хв",
        ingredients: "спагетті, бекон, жовтки, сир пекоріно, перець.",
        instruction: "Відварити пасту, обсмажити бекон, змішати жовтки з сиром. З'єднати все разом.",
        image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=400"
    },
    {
        title: "Шоколадний фондан",
        time: "30 хв",
        ingredients: "чорний шоколад, вершкове масло, яйця, цукор, борошно.",
        instruction: "Розтопити шоколад з маслом, збити яйця з цукром, випікати 10 хв при 200°C.",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=400"
    },
    {
        title: "Гарбузовий крем-суп",
        time: "40 хв",
        ingredients: "гарбуз, вершки, цибуля, морква, часник, гарбузове насіння.",
        instruction: "Запекти гарбуз, обсмажити овочі, збити все блендером разом із гарячими вершками.",
        image: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?q=80&w=400"
    }
];

const commentsData = [
    { author: "Олена", text: "Сирники за вашим рецептом вийшли просто неймовірні! Дуже дякую!" },
    { author: "Максим", text: "Карбонара — топ. Тільки я ще трохи часнику додав для аромату." }
];

// 2. Виділення елементів HTML
const recipesContainer = document.getElementById('recipes-container');
const commentsContainer = document.getElementById('comments-container');
const showFormBtn = document.getElementById('show-form-btn');
const formContainer = document.getElementById('recipe-form-container');
const newRecipeForm = document.getElementById('new-recipe-form');
const submitBtn = newRecipeForm.querySelector('button[type="submit"]');

// ГЛОБАЛЬНА ЗМІННА: зберігає картку, яку ми зараз редагуємо
let currentEditCard = null;

// 3. Виводимо рецепти (Цикл for)
for (let i = 0; i < recipesData.length; i++) {
    const recipe = recipesData[i];
    const cardHTML = `
        <article class="recipe-card">
            <img src="${recipe.image}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <p><strong>Час:</strong> ${recipe.time}</p>
            <p><strong>Інгредієнти:</strong> ${recipe.ingredients}</p>
            <p><strong>Інструкція:</strong> ${recipe.instruction}</p>
            <button class="edit-btn" style="background-color: #d35400; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; margin-top: 10px;">✏️ Редагувати</button>
        </article>
    `;
    recipesContainer.innerHTML += cardHTML;
}

// 4. Виводимо коментарі (Цикл for)
for (let i = 0; i < commentsData.length; i++) {
    const comment = commentsData[i];
    const commentHTML = `
        <article class="comment">
            <h4>${comment.author}:</h4>
            <p>"${comment.text}"</p>
        </article>
    `;
    commentsContainer.innerHTML += commentHTML;
}

// 5. Відкриття/закриття форми
showFormBtn.addEventListener('click', function() {
    formContainer.classList.toggle('hidden');
    
    if (formContainer.classList.contains('hidden')) {
        showFormBtn.textContent = '+ Додати рецепт';
        newRecipeForm.reset(); // Очищаємо форму
        currentEditCard = null; // Скидаємо режим редагування
        submitBtn.textContent = 'Опублікувати';
    } else {
        showFormBtn.textContent = 'Скасувати';
    }
});

// 6. Обробка відправки форми (Додавання АБО Редагування)
newRecipeForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('new-title').value;
    const time = document.getElementById('new-time').value;
    const ingredients = document.getElementById('new-ingredients').value;
    const instructions = document.getElementById('new-instructions').value;
    let photoUrl = document.getElementById('new-photo').value;

    if (!photoUrl) {
        photoUrl = "https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=400";
    }

    if (currentEditCard) {
        // РЕЖИМ РЕДАГУВАННЯ: Оновлюємо існуючу картку
        currentEditCard.querySelector('h3').textContent = title;
        currentEditCard.querySelectorAll('p')[0].innerHTML = `<strong>Час:</strong> ${time}`;
        currentEditCard.querySelectorAll('p')[1].innerHTML = `<strong>Інгредієнти:</strong> ${ingredients}`;
        currentEditCard.querySelectorAll('p')[2].innerHTML = `<strong>Інструкція:</strong> ${instructions}`;
        currentEditCard.querySelector('img').src = photoUrl;
        
        alert('Рецепт успішно оновлено!');
    } else {
        // РЕЖИМ СТВОРЕННЯ: Додаємо нову картку
        const newCardHTML = `
            <article class="recipe-card">
                <img src="${photoUrl}" alt="${title}">
                <h3>${title}</h3>
                <p><strong>Час:</strong> ${time}</p>
                <p><strong>Інгредієнти:</strong> ${ingredients}</p>
                <p><strong>Інструкція:</strong> ${instructions}</p>
                <button class="edit-btn" style="background-color: #d35400; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; margin-top: 10px;">✏️ Редагувати</button>
            </article>
        `;
        recipesContainer.innerHTML += newCardHTML;
        alert('Ваш рецепт успішно додано!');
    }

    // Закриваємо форму і скидаємо все до стандартного стану
    newRecipeForm.reset();
    formContainer.classList.add('hidden');
    showFormBtn.textContent = '+ Додати рецепт';
    submitBtn.textContent = 'Опублікувати';
    currentEditCard = null;
});

// 7. Клік по кнопці "Редагувати" на будь-якій картці
recipesContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('edit-btn')) {
        const card = event.target.closest('.recipe-card');
        currentEditCard = card; // Запам'ятовуємо, яку картку редагуємо

        // Читаємо дані з картки і вставляємо їх у поля форми
        document.getElementById('new-title').value = card.querySelector('h3').textContent;
        document.getElementById('new-time').value = card.querySelectorAll('p')[0].textContent.replace('Час: ', '').trim();
        document.getElementById('new-ingredients').value = card.querySelectorAll('p')[1].textContent.replace('Інгредієнти: ', '').trim();
        document.getElementById('new-instructions').value = card.querySelectorAll('p')[2].textContent.replace('Інструкція: ', '').trim();
        document.getElementById('new-photo').value = card.querySelector('img').src;

        // Відкриваємо форму і міняємо тексти кнопок
        formContainer.classList.remove('hidden');
        showFormBtn.textContent = 'Скасувати редагування';
        submitBtn.textContent = 'Зберегти зміни';
        
        // Плавно скролимо екран до форми, щоб було зручно
        formContainer.scrollIntoView({ behavior: 'smooth' });
    }
});