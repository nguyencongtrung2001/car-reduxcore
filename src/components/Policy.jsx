import React from 'react';
import { FaTruck, FaMoneyBill, FaClock } from "react-icons/fa";
import { TfiBackLeft } from "react-icons/tfi";
import '../css/policy.css';

const Policy = () => {
  return (
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
          <h5>CASH ON DELIVERY</h5>
          <p>The Internet Tend To Repeat</p>
        </div>
      </div>
      <div className="box-discount">
        <TfiBackLeft className="icon"/>
        <div className="box-content">
          <h5>45 DAYS RETURN</h5>
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
  );
};

export default Policy;