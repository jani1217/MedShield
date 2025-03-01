import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductQRCode from "../components/ProductQRCode";

const ManageProductionPage = () => {
  const [productsroutes, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/productsroutes");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Manage Production</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Manufacturer</th>
            <th>Quantity</th>
            <th>QR Code</th>
          </tr>
        </thead>
        <tbody>
          {productsroutes.map((product) => (
            <tr key={product.productId}>
              <td>{product.prod_name}</td>
              <td>{product.producer_name}</td>
              <td>{product.qty}</td>
              <td>
                <ProductQRCode productId={product.productId} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProductionPage;
