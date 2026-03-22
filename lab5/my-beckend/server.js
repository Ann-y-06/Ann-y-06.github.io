const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// 1. Налаштування підключення до твоєї бази (заміни URL на свій з Firebase Console)
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://recipes-app-lab4-default-rtdb.europe-west1.firebasedatabase.app/" 
});

const db = admin.database(); // Працюємо з Realtime Database
const app = express();

app.use(cors());
app.use(express.json());

// 2. Маршрут GET: Отримання рецептів із сортуванням за часом (Варіант 25)
app.get('/api/recipes', (req, res) => {
  const ref = db.ref('recipes');
  
  ref.once('value', (snapshot) => {
    const data = snapshot.val();
    if (!data) return res.json([]);

    // Перетворюємо об'єкт у масив та сортуємо за часом приготування (time)
    const recipesArray = Object.keys(data).map(key => ({
      id: key,
      ...data[key]
    }));

    // Сортування: від найшвидших до тих, що готуються довго
    recipesArray.sort((a, b) => parseInt(a.time) - parseInt(b.time));

    res.json(recipesArray);
  }, (error) => {
    res.status(500).json({ error: error.message });
  });
});

// 3. Маршрут POST: Збереження нового рецепта (Варіант 25)
app.post('/api/recipes', (req, res) => {
  const recipeData = req.body;
  const ref = admin.database().ref('recipes');

  // Якщо є id — це редагування (Завдання 4)
  if (recipeData.id) {
    const { id, ...data } = recipeData;
    ref.child(id).set(data)
      .then(() => res.json({ message: "Оновлено" }))
      .catch(err => res.status(500).json(err));
  } else {
    // Якщо id немає — це новий рецепт (Завдання 4)
    ref.push(recipeData)
      .then(() => res.json({ message: "Створено" }))
      .catch(err => res.status(500).json(err));
  }
});

// 4. Хостинг статичних файлів (вимога п.1 твого варіанту)
app.use(express.static('public'));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Бекенд запущено на http://localhost:${PORT}`);
});

// Маршрут DELETE: Видалення рецепту за ID
app.delete('/api/recipes/:id', (req, res) => {
  const recipeId = req.params.id;
  const ref = admin.database().ref('recipes');

  ref.child(recipeId).remove()
    .then(() => res.json({ message: "Рецепт видалено успішно" }))
    .catch(err => res.status(500).json({ error: err.message }));
});