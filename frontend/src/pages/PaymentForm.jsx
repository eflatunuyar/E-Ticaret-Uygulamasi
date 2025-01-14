import React, { useState } from "react";
import "../comp_css/paymentForm.css";
import { useNavigate } from "react-router-dom";
import paymentBg from "../picture/paymentbg.webp";

const PaymentForm = () => {

  const navigate=useNavigate();
  const bg = {
    backgroundImage: `url(${paymentBg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
  };
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardHolder: "",
    expirationDate: "",
    cvv: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(paymentData)
    navigate("/user/payment-success")
    
  };

  return (
    <div className="payment-form-container" style={bg}>
      <form className="payment-form" onSubmit={handleSubmit}>
        <h2>Ödeme Bilgileri</h2>
        <div className="form-group">
          <label htmlFor="cardNumber">Kart Numarası</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={paymentData.cardNumber}
            onChange={handleInputChange}
            placeholder="kart numarasını giriniz"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cardHolder">Kart Sahibi</label>
          <input
            type="text"
            id="cardHolder"
            name="cardHolder"
            value={paymentData.cardHolder}
            onChange={handleInputChange}
            placeholder="kart sahibi adını giriniz"
            required
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="expirationDate">Kart Tarihini Giriniz</label>
            <input
              type="text"
              id="expirationDate"
              name="expirationDate"
              value={paymentData.expirationDate}
              onChange={handleInputChange}
              placeholder="MM/YY"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={paymentData.cvv}
              onChange={handleInputChange}
              placeholder="CVV"
              required
            />
          </div>
        </div>
        <button type="submit">Ödeme Yap</button>
      </form>
    </div>
  );
};

export default PaymentForm;
