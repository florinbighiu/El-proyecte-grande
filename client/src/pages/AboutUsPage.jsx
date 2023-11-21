/* eslint-disable react/no-unescaped-entities */
const AboutUsPage = () => {
    return (
        <div className="bg-transparent mt-6rem w-full">
            <h1 className="text-7xl uppercase text-center font-bold text-gray-800">Let's get shopping</h1>
            <h2 className="text-center text-3xl mb-6rem">The complete ecommerce platform to create an exceptional experience.</h2>
            <div className="w-full flex flex-col items-center justify-center my-6rem">
                <h2 className="text-2xl font-bold text-center mb-4">Our E-Commerce Success</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 w-2/3">
                    <div className="p-4 rounded-lg bg-blue-500 text-white hover:scale-105  transition-all 300 ease cursor-pointer">
                        <p className="text-3xl font-bold">$10M+</p>
                        <p className="text-sm">Total Sales</p>
                    </div>

                    <div className="p-4 rounded-lg bg-green-500 text-white hover:scale-105  transition-all 300 ease cursor-pointer">
                        <p className="text-3xl font-bold">2K+</p>
                        <p className="text-sm">Product Varieties</p>
                    </div>

                    <div className="p-4 rounded-lg bg-yellow-500 text-white hover:scale-105  transition-all 300 ease cursor-pointer">
                        <p className="text-3xl font-bold">50K+</p>
                        <p className="text-sm">Satisfied Customers</p>
                    </div>

                    <div className="p-4 rounded-lg bg-red-500 text-white hover:scale-105  transition-all 300 ease cursor-pointer">
                        <p className="text-3xl font-bold">98%</p>
                        <p className="text-sm">On-Time Delivery</p>
                    </div>
                </div>
            </div>
            <div className=" flex items-center justify-center">
                <div className="flex flex-col md:flex-row items-center justify-evenly space-y-5 h-screen max-w-3xl mx-auto">
                    <p className="p-5 rounded-lg bg-emerald-500 text-lg text-gray-700 flex-1">
                        Welcome to EcomX, your go-to destination for unique and high-quality
                        products. Our mission is to redefine your online shopping experience
                        with a curated selection of items that cater to your lifestyle.
                    </p>

                    <p className="p-5 rounded-lg bg-fuchsia-500 text-lg text-gray-700 flex-1">
                        Founded in 2023, EcomX is driven by a team of passionate individuals
                        dedicated to delivering excellence. We believe in the fusion of
                        innovation, style, and convenience to create an unparalleled shopping
                        journey for you.
                    </p>

                    <p className="p-5 rounded-lg bg-blue-500 text-lg text-gray-700 flex-1">
                        Explore our collection, carefully sourced from the best manufacturers
                        and artisans. From fashion-forward trends to cutting-edge electronics,
                        EcomX is your one-stop shop for all things extraordinary.
                    </p>

                    <p className="p-5 rounded-lg bg-pink-500 text-lg text-gray-700 flex-1">
                        Thank you for choosing EcomX. Join us in this exciting adventure of
                        discovery and delight as we strive to exceed your expectations with
                        every click.
                    </p>
                </div>
            </div>

        </div>
    );
};

export default AboutUsPage;
