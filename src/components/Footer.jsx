import React from 'react'
import '../css/footer.css'
import { FaFacebook ,FaTwitter,FaInstagram , FaGoogle } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='footer'>
       <ul className="footer-links">
          <li>Blog</li>
          <li>FAQs</li>
          <li>Contact</li>
       </ul>

       <ul className="social-icons">
        <li className="icon"><FaFacebook /></li>
        <li className="icon"><FaTwitter /></li>
        <li className="icon"><FaInstagram /></li>
        <li className="icon"><FaGoogle /></li>
       </ul>
       
       <h2 className='copyright'>
         2018 All Right Reserved. This template is made with by <span>Quintus Labs</span>
       </h2>
    </div>
  )
}

export default Footer
