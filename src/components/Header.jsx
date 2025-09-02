import React, { useContext } from "react";
import "../css/header.css";
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import SearchModal from "./SearchModal";

const Header = () => {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  
  // ✅ Thêm error handling cho localStorage
  let userEmail = "Guest"; // Default value
  
  try {
    const emailtext = localStorage.getItem("users");
    if (emailtext) {
      const userObj = JSON.parse(emailtext);
      userEmail = userObj.emails || "Guest";
    }
  } catch (error) {
    console.error("Error parsing user data from localStorage:", error);
  }

  // Calculate total items in cart
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleHomeClick = () => {
    navigate('/home');
  };

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  return (
    <>
      <header className="header">
        {/* Logo */}
        <div className="header__title" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
          <h1 className="header__logo">
            <span className="logo-text">FASHION</span>
            <span className="logo-cube">CUBE</span>
          </h1>
        </div>

        {/* Navigation menu */}
        <div className="header__menu">
          <nav className="header__nav">
            <ul className="nav__links">
              <li className="nav__item" onClick={handleHomeClick}>HOME</li>
              <li className="nav__item">SHOP</li>
              <li className="nav__item">CONTACT</li>
            </ul>
          </nav>

          {/* Icons menu */}
          <nav className="header__nav">
            <ul className="header__icons">
              <li className="header__icon header__icon--search" onClick={handleSearchClick}>
                <FaSearch />
              </li>
              <li className="header__icon header__icon--user">
                <FaUser />
                <div className="user-dropdown">
                  <span className="user-email">{userEmail}</span>
                  <button onClick={() => navigate('/')} className="logout-btn">
                    Logout
                  </button>
                </div>
              </li>
              <li className="header__icon header__icon--cart" onClick={handleCartClick}>
                <FaShoppingCart />
                {getTotalItems() > 0 && (
                  <span className="cart-badge">{getTotalItems()}</span>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>
      
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
};

export default Header;