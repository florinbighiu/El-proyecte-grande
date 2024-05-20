/* eslint-disable react/prop-types */
import { Toaster } from "sonner";
import { FC } from "react";

interface AddFormProps {
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  isAddOrEditProduct: boolean;
  errors: {
    title: string;
    description: string;
    price: string;
    discountPercentage: string;
    rating: string;
    stock: string;
    brand: string;
    category: string;
    thumbnail: string;
  };
  onClose: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSaveProduct: () => void;
}

const AddForm: FC<AddFormProps> = ({
  title,
  description,
  price,
  discountPercentage,
  rating,
  stock,
  brand,
  category,
  thumbnail,
  isAddOrEditProduct,
  onClose,
  handleInputChange,
  onSaveProduct,
  errors,
}) => {
  const style = {
    backgroundColor: "#faaca8",
    backgroundImage: "linear-gradient(19deg, #faaca8 0%, #ddd6f3 100%)",
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
      <div
        style={style}
        className="border border-gray-200/70 p-4 rounded-lg shadow-lg text-black w-3/4 sm:w-2/4 md:w-1/4">
        <h2 className="text-xl font-semibold mb-2">
          {isAddOrEditProduct ? "Add new product" : "Edit product"}
        </h2>
        <form>
          <div className="mb-4 flex text-black flex-col max-h-96 overflow-y-auto px-2">
            <label htmlFor="name" className="text-black mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleInputChange}
              placeholder="Product Name"
              className="mb-2 p-2 bg-gray-100 border border-white/75 focus:outline-none rounded"
            />
            {errors.title && <p className="text-red-500 text-xs mb-2">{errors.title}</p>}
            <label htmlFor="description" className="text-black mb-1">
              Description
            </label>
            <input
              name="description"
              value={description}
              onChange={handleInputChange}
              placeholder="Description"
              className="mb-2 p-2 bg-gray-100 border border-white/75 text-black focus:outline-none rounded"
            />
            {errors.description && (
              <p className="text-red-500 text-xs mb-2">{errors.description}</p>
            )}
            <label htmlFor="price" className="text-black mb-1">
              Price
            </label>
            <input
              type="text"
              name="price"
              value={price}
              onChange={handleInputChange}
              placeholder="Price"
              className="mb-2 p-2 bg-gray-100 border border-white/75 text-black focus:outline-none rounded"
            />
            {errors.price && <p className="text-red-500 text-xs mb-2">Field is required.</p>}
            <label htmlFor="discountpercentage" className="text-black mb-1">
              Discount Percentage
            </label>
            <input
              type="text"
              name="discountPercentage"
              value={discountPercentage}
              onChange={handleInputChange}
              placeholder="Discount Percentage"
              className="mb-2 p-2 bg-gray-100 border border-white/75 text-black focus:outline-none rounded"
            />
            {errors.discountPercentage && (
              <p className="text-red-500 text-xs mb-2">Field is required.</p>
            )}
            <label htmlFor="rating" className="text-black mb-1">
              Rating
            </label>
            <input
              type="text"
              name="rating"
              value={rating}
              onChange={handleInputChange}
              placeholder="Rating"
              className="mb-2 p-2 bg-gray-100 border border-white/75 text-black focus:outline-none rounded"
            />
            {errors.rating && <p className="text-red-500 text-xs mb-2">Field is required.</p>}{" "}
            <label htmlFor="stock" className="text-black mb-1">
              Stock
            </label>
            <input
              type="text"
              name="stock"
              value={stock}
              onChange={handleInputChange}
              placeholder="Stock"
              className="mb-2 p-2 bg-gray-100 border border-white/75 text-black focus:outline-none rounded"
            />
            {errors.stock && <p className="text-red-500 text-xs mb-2">Field is required.</p>}
            <label htmlFor="brand" className="text-black mb-1">
              Brand
            </label>
            <input
              type="text"
              name="brand"
              value={brand}
              onChange={handleInputChange}
              placeholder="Brand"
              className="mb-2 p-2 bg-gray-100 border border-white/75 text-black focus:outline-none rounded"
            />
            {errors.brand && <p className="text-red-500 text-xs mb-2">Field is required.</p>}{" "}
            <label htmlFor="category" className="text-black mb-1">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={category}
              onChange={handleInputChange}
              placeholder="Category"
              className="mb-2 p-2 bg-gray-100 border border-white/75 text-black focus:outline-none rounded"
            />
            {errors.category && <p className="text-red-500 text-xs mb-2">Field is required.</p>}{" "}
            <label htmlFor="image" className="text-black mb-1">
              Image URL
            </label>
            <input
              type="text"
              name="thumbnail"
              value={thumbnail}
              onChange={handleInputChange}
              placeholder="Image URL"
              className="mb-2 p-2 bg-gray-100 border border-white/75 text-black focus:outline-none rounded"
            />
            {errors.thumbnail && <p className="text-red-500 text-xs mb-2">{errors.thumbnail}</p>}{" "}
          </div>
          <div className="flex flex-col justify-center">
            <Toaster />
            <button
              type="button"
              onClick={onSaveProduct}
              className="bg-indigo-600 text-white hover:bg-indigo-700 font-bold py-2 px-4 rounded-full">
              Add Product
            </button>
            <button
              onClick={onClose}
              className="mt-4 w-full py-2 text-center text-sm text-indigo-600 hover:text-indigo-800">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddForm;
