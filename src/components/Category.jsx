import React from "react";
import "../css/category.css";
import { category } from "../data/slide";

const Category = () => {
  return (
    <div className="category">
      <div className="category-grid">
        {category.map((item, index) => (
          <div
            className="grid-item"
            style={{
              backgroundImage: `url(${item.image})`,
              backgroundSize: "contain", // Hiển thị toàn bộ ảnh
              backgroundPosition: "top center", // Canh phần trên
              backgroundRepeat: "no-repeat", // Không lặp lại ảnh
              backgroundColor: "black", // Thêm nền để cân đối (tùy chọn)
            }}
            key={index}
          >
            <button className="category-btn">{item.category}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
