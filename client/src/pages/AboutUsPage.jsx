

const AboutUsPage = () => {
    return (
        <div className="bg-transparent mt-8 w-full">
            <h1 className="text-4xl text-center font-bold text-gray-800 mb-6">About Us</h1>
            <div className="w-full">
                <div className="mx-5 bg-white bg-opacity-50 p-8 rounded-lg shadow-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="relative overflow-hidden rounded-lg">
                            <img
                                src="https://placekitten.com/800/600"
                                alt="About Us"
                                className="object-cover object-center w-full h-full rounded-lg"
                            />
                        </div>

                        <div className="flex items-center justify-evenly space-x-2">
                            <p className="p-3 h-full rounded-lg bg-emerald-700 bg-opacity-50 text-lg text-gray-700 mb-4 ">
                                Welcome to EcomX, your go-to destination for unique and high-quality
                                products. Our mission is to redefine your online shopping experience
                                with a curated selection of items that cater to your lifestyle.
                            </p>

                            <p className="p-3 h-full mt-5 rounded-lg bg-fuchsia-700 bg-opacity-50 text-lg text-gray-700 mb-4">
                                Founded in 2020, EcomX is driven by a team of passionate individuals
                                dedicated to delivering excellence. We believe in the fusion of
                                innovation, style, and convenience to create an unparalleled shopping
                                journey for you.
                            </p>

                            <p className="p-3 h-full rounded-lg bg-blue-700 bg-opacity-50 text-lg text-gray-700 mb-4">
                                Explore our collection, carefully sourced from the best manufacturers
                                and artisans. From fashion-forward trends to cutting-edge electronics,
                                EcomX is your one-stop shop for all things extraordinary.
                            </p>

                            <p className="p-3 h-full rounded-lg bg-pink-700 bg-opacity-50 text-lg text-gray-700">
                                Thank you for choosing EcomX. Join us in this exciting adventure of
                                discovery and delight as we strive to exceed your expectations with
                                every click.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUsPage;
