import React, { useContext } from 'react';
import { CartContext } from '../components/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/cart.css';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="cart-page">
      <Header />
      <div className="cart-container">
        <h1 className="cart-title">Your Shopping Cart</h1>
        
        {cart.length === 0 ? (
          <div className="empty-cart">
            <h2>🛒 Your cart is empty</h2>
            <p>Start shopping to add items to your cart</p>
            <button 
              className="continue-shopping-btn"
              onClick={() => window.location.href = '/home'}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cart.map((item, index) => (
                <div key={`${item.id}-${item.size}-${index}`} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  
                  <div className="item-details">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-size">Size: {item.size}</p>
                    <p className="item-price">{formatPrice(item.price)}</p>
                  </div>
                  
                  <div className="item-quantity">
                    <span>Quantity: {item.quantity}</span>
                  </div>
                  
                  <div className="item-total">
                    <span className="total-price">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                  
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id, item.size)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <div className="summary-content">
                <h3>Order Summary</h3>
                <div className="summary-row">
                  <span>Items ({cart.length})</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
                
                <div className="cart-actions">
                  <button className="checkout-btn">
                    Proceed to Checkout
                  </button>
                  <button className="clear-cart-btn" onClick={clearCart}>
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;