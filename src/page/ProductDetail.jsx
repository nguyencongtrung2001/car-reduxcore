import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import "../css/productDetail.css";
import { clotheall } from "../data/clothes";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ProductDetail = () => {
  const { id } = useParams(); // lấy id từ URL
  const product = clotheall.find((p) => p.id === id);
  const checkCategory = (x) => {
    return x.includes("men") ? "men" : "women";
  };
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(true);
  };
  const formatPrice = (price) =>{
   return new Intl.NumberFormat('vi-VN',{
    style:'currency',
    currency:'VND'
   }).format(price)
  }
  const [selectSize,setSelectSize] =useState('S')
  const [quantity,setQuantity] = useState(1)

    const handleQuantityChange = (change) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity)
    }
  }

  return (
    <div className="product-detail-container">
      <Header/>
      {/* HEADER */}
      <div className="detail-header">
        <nav className="breadcrumb">
          <Link to="/home">Home</Link>
          <span>/</span>
          <span>{checkCategory(product.id)}</span>
          <span>/</span>
          <span>{product.name}</span>
        </nav>
      </div>

      {/* CONTENT */}
      <div className="detail-content">
        {/* IMAGE SECTION */}
        <div className="detail-image-section">
          <div className="main-image-container">
            <img
              src={product.image}
              alt={product.name}
              className="main-image"
            />
            <button
              className={`favorite-btn ${isFavorite ? "active" : ""}`}
              onClick={toggleFavorite}
            >
              <FaHeart />
            </button>
          </div>
        </div>

        {/* INFO SECTION */}
        <div className="detail-info-section">
          <div className="product-meta">
            <span className="product-category">
              {checkCategory(product.id) ? "Men's Fashion" : "Women's Fashion"}
            </span>
            <div className="product-rating">
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} className={star <= 4 ? "filled" : ""} />
                ))}
              </div>
              <span className="rating-text">(4.0) 128 reviews</span>
            </div>
          </div>

          <h1 className="product-title">{product.name}</h1>
          <p className="product-description">
            Premium quality {checkCategory(product.id) ? 'men\'s' : 'women\'s'}fashion item. Made with high-quality materials
            for comfort and style. Perfect for both casual and formal occasions.
          </p>

          <div className="price-section">
            <span className="current-price">{formatPrice(product.price)}</span>
            <span className="original-price">{formatPrice(product.price*1.2)}</span>
            <span className="discount-badge">-17%</span>
          </div>

          <div className="product-option">
            <div className="size-selection">
              <h3>Size</h3>
              <div className="size-options">
                {
                  product.sizes.map(size => (
                    <button key={size} className={`size-btn ${selectSize === size ? 'active' : ''}`} onClick={() => setSelectSize(size)}>{size}</button>
                  ))
                }
              </div>
            </div>

            <div className="quantity-selection">
              <h3>Quantity</h3>
                <div className='quantity-controls'>
                <button 
                  className='quantity-btn'
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className='quantity-display'>{quantity}</span>
                <button 
                  className='quantity-btn'
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 10}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <button className="add-to-cart-btn">
              <FaShoppingCart /> Add to Cart
            </button>
            <button className="buy-now-btn">Buy Now</button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ProductDetail;
