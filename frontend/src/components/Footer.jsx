import React from "react";
import { Link } from "react-router-dom";
import "../comp_css/Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-grid">
        <div className="footer-section">
          <h4>BİLGİLER</h4>
          <ul>
            <li>FAQ</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>ŞİRKET</h4>
          <ul>
            <li>eflatunerdemuyar@gmail.com</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>E TİCARET</h4>
          <ul>
            <li>Uygulama</li>
            <li>Website</li>
            <li>Medyalar</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>POPÜLER LİNKLER</h4>
          <ul>
            <li>Tüm ürünler</li>
            <li>Elektronik</li>
            <li>Araç</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Abone ol</h4>
          <div className="subscribe-box">
            <input type="text" placeholder="E maıl" />
            <button>Abone ol</button>
          </div>
          <p className="admin-link" >
            <Link to="/admin-Login"  style={{color:"white"}}>Admin Girişi</Link>
          </p>
        </div>
      </div>
      <div className="footer-images">
        {/* <div>
          <img src={footer1} alt="Footer 1" />
        </div>
        <div>
          <img src={footer2} alt="Footer 2" />
        </div> */}
      </div>
    </div>
  );
};

export default Footer;
