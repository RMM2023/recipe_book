import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery.trim()}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          🍽️ Книга Рецептов
        </Link>
        
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input"
            placeholder="Поиск рецептов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-btn">
            Поиск
          </button>
        </form>
        
        <nav className="nav-links">
          <Link to="/" className="nav-link">Главная</Link>
          <Link to="/categories" className="nav-link">Категории</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header; 