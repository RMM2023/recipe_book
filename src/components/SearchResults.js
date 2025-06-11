import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import mealAPI from '../services/api';
import RecipeCard from './RecipeCard';

function SearchResults() {
  const { query, category } = useParams();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        let results = [];
        
        if (query) {
          // Поиск по названию
          results = await mealAPI.searchMealsByName(query);
        } else if (category) {
          // Поиск по категории
          results = await mealAPI.getMealsByCategory(category);
        }
        
        setMeals(results);
      } catch (err) {
        setError('Ошибка при поиске рецептов');
        console.error('Error fetching search results:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, category]);

  const getTitle = () => {
    if (query) {
      return `Результаты поиска: "${query}"`;
    } else if (category) {
      return `Рецепты категории: ${category}`;
    }
    return 'Результаты поиска';
  };

  if (loading) {
    return <div className="loading">Поиск рецептов...</div>;
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <Link to="/" className="nav-link" style={{ color: '#667eea' }}>
          ← Назад к рецептам
        </Link>
      </div>

      <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#333' }}>
        {getTitle()}
      </h1>

      {error && (
        <div className="error">{error}</div>
      )}

      {!error && meals.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem',
          color: '#666',
          fontSize: '1.2rem'
        }}>
          <p>😔 Рецепты не найдены</p>
          <p style={{ marginTop: '1rem', fontSize: '1rem' }}>
            Попробуйте изменить поисковый запрос или выберите другую категорию
          </p>
        </div>
      )}

      {!error && meals.length > 0 && (
        <>
          <p style={{ color: '#666', marginBottom: '2rem' }}>
            Найдено рецептов: {meals.length}
          </p>
          
          <div className="recipe-grid">
            {meals.map((meal) => (
              <RecipeCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default SearchResults; 