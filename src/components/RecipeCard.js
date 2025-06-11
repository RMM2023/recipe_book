import React from 'react';
import { Link } from 'react-router-dom';

function RecipeCard({ meal }) {
  return (
    <Link to={`/recipe/${meal.idMeal}`} className="recipe-card">
      <img 
        src={meal.strMealThumb} 
        alt={meal.strMeal}
        className="recipe-image"
      />
      <div className="recipe-content">
        <h3 className="recipe-title">{meal.strMeal}</h3>
        {meal.strCategory && (
          <div className="recipe-category">🏷️ {meal.strCategory}</div>
        )}
        {meal.strArea && (
          <div className="recipe-area">📍 {meal.strArea}</div>
        )}
      </div>
    </Link>
  );
}

export default RecipeCard; 