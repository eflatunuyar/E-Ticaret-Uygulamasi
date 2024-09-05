import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from '../Router/api'
import "../comp_css/SingleProduct.css";
import axios from "axios";

const SingleProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const userid = localStorage.getItem("userid");

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8080/ecom/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data from the API: ", error);
      });
  }, [productId]);

  const addProductToCart = (productid) => {
    api
      .post(
        `/ecom/cart/add-product?userId=${userid}&productId=${productid}`
      )
      .then((response) => {
        localStorage.setItem("cartid", response.data.cartId);
        alert("Product added to Cart.....");
      })
      .catch((error) => {
        alert("Product Alredy in cart......");
      });
  };
  return (
    <>
    <h1 style={{color:"green",textAlign:"center",margin:"20px"}}>Ürün</h1>
    <div className="product-container">
     
      <div className="product-details">
        <div className="product_image">
          <img src={product.imageUrl} alt={product.name} />
        </div>

        <div className="product_details">
          <h2>{product.name}</h2>
          <p>Ürün Açıklaması: {product.description}</p>
          <p>Fiyat: {product.price}</p>

          <div>
            <button
              onClick={() => {
                addProductToCart(product.productId);
              }}
            >
              Sepete Ekle
            </button>
          </div>
        </div>
      </div>

      <div className="counter-box">
        <div>
          <button
            onClick={() => {
              navigate("/user/cart");
            }}
          >
            Sepete Git
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default SingleProduct;
