import { ShoppingCartIcon } from "@heroicons/react/solid";

const products = [
  {
    id: 1,
    name: "Product 1",
    price: 19.99,
    imageUrl: "/product1.jpg",
  },
  {
    id: 2,
    name: "Product 2",
    price: 29.99,
    imageUrl: "/product2.jpg",
  },
  {
    id: 3,
    name: "Product 3",
    price: 24.99,
    imageUrl: "/product3.jpg",
  },
  {
    id: 3,
    name: "Product 3",
    price: 24.99,
    imageUrl: "/product3.jpg",
  },
  {
    id: 3,
    name: "Product 3",
    price: 24.99,
    imageUrl: "/product3.jpg",
  },
  {
    id: 3,
    name: "Product 3",
    price: 24.99,
    imageUrl: "/product3.jpg",
  },
  {
    id: 3,
    name: "Product 3",
    price: 24.99,
    imageUrl: "/product3.jpg",
  },
  {
    id: 3,
    name: "Product 3",
    price: 24.99,
    imageUrl: "/product3.jpg",
  },
  {
    id: 3,
    name: "Product 3",
    price: 24.99,
    imageUrl: "/product3.jpg",
  },
  {
    id: 3,
    name: "Product 3",
    price: 24.99,
    imageUrl: "/product3.jpg",
  },
  {
    id: 3,
    name: "Product 3",
    price: 24.99,
    imageUrl: "/product3.jpg",
  },
  {
    id: 3,
    name: "Product 3",
    price: 24.99,
    imageUrl: "/product3.jpg",
  },
  {
    id: 3,
    name: "Product 3",
    price: 24.99,
    imageUrl: "/product3.jpg",
  },

];


function ProductList() {
  return (
    <div className="container m-0.5 p-4  text-slate-500 dark:text-slate-400 bg-slate-300 rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="group bg-slate-500 p-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out backdrop-blur-md hover:cursor-pointer">
            <img src={product.imageUrl} alt={product.name} className="w-full h-32 object-cover " />
            <h3 className="text-lg text-slate-800 font-semibold mt-2">{product.name}</h3>
            <p className="text-slate-950">${product.price.toFixed(2)}</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full absolute bottom-4 right-4">
              <span>
                <ShoppingCartIcon className="h-5 w-5" />
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
