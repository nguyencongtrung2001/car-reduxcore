import React from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Category from "../components/Category";
import Product from "../components/Product";
import Footer from "../components/Footer";
import Deal from "../components/Deal";
import "../css/policy.css";
import { FaTruck, FaMoneyBill, FaClock } from "react-icons/fa";
import { TfiBackLeft } from "react-icons/tfi";
import ProductDetail from "./ProductDetail";

const Home = () => {
  return (
    <div className="home-container">
      <Header />
      <Banner />
      <Category />
      <Product />
      <div className="policy-discount">
        <div className="box-discount">
          <FaTruck className="icon"/>
          <div className="box-content">
            <h5>FREE SHIPPING</h5>
            <p>Suffered Alteration in Some Form</p>
          </div>
        </div>
        <div className="box-discount">
          <FaMoneyBill className="icon"/>
          <div className="box-content">
            <h5>CACH ON DELIVERY</h5>
            <p>The Internet Tend To Repeat</p>
          </div>
        </div>
        <div className="box-discount">
          <TfiBackLeft className="icon"/>
          <div className="box-content">
            <h5>45 DAYS RETURN </h5>
            <p>Making it look Like Readable</p>
          </div>
        </div>
        <div className="box-discount">
          <FaClock className="icon"/>
          <div className="box-content">
            <h5>OPENING ALL WEEK</h5>
            <p>8AM-09PM</p>
          </div>
        </div>
      </div>
      <Deal />
      <Footer />
    </div>
  );
};

export default Home;
