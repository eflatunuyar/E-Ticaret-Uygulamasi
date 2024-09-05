import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useNavigation } from "react-router-dom";
import Profile from "../components/Profile";
import api from "../Router/api";

import "../comp_css/order.css";

const OrderDetails = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userid");
  const [deleted, setDeleted] = useState(false);
  const [allOrder, setAllOrder] = useState([]);

  const handeldemakePayment = (orderid) => {
    localStorage.setItem("orderid", orderid);
    navigate("/user/make-payment");
  };

  const handleProfileSection = (userid) => {
    navigate(`/user/profile/${userid}`);
  };
 
  const handeldeleteOrder = (orderId) => {
    axios
      .delete(`http://127.0.0.1:8080/ecom/orders/users/${userId}/${orderId}`)
      .then((response) => {
        alert(response.data);

        const updatedAllOrder = allOrder.filter(
          (order) => order.orderId !== orderId
        );
        setAllOrder(updatedAllOrder);
        setDeleted(true);
      })
      .catch((error) => {
        console.error("Error fetching data from the API: ", error);
      });
  };

  useEffect(() => {
    document.title = "Ecommerse | Order details";
    api
      .get(`/ecom/orders/orders/${userId}`)
      .then((response) => {
        const sortedOrders = response.data.sort((a, b) => {
          return new Date(b.orderDate) - new Date(a.orderDate);
        });
        setAllOrder(sortedOrders);
        setDeleted(false);
      })
      .catch((error) => {
        console.error("Error fetching data from the API: ", error);
      });
  }, [deleted, userId]);

 
  return (
    <>
      <div className="container">
        <div className="orderContainer">
       { allOrder.length > 0 ? (
              allOrder.map((order, index) => (
                <div key={index} className="order">
                  <div className="odr1">
                    <h3>Sipariş Numarası: {index + 1}</h3>
                    <p>Sipariş ID: {order.orderId}</p>
                    <p>Durum: {order.status}</p>
                    <p>
                      Sipariş Tarihi: {new Date(order.orderDate).toLocaleString()}
                    </p>
                    <h3 style={{ color: "green" }}>
                      Toplam Fiyat: {order.totalAmount}
                    </h3>

                    {order.status === "SHIPPED" ? (
                      <button style={{ backgroundColor: "green" }} disabled>
                        Görüntüle
                      </button>
                    ) : (
                      <button
                        style={{ backgroundColor: "red" }}
                        onClick={() => {
                          handeldeleteOrder(order.orderId);
                        }}
                      >
                        Siparişi İptal Et
                      </button>
                    )}

                    {order.status === "SHIPPED" ? (
                      <button style={{ backgroundColor: "green" }} disabled>
                        Durum
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          handeldemakePayment(order.orderId);
                        }}
                      >
                        Ödeme Yap
                      </button>
                    )}
                  </div>

                  <div className="odr2">
                    <h3>Sipariş Ürünü</h3>
                    {order.orderItem.map((item) => (
                      <li key={item.orderItemId}>
                        {item.product.name} - Miktar: {item.quantity}
                      </li>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  color: "green",
                  fontSize: "20px",
                  border: "2px solid grey",
                  height: "50vh",
                  textAlign: "center",
                }}
              >
                <h1 style={{ marginTop: "50px" }}>Geçmiş siparişiniz yok</h1>
              </div>
            )}
        </div>
        <div className="box">
          <h3>Sipariş Geçmişi</h3>
          <button onClick={() => handleProfileSection(userId)}>
            Profilini Görüntüle
          </button>
          
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
