import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import RecipeDetail from './components/RecipeDetail';
import SearchResults from './components/SearchResults';
import Categories from './components/Categories';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/search/:query" element={<SearchResults />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:category" element={<SearchResults />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
