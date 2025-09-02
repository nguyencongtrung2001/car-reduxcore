import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaStar, FaTruck, FaUndo, FaCertificate } from "react-icons/fa";
import "../css/productDetail.css";
import { clotheall, clothemen, clothewomen } from "../data/clothes";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CartContext } from "../components/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = clotheall.find((p) => p.id === id);

  // ✅ Sửa logic kiểm tra category
  const checkCategory = (productId) => {
    return productId.includes("men") ? "Men's" : "Women's";
  };

  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const [selectSize, setSelectSize] = useState("S");
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  // ✅ Sửa logic lấy related products
  const getRelatedProducts = () => {
    const isMenProduct = product.id.includes("men");
    const relatedArray = isMenProduct ? clothemen : clothewomen;
    // Lọc bỏ sản phẩm hiện tại và lấy 4 sản phẩm random
    return relatedArray
      .filter(item => item.id !== product.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
  };

  // ✅ Hàm navigate đến product khác
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    window.scrollTo(0, 0); // Scroll to top
  };

  if (!product) {
    return (
      <div className="product-detail-container">
        <Header />
        <div style={{ textAlign: "center", padding: "50px", color: "white" }}>
          <h2>Product not found</h2>
          <Link to="/home" style={{ color: "#ff4500" }}>
            Back to Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

   const { addToCart } = useContext(CartContext);
  const handleAddToCart = () => {
    addToCart(product, selectSize, quantity);
    alert("✅ Added to cart!");
  };
  return (
    <div className="product-detail-container">
      <Header />
      
      {/* BREADCRUMB */}
      <div className="detail-header">
        <nav className="breadcrumb">
          <Link to="/home">Home</Link>
          <span>/</span>
          <span>{checkCategory(product.id)}</span>
          <span>/</span>
          <span>{product.name}</span>
        </nav>
      </div>

      {/* MAIN CONTENT */}
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
              {checkCategory(product.id)} Fashion
            </span>
            <div className="product-rating">
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} className={star <= 4 ? "filled" : "empty"} />
                ))}
              </div>
              <span className="rating-text">(4.0) 128 reviews</span>
            </div>
          </div>

          <h1 className="product-title">{product.name}</h1>
          <p className="product-description">
            {product.description || `Premium quality ${checkCategory(product.id).toLowerCase()} fashion item. Made with high-quality materials for comfort and style. Perfect for both casual and formal occasions.`}
          </p>

          <div className="price-section">
            <span className="current-price">{formatPrice(product.price)}</span>
            <span className="original-price">
              {formatPrice(product.price * 1.2)}
            </span>
            <span className="discount-badge">-17%</span>
          </div>

          <div className="product-option">
            <div className="size-selection">
              <h3>Size</h3>
              <div className="size-options">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-btn ${selectSize === size ? "active" : ""}`}
                    onClick={() => setSelectSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="quantity-selection">
              <h3>Quantity</h3>
              <div className="quantity-controls">
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="quantity-display">{quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 10}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              <FaShoppingCart /> Add to Cart
            </button>
            <button className="buy-now-btn">Buy Now</button>
          </div>

          {/* PRODUCT FEATURES */}
          <div className="product-features">
            <div className="feature">
              <FaTruck className="feature-icon" />
              <div className="feature-content">
                <h4>Free Shipping</h4>
                <p>Free shipping on orders over 500,000 VND</p>
              </div>
            </div>
            <div className="feature">
              <FaUndo className="feature-icon" />
              <div className="feature-content">
                <h4>Easy Returns</h4>
                <p>30-day return policy</p>
              </div>
            </div>
            <div className="feature">
              <FaCertificate className="feature-icon" />
              <div className="feature-content">
                <h4>Quality Guarantee</h4>
                <p>100% authentic products</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <div className="related-products">
        <h2 className="related-title">You might also like</h2>
        <div className="related-grid">
          {getRelatedProducts().map((relatedProduct) => (
            <div
              key={relatedProduct.id}
              className="related-item"
              onClick={() => handleProductClick(relatedProduct.id)}
            >
              <img src={relatedProduct.image} alt={relatedProduct.name} />
              <div className="related-info">
                <h3>{relatedProduct.name}</h3>
                <p className="related-price">{formatPrice(relatedProduct.price)}</p>
                {!relatedProduct.inStock && (
                  <span className="out-of-stock">Out of Stock</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;