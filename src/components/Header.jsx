import React from "react";
import "../css/header.css";
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";

const Header = () => {
  let emailtext = localStorage.getItem("users");
  console.log(emailtext);

  let userObj = JSON.parse(emailtext);
  console.log(userObj.emails);


  return (
    <header className="header">
      {/* Logo */}
      <div className="header__title">
        <h1 className="header__logo">
          <span className="logo-text">FASHION</span>
          <span className="logo-cube">CUBE</span>
        </h1>
      </div>

      {/* Navigation menu */}
      <div className="header__menu">
        <nav className="header__nav">
          <ul className="nav__links">
            <li className="nav__item">HOME</li>
            <li className="nav__item">SHOP</li>
            <li className="nav__item">CONTACT</li>
          </ul>
        </nav>

        {/* Icons menu */}
        <nav className="header__nav">
          <ul className="header__icons">
            <li className="header__icon header__icon--search">
              <FaSearch />
            </li>
            <li className="header__icon header__icon--user">
              <FaUser />
            
            </li>
            <li className="header__icon header__icon--cart">
              <FaShoppingCart />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
