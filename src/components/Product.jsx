import React, { useState } from "react";
import { clothemen, clothewomen } from "../data/clothes";
import { Link } from "react-router-dom";
import "../css/product.css";

const Product = () => {
  const [select, setSelect] = useState("All");

  const handleSelectAll = () => setSelect("All");
  const handleSelectWomen = () => setSelect("clothewomen");
  const handleSelectMen = () => setSelect("clothemen");

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // lấy dữ liệu theo lựa chọn
  const getProducts = () => {
    if (select === "clothewomen") return clothewomen.slice(0, 8);
    if (select === "clothemen") return clothemen.slice(0, 8);
    return [...clothewomen.slice(0, 8), ...clothemen.slice(0, 8)];
  };

  return (
    <div className="product">
      <div className="product-arrivals">
        <h1 className="product-title">New Arrivals</h1>

        <div className="product-button">
          <button 
            className={`btn ${select === "All" ? "active" : ""}`} 
            onClick={handleSelectAll}
          >
            All
          </button>
          <button 
            className={`btn ${select === "clothewomen" ? "active" : ""}`} 
            onClick={handleSelectWomen}
          >
            WOMEN'S
          </button>
          <button 
            className={`btn ${select === "clothemen" ? "active" : ""}`} 
            onClick={handleSelectMen}
          >
            MEN'S
          </button>
        </div>

        {/* grid hiển thị sản phẩm */}
        <div className="product-grid">
          {getProducts().map((item) => (
            <div className="product-card" key={item.id}>
              <Link to={`/product/${item.id}`}>
                <img className="product-image" 
                    src={item.image} 
                    alt={item.name} />
              </Link>
              <div className="product-info">
                <h2 className="product-name">
                  <Link to={`/product/${item.id}`}>{item.name}</Link>
                </h2>
                <div className="product-prices">
                  <span className="product-price">{formatPrice(item.price)}</span>
                  <span className={`stock-status ${item.inStock ? 'in-stock' : 'out-of-stock'}`}>
                    {item.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
