/* eslint-disable react/prop-types */
const ProductDetail = ({ product }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-4">{product.name}</h2>
      <img src={product.image} alt={product.name} className="w-full h-auto mb-4" />
      <p className="text-gray-600">{product.description}</p>
      <div className="mt-4">
        <p className="text-xl text-red-500 font-semibold">
          Price: ${product.price.toFixed(2)}
        </p>
        {product.discountpercentage > 0 && (
          <p className="text-xl text-green-500 font-semibold">
            Discounted Price: ${(product.price - (product.price * product.discountpercentage) / 100).toFixed(2)}
          </p>
        )}
      </div>
      <p className="mt-4">
        Rating: {product.rating.toFixed(1)} <i className="text-yellow-400 fas fa-star"></i>
      </p>
      <p className="mt-4">
        Stock: {product.stock} {product.stock > 1 ? 'items' : 'item'} available
      </p>
    </div>
  );
};

export default ProductDetail;
