import React, { useState, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { clotheall } from '../data/clothes';
import { useNavigate } from 'react-router-dom';
import '../css/search.css';

const SearchModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm.trim()) {
      const results = clotheall.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 6); // Limit to 6 results
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    onClose();
    setSearchTerm('');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  if (!isOpen) return null;

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="search-header">
          <div className="search-input-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
              autoFocus
            />
          </div>
          <button className="close-search" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="search-results">
          {searchTerm.trim() && searchResults.length === 0 && (
            <div className="no-results">
              <p>No products found for "{searchTerm}"</p>
            </div>
          )}
          
          {searchResults.map(product => (
            <div
              key={product.id}
              className="search-result-item"
              onClick={() => handleProductClick(product.id)}
            >
              <img src={product.image} alt={product.name} />
              <div className="result-info">
                <h4>{product.name}</h4>
                <p className="result-price">{formatPrice(product.price)}</p>
                {!product.inStock && (
                  <span className="out-of-stock-badge">Out of Stock</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;