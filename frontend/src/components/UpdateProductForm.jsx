import React, { useState } from "react";
import "../comp_css/updateform.css"

const UpdateProductForm = ({ product, onUpdate, onClose }) => {
  const [updatedProduct, setUpdatedProduct] = useState({ ...product });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(updatedProduct);
  };

  return (
    <>
      <div className="modal-backdrop">
        <div className="update-product-form">
          <span className="close-button" onClick={onClose}>
            &times;
          </span>
          <h2>Ürün Güncelle</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Ürün Adı:</label>
              <input
                type="text"
                name="name"
                value={updatedProduct.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="imageUrl">Resim URL:</label>
              <input
                type="text"
                name="imageUrl"
                value={updatedProduct.imageUrl}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="description">Ürün Açıklaması:</label>
              <input
                type="text"
                name="description"
                value={updatedProduct.description}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="price">Fiyat:</label>
              <input
                type="number"
                name="price"
                value={updatedProduct.price}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="category">Kategori:</label>
              <input
                type="text"
                name="category"
                value={updatedProduct.category}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Update</button>
            <button onClick={onClose}>Cancel</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProductForm;
