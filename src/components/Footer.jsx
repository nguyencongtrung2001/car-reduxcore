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
          <li>About Us</li>
          <li>Privacy Policy</li>
       </ul>

       <ul className="social-icons">
        <li className="icon"><FaFacebook /></li>
        <li className="icon"><FaTwitter /></li>
        <li className="icon"><FaInstagram /></li>
        <li className="icon"><FaGoogle /></li>
       </ul>
       
       <div className='copyright'>
         <p>© 2025 Fashion Cube. All Rights Reserved.</p>
         <p>This template is made with ❤️ by <span>Quintus Labs</span></p>
       </div>
    </div>
  )
}

export default Footer
