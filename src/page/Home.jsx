import React from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Category from "../components/Category";
import Product from "../components/Product";
import Footer from "../components/Footer";
import Deal from "../components/Deal";
import Policy from "../components/Policy";
import "../css/home.css";

const Home = () => {
  return (
    <div className="home-container">
      <Header />
      <Banner />
      <Category />
      <Product />
      <Policy />
      <Deal />
      <Footer />
    </div>
  );
};

export default Home;
