import React, { useState } from "react";
import axios from "axios";
import api from "../Router/api";
import "../comp_css/AddProduct.css";
import { Link, useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    imageUrl: "",
    description: "",
    price: 0,
    category: "",
    available: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/ecom/products/add", product);
      console.log("Product added successfully:", response.data);
      setProduct({
        name: "",
        imageUrl: "",
        description: "",
        price: 0,
        category: "",
        available: true,
      });
      alert("Product Added Successfully......");
      // Redirect to the admin page after successful submission
      navigate("/admin");
    } catch (error) {
      alert(error.response.data.message);
      console.error("Error adding product:", error.response.data);
    }
  };

  console.log(product);

  return (
    <div className="adminAddProduct">
      <h2 style={{ textAlign: "center" }}>Ürün Ekle</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Ürün Adı:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Ürün adı"
          />
        </div>
        <div className="input-group">
          <label htmlFor="imageUrl">Resim URL:</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={product.imageUrl}
            onChange={handleChange}
            placeholder="Resim URL"
          />
        </div>
        <div className="input-group">
          <label htmlFor="description">Açıklama:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Açıklama"
          />
        </div>
        <div className="input-group">
          <label htmlFor="price">Fiyat:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Fiyat"
          />
        </div>
        <div className="input-group">
          <label htmlFor="category">Kategori:</label>
          <select
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
          >
            <option value="">Kategori seç</option>
            <option value="electronics">Elektronik</option>
            <option value="araç">Araç</option>
          </select>
        </div>

        <button type="submit">Ekle</button>
      </form>
    </div>
  );
}

export default AddProduct;
