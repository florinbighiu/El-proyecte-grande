/* eslint-disable react/no-unescaped-entities */
import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";
import {toast} from "react-hot-toast";

import Loading from "../layout/Loading.jsx";
import StarRating from "../components/StarRating.jsx";

function Homepage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const token = localStorage.getItem("authToken");
    const quantity = 1;

    const maxDescriptionLines = 3;
    const [showMore, setShowMore] = useState(false);

    const toggleDescription = () => {
        setShowMore(!showMore);
    };

    const truncatedDescription = products.map(prod => prod.description
        .split("\n")
        .slice(0, maxDescriptionLines)
        .join("\n"))

    const fetchProducts = async () => {
        try {
            const response = await axios.get("https://el-proyecte-grande-osxq.onrender.com/products");

            if (response) {
                setProducts(response.data);
                setIsLoading(false);
            } else {
                console.error("Failed to fetch products");
            }
        } catch (error) {
            console.error("Error fetching products", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleAddToCart = async (product, productId, quantity) => {
        try {
            if (product.stock > 0) {
                const response = await axios.post(`https://el-proyecte-grande-osxq.onrender.com/cart/add/${productId}/${quantity}`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    toast.success("Product added to the cart!");
                    setProducts((prevProducts) => prevProducts.map((prevProduct) => prevProduct.id === productId ? {
                        ...prevProduct, stock: prevProduct.stock - quantity
                    } : prevProduct));
                } else {
                    toast.error("Failed to add the product!");
                }
            } else {
                toast.error("Product is out of stock!");
            }
        } catch (error) {
            console.error("Error adding product to the cart", error);
            toast.error("An error occurred while adding the product to the cart");
        }
    };


    const featuredProducts = products.slice(0, 4);

    return (<div>
        <section className="bg-transparent py-16 mt-8 text-center rounded-lg">
            <h1 className="mt-1 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-4xl font-extrabold uppercase tracking-tighter text-transparent sm:text-5xl lg:text-7xl">
                Discover the Best Deals
            </h1>
            <p className="order-first text-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text font-medium tracking-wide text-transparent m-3">
                Explore our wide range of products at amazing prices.
            </p>
            <Link to="/products">
                <button className="bg-indigo-600 text-white py-2 px-6 rounded-full hover:bg-indigo-700">
                    Shop Now
                </button>
            </Link>
        </section>

        <section className="py-12 px-4 mb-24">
            {isLoading ? (<Loading/>) : (<div>
                <h2 className="m-1 px-1 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-3xl w-fit font-extrabold uppercase tracking-tighter text-transparent">
                    Featured Products
                </h2>
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xxl:grid-cols-4 gap-6">
                    {featuredProducts.map((product) => (<div
                        key={product.id}
                        className="relative bg-white border border-gray-300/75 rounded-lg shadow-lg duration-300 w-fit">
                        {product.discountPercentage > 0 && (<div
                            className="absolute top-2 right-2 bg-gradient-to-r from-red-400 to-red-600 text-black p-2 rounded-full">
                            <div className="text-md font-semibold">
                                <span className="text-lg">-</span>
                                {product.discountPercentage.toFixed(2)}%
                            </div>
                        </div>)}
                        <Link to={`/product/${product.id}`}>
                            <img src={product.thumbnail} alt={product.title}
                                 className="w-full h-56 rounded-lg shadow-lg mb-4"/>
                        </Link>

                        <div className="text-black text-center p-2 ">
                            <Link to={`/product/${product.id}`}>
                                <h3 className="font-extrabold text-lg uppercase mb-1">{product.title}</h3>
                                <p
                                    className={`text-black text-lg text-start font-display px-1  ${showMore ? "..." : "overflow-hidden h-14"}`}>
                                    {showMore ? product.description : truncatedDescription}
                                </p>
                            </Link>

                            {product.description.split("\n").length > maxDescriptionLines && (<button
                                onClick={toggleDescription}
                                className="text-blue-400 font-semibold hover:underline mt-2 focus:outline-none">
                                {showMore ? "Show Less" : "Show More"}
                            </button>)}
                            <div className="my-1">
                                <StarRating product={product}/>
                            </div>
                            <p className="text-red-500 text-xl font-semibold mt-2 text-center">

                                $
                                {product.discountPercentage > 0 ? (product.price - (product.price * product.discountPercentage) / 100).toFixed(2) : product.price.toFixed(2)}

                                {product.discountPercentage > 0 && (
                                    <span className="text-sm text-gray-700 line-through ml-2">
                                       ${product.price.toFixed(2)}
                                    </span>)}
                            </p>
                        </div>
                        <div className="p-2 flex flex-col space-y-1 items-center w-full text-gray-100">
                            <button
                                onClick={() => handleAddToCart(product, product.id, quantity)}
                                className={`mb-1 bg-blue-800 hover:bg-blue-900 font-bold p-2 rounded-md w-full focus:outline-none ${product.stock === 0 ? "opacity-50 bg-red-500 hover:bg-red-700" : ""}`}>
                                {product.stock === 0 ? "Out of stock" : `Add to Cart (${product.stock})`}
                            </button>
                        </div>
                    </div>))}
                </div>
            </div>)}
        </section>

        <section className="my-32 bg-transparent text-center flex flex-col space-x-8 space-y-8 xl:flex-row">
            <div className="flex items-baseline justify-center">
                <h2 className="md:p-24 p-5 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-4xl font-extrabold uppercase tracking-tighter text-transparent sm:text-5xl lg:text-7xl">What
                    Our Customers Say</h2>
            </div>
            <div
                className="lg:p-12 p-6 rounded-3xl bg-gradient-to-r shadow-lg from-pink-300 via-purple-300 to-indigo-400 flex flex-col items-start justify-around space-y-8 sm:w-full">
                <p className="py-8 text-4xl w-full text-left font-body font-extralight text-black">
                    "I love shopping at this store! The products are amazing, and the prices are unbeatable."
                </p>
                <div className="w-full flex items-center justify-start">
                    <p className="text-black text-xl font-serif font-bold bg-fuchsia-400 rounded-full p-4 w-fit">John
                        Doe</p>
                </div>
            </div>
            <div
                className="lg:p-12 p-6 rounded-3xl shadow-lg bg-gradient-to-r from-rose-400 to-orange-300 flex flex-col items-start justify-around sm:w-full">
                <p className="py-8 text-4xl w-full text-left font-body font-extralight text-black">
                    "The customer service is top-notch. I received my order quickly and in perfect condition."
                </p>
                <div className="w-full flex items-center justify-start">
                    <p className="text-black text-xl font-serif font-bold bg-red-500 rounded-full p-4 w-fit">Jane
                        Smith</p>
                </div>
            </div>
        </section>


        <section className="my-12 bg-transparent text-center text-white py-16 w-full">
            <h2 className="mt-1 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-7xl font-extrabold uppercase tracking-tighter text-transparent sm:text-5xl lg:text-7xl">
                Ready to Shop?
            </h2>
            <p className="order-first bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text font-medium text-2xl tracking-wide text-transparent m-5">
                Start exploring our products and find your next favorite item.
            </p>
            <Link to="/products">
                <button className="bg-indigo-600 text-white py-2 px-6 rounded-full hover:bg-indigo-500">
                    Get Started
                </button>
            </Link>
        </section>
    </div>);
}

export default Homepage;
