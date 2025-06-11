import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import mealAPI from '../services/api';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const categoriesData = await mealAPI.getCategories();
        setCategories(categoriesData);
      } catch (err) {
        setError('Ошибка при загрузке категорий');
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="loading">Загрузка категорий...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <Link to="/" className="nav-link" style={{ color: '#667eea' }}>
          ← Назад к рецептам
        </Link>
      </div>

      <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#333' }}>
        🏷️ Категории рецептов
      </h1>

      <p style={{ color: '#666', marginBottom: '2rem' }}>
        Выберите интересующую вас категорию, чтобы найти вкусные рецепты
      </p>

      <div className="categories-grid">
        {categories.map((category) => (
          <Link 
            key={category.idCategory} 
            to={`/category/${category.strCategory}`}
            className="category-card"
          >
            <img 
              src={category.strCategoryThumb} 
              alt={category.strCategory}
              className="category-image"
            />
            <div className="category-name">
              {category.strCategory}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Categories; 