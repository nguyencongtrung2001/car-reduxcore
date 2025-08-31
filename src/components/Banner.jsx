import React, { useEffect, useState } from "react";
import "../css/banner.css";
import { slide } from "../data/slide";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slide.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const divStyle = {
    backgroundImage: `url(${slide[currentSlide]})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    transition: "background-image 1s ease-in-out", // hiệu ứng mượt khi đổi slide
  };

  return (
    <div className="banner" style={divStyle}>
      <div className="banner-overlay"></div> {/* Lớp phủ màu đen mờ */}
      <div className="banner-section">
        <h2>SPRING / SUMMER COLLECTION 2025</h2>
        <h1>Get up to 30% Off New Arrivals</h1>
        <button className="btn-shopnow">SHOP NOW</button>
      </div>
    </div>
  );
};

export default Banner;
