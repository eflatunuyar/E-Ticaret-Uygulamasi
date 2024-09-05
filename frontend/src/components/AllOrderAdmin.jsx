import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import "../comp_css/AllOrderAdmin.css";
import api from "../Router/api";

const AddOrderAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("ecom/orders/all")
      .then((response) => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h2 style={{textAlign:"center",margin:"10px"}}>Bütün Siparişler</h2>
      <div className="admin-orders">
        {loading ? (
          <p>Loading...</p>
        ) : (
          orders.map((order) => (
            <div className="order-card" key={order.orderId}>
              <div className="orderpart">
                <h3>Sipariş Detayları</h3>
                <p>Sipariş ID: {order.orderId}</p>
                <p>Durum: {order.status}</p>
                <p>Sipariş Tarihi: {order.orderDate}</p>
                <hr />
                {order.orderItem.map((item) => (
                  <div className="order-item" key={item.orderItemId}>
                    <p>Ürün: {item.product.name}</p>
                    <p>Fiyat: {item.product.price}</p>
                    <p>Miktar: {item.quantity}</p>
                  </div>
                ))}
              </div>
              <div className="customerdetails">
                <h3>Kullanıcı Detayları</h3>
                <p>Kullanıcı ID: {order.user.userId}</p>
                <p>
                  Ad: {order.user.firstName} {order.user.lastName}
                </p>
                <p>Telefon Numarası: {order.user.phoneNumber}</p>

                <h3>Ödeme Detayları</h3>
                {order.payment ? (
                  <>
                    <p>Ödeme ID: {order.payment.paymentId}</p>
                    <p>Ödeme Tarihi: {order.payment.paymentDate}</p>
                    <p>Ödeme Tutarı: {order.payment.paymentAmount}</p>
                    <p>Ödeme Metodu: {order.payment.paymentMethod}</p>
                    <p>Ödeme Durumu: {order.payment.paymentStatus}</p>
                  </>
                ) : (
                  <p>Ödeme Bilgisi Yok.</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default AddOrderAdmin;
