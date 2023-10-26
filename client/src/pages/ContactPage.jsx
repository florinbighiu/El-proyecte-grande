import LogoImage from "../assets/ecommerce.png";

const ContactPage = () => {
  return (
    <div className="ml-5 p-6 text-white">
      <h1 className="text-3xl font-semibold mb-10 text-center">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col justify-center items-center text-center md:text-left">
          <img src={LogoImage} alt="Logo" className="h-32 mb-8" />
          <p className="text-gray-100 mb-6">
            Feel free to reach out to us for any inquiries or feedback.
          </p>
          <h2 className="text-xl text-white font-semibold mb-2">Contact Information</h2>
          <p className="text-gray-100">
            <strong>Email:</strong> contact@example.com
          </p>
          <p className="text-gray-100">
            <strong>Phone:</strong> (123) 456-7890
          </p>
          <p className="text-gray-100">
            <strong>Address:</strong> 123 Main St, City, Country
          </p>
        </div>

        <div className="flex flex-col justify-end md:w-1/2 ml-8">
          <h2 className="text-xl font-semibold mb-2">Contact Form</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-200 font-medium">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 bg-slate-700 text-white font-serif rounded-md focus:outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-200 font-medium">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 bg-slate-700 text-white font-serif rounded-md focus:outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-200 font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="w-full px-4 py-2 bg-slate-700 text-white font-serif rounded-md focus:outline-none"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full mt-4 w-full">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
