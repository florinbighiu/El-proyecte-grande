const ContactPage = () => {
  return (
    <div className="container mx-auto p-6 ">
      <h1 className="text-3xl font-semibold mb-4 text-center">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className=" pt-64 pl-44">
          <p className="text-gray-700 mb-6">
            Feel free to reach out to us for any inquiries or feedback.
          </p>
          <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
          <p className="text-gray-700">
            <strong>Email:</strong> contact@example.com
          </p>
          <p className="text-gray-700">
            <strong>Phone:</strong> (123) 456-7890
          </p>
          <p className="text-gray-700">
            <strong>Address:</strong> 123 Main St, City, Country
          </p>
        </div>

        <div className="pr-44 pt-20">
          <h2 className="text-xl font-semibold mb-2">Contact Form</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-medium">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-2 border-black border-1 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="w-full p-2 border rounded-md"
                required></textarea>
            </div>
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full mt-4">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
