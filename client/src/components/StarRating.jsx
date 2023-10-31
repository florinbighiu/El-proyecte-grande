/* eslint-disable react/prop-types */

const StarRating = ({ product }) => {

  return (
    <div className="flex items-center">
      <div className="flex space-x-1 items-center pt-1">
        {[1, 2, 3, 4, 5].map((index) => (
          <svg
            key={index}
            xmlns="http://www.w3.org/2000/svg"
            className={`text-center w-6 fill-current ${
              index <= product.rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M12 2l1.73 5.18h5.64l-4.54 3.32 1.73 5.18-4.54-3.32-4.54 3.32 1.73-5.18-4.54-3.32h5.64z"
            />
          </svg>
        ))}
      </div>
      <span className="ml-2 text-start text-gray-300">{product.rating.toFixed(1)}</span>
    </div>
  );
};

export default StarRating;
