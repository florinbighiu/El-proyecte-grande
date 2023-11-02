/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';

function ProductDetail() {
  const { productId } = useParams();


  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-4">{product.name}</h2>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-4">
          <img
            src={product.thumbnail} // Replace with the actual image URL
            alt={product.title}
            className="w-full h-auto"
          />
        </div>
        <div className="md:w-1/2 text-white p-4">
          <p className="text-lg">Product ID: {product.id}</p>
          <p className="text-lg">Price: ${product.price}</p>
          {/* Add more product details here */}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
