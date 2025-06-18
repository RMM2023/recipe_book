import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import mealAPI from '../services/api';
import RecipeCard from './RecipeCard';

function Home() {
  const [featuredMeal, setFeaturedMeal] = useState(null);
  const [randomMeals, setRandomMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [featured, random] = await Promise.all([
          mealAPI.getMealOfTheDay(),
          mealAPI.getRandomMeals(6)
        ]);
        
        setFeaturedMeal(featured);
        setRandomMeals(random);
      } catch (err) {
        setError('Ошибка при загрузке рецептов');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Загрузка рецептов...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      {featuredMeal && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#333' }}>
            🌟 Рецепт дня
          </h2>
          <div className="recipe-detail">
            <div className="recipe-header">
              <img 
                src={featuredMeal.strMealThumb} 
                alt={featuredMeal.strMeal}
                className="recipe-detail-image"
              />
              <div className="recipe-overlay">
                <h3 className="recipe-detail-title">{featuredMeal.strMeal}</h3>
                <div className="recipe-meta">
                  <span>📍 {featuredMeal.strArea}</span>
                  <span>🏷️ {featuredMeal.strCategory}</span>
                </div>
                <Link 
                  to={`/recipe/${featuredMeal.idMeal}`}
                  className="search-btn"
                  style={{ 
                    display: 'inline-block', 
                    marginTop: '1rem',
                    textDecoration: 'none'
                  }}
                >
                  Смотреть рецепт
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <h2 style={{ fontSize: '2rem', color: '#333' }}>
            🔥 Популярные рецепты
          </h2>
          <Link to="/categories" className="nav-link" style={{ color: '#667eea' }}>
            Все категории →
          </Link>
        </div>
        
        <div className="recipe-grid">
          {randomMeals.map((meal) => (
            <RecipeCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home; 