import React, { useContext } from 'react';
import { CartContext } from '../components/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import QuantitySelector from '../components/QuantitySelector';
import { useNotification } from '../components/Notification';
import '../css/cart.css';

const Cart = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useContext(CartContext);
  const { addNotification, NotificationContainer } = useNotification();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleQuantityChange = (productId, size, newQuantity) => {
    updateQuantity(productId, size, newQuantity);
    addNotification('Quantity updated successfully!', 'success');
  };

  const handleRemoveItem = (productId, size, productName) => {
    removeFromCart(productId, size);
    addNotification(`${productName} removed from cart`, 'success');
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
      addNotification('Cart cleared successfully!', 'success');
    }
  };
  return (
    <div className="cart-page">
      <Header />
      <NotificationContainer />
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
                    <QuantitySelector
                      quantity={item.quantity}
                      onQuantityChange={(newQuantity) => 
                        handleQuantityChange(item.id, item.size, newQuantity)
                      }
                      min={1}
                      max={10}
                    />
                  </div>
                  
                  <div className="item-total">
                    <span className="total-price">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                  
                  <button 
                    className="remove-btn"
                    onClick={() => handleRemoveItem(item.id, item.size, item.name)}
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
                  <span>Items ({cart.reduce((total, item) => total + item.quantity, 0)})</span>
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
                  <button className="clear-cart-btn" onClick={handleClearCart}>
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