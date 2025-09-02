import React from 'react';
import '../css/quantity.css';

const QuantitySelector = ({ 
  quantity, 
  onQuantityChange, 
  min = 1, 
  max = 10, 
  disabled = false 
}) => {
  const handleDecrease = () => {
    if (quantity > min && !disabled) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < max && !disabled) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= min && value <= max && !disabled) {
      onQuantityChange(value);
    }
  };

  return (
    <div className="quantity-selector">
      <button 
        className="quantity-btn decrease"
        onClick={handleDecrease}
        disabled={quantity <= min || disabled}
        aria-label="Decrease quantity"
      >
        −
      </button>
      
      <input
        type="number"
        className="quantity-input"
        value={quantity}
        onChange={handleInputChange}
        min={min}
        max={max}
        disabled={disabled}
        aria-label="Quantity"
      />
      
      <button 
        className="quantity-btn increase"
        onClick={handleIncrease}
        disabled={quantity >= max || disabled}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;