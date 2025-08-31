import React, { useState } from "react";
import { clothemen, clothewomen } from "../data/clothes";
import { Link } from "react-router-dom";
import "../css/product.css";

const Product = () => {
  const [select, setSelect] = useState("All");

  const handleSelectAll = () => setSelect("All");
  const handleSelectWomen = () => setSelect("clothewomen");
  const handleSelectMen = () => setSelect("clothemen");

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
          <button className="btn btn-all" onClick={handleSelectAll}>
            All
          </button>
          <button className="btn btn-women" onClick={handleSelectWomen}>
            WOMEN'S
          </button>
          <button className="btn btn-men" onClick={handleSelectMen}>
            MEN'S
          </button>
        </div>

        {/* grid hiển thị 8 sản phẩm */}
        <div className="product-grid">
          {getProducts().map((item) => (
            <div className="product-card" key={item.id}>
              <img className="product-image" 
                  src={item.image} 
                  alt={item.name} />
              {/* ✅ Sửa lỗi template literal */}
              <h2 className="product-name">
                <Link to={`/product/${item.id}`}> {item.name} </Link>
              </h2>
              <div className="product-prices">
                <h2 className="product-price">{item.price} VND</h2>
                {!item.inStock && (
                  <h3 className="product-price-discount">Out of Stock</h3>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
