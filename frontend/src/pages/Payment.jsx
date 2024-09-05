import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from '../Router/api'
import "../comp_css/Payment.css";
import successtBg from "../picture/successbg.webp";

const bg = {
  backgroundImage: `url(${successtBg})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
};

const Payment = () => {
  const [paymentData, setPaymentData] = useState({});
  const userid = localStorage.getItem("userid");
  const orderid = localStorage.getItem("orderid");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Ecommerse | Payment';
    api
      .post(
        `/ecom/order-payments/makePayment?orderId=${orderid}&userId=${userid}`
      )
      .then((response) => { // Fix the typo here (reponse -> response)
        setPaymentData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data from the API: ", error);
      });
  }, [userid, orderid]);

  setTimeout(() => {
    navigate("/");
  }, 1000);

  return (
    <div className="payment-container" style={bg}>
      <div className="payment-card">
        <div className="user-info">
          <h1 style={{ color: "green" }}>Ödeme Detayı</h1>
          <p>
            Ad: {paymentData.user && paymentData.user.firstName}{" "}
            {paymentData.user && paymentData.user.lastName}
          </p>
          <p>Kullanıcı Adı: {paymentData.user && paymentData.user.email}</p>
          <p>Telefon Numarası: {paymentData.user && paymentData.user.phoneNumber}</p>
        </div>

        <div className="payment-info">
          <p>Ödeme ID: {paymentData.paymentId}</p>
          <p>
            Ödeme Tarihi:{" "}
            {paymentData.paymentDate &&
              new Date(paymentData.paymentDate).toLocaleString()}
          </p>
          <p>Ödeme Tutarı: ${paymentData.paymentAmount}</p>
          <p>Ödeme Metodu: {paymentData.paymentMethod}</p>
          <p>Ödeme Durumu: {paymentData.paymentStatus}</p>
        </div>
        <h2>Siparşiniz İçin Teşekkürler</h2>
      </div>
    </div>
  );
};

export default Payment;
