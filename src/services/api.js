import axios from 'axios';

const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const mealAPI = {
  // Получить случайные рецепты
  getRandomMeals: async (count = 8) => {
    const promises = Array.from({ length: count }, () => 
      api.get('/random.php')
    );
    const responses = await Promise.all(promises);
    return responses.map(response => response.data.meals[0]);
  },

  // Поиск рецептов по названию
  searchMealsByName: async (query) => {
    const response = await api.get(`/search.php?s=${query}`);
    return response.data.meals || [];
  },

  // Получить рецепт по ID
  getMealById: async (id) => {
    const response = await api.get(`/lookup.php?i=${id}`);
    return response.data.meals ? response.data.meals[0] : null;
  },

  // Получить все категории
  getCategories: async () => {
    const response = await api.get('/categories.php');
    return response.data.categories || [];
  },

  // Получить рецепты по категории
  getMealsByCategory: async (category) => {
    const response = await api.get(`/filter.php?c=${category}`);
    return response.data.meals || [];
  },

  // Получить все области (страны)
  getAreas: async () => {
    const response = await api.get('/list.php?a=list');
    return response.data.meals || [];
  },

  // Получить рецепты по области
  getMealsByArea: async (area) => {
    const response = await api.get(`/filter.php?a=${area}`);
    return response.data.meals || [];
  },

  // Получить рецепт дня
  getMealOfTheDay: async () => {
    const response = await api.get('/random.php');
    return response.data.meals[0];
  }
};

export default mealAPI; 