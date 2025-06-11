import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import mealAPI from '../services/api';

function RecipeDetail() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        setLoading(true);
        const mealData = await mealAPI.getMealById(id);
        setMeal(mealData);
      } catch (err) {
        setError('Ошибка при загрузке рецепта');
        console.error('Error fetching meal:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeal();
  }, [id]);

  const getIngredients = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          ingredient: ingredient.trim(),
          measure: measure ? measure.trim() : ''
        });
      }
    }
    return ingredients;
  };

  if (loading) {
    return <div className="loading">Загрузка рецепта...</div>;
  }

  if (error || !meal) {
    return (
      <div className="error">
        {error || 'Рецепт не найден'}
        <br />
        <Link to="/" className="nav-link" style={{ color: '#667eea' }}>
          ← Вернуться на главную
        </Link>
      </div>
    );
  }

  const ingredients = getIngredients(meal);

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <Link to="/" className="nav-link" style={{ color: '#667eea' }}>
          ← Назад к рецептам
        </Link>
      </div>

      <div className="recipe-detail">
        <div className="recipe-header">
          <img 
            src={meal.strMealThumb} 
            alt={meal.strMeal}
            className="recipe-detail-image"
          />
          <div className="recipe-overlay">
            <h1 className="recipe-detail-title">{meal.strMeal}</h1>
            <div className="recipe-meta">
              <span>📍 {meal.strArea}</span>
              <span>🏷️ {meal.strCategory}</span>
              {meal.strTags && (
                <span>🏷️ {meal.strTags}</span>
              )}
            </div>
          </div>
        </div>

        <div className="recipe-body">
          {/* Ингредиенты */}
          <div className="recipe-section">
            <h3>🥘 Ингредиенты</h3>
            <div className="ingredients-list">
              {ingredients.map((item, index) => (
                <div key={index} className="ingredient-item">
                  <strong>{item.ingredient}</strong>
                  {item.measure && <span> — {item.measure}</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Инструкции */}
          <div className="recipe-section">
            <h3>👨‍🍳 Инструкция по приготовлению</h3>
            <div className="instructions">
              {meal.strInstructions.split('\n').map((step, index) => (
                step.trim() && (
                  <p key={index} style={{ marginBottom: '1rem' }}>
                    {step.trim()}
                  </p>
                )
              ))}
            </div>
          </div>

          {/* Видео */}
          {meal.strYoutube && (
            <div className="recipe-section">
              <h3>📺 Видео рецепт</h3>
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                <iframe
                  src={meal.strYoutube.replace('watch?v=', 'embed/')}
                  title="Видео рецепт"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    borderRadius: '10px'
                  }}
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* Источник */}
          {meal.strSource && (
            <div className="recipe-section">
              <h3>🔗 Источник</h3>
              <a 
                href={meal.strSource} 
                target="_blank" 
                rel="noopener noreferrer"
                className="nav-link"
                style={{ color: '#667eea' }}
              >
                Перейти к оригинальному рецепту →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail; 