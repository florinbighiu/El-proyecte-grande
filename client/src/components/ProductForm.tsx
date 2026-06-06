import { FC } from "react";
import { FiX, FiImage } from "react-icons/fi";

interface ProductFormProps {
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
  errors: Record<string, string>;
  onClose: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSaveProduct: () => void;
}

interface FieldProps {
  label: string;
  name: string;
  value: string | number;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  step?: string;
  min?: string;
}

const Field: FC<FieldProps> = ({ label, name, value, error, onChange, type = "text", placeholder, step, min }) => (
  <div>
    <label className="block text-xs font-semibold text-slate-600 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      step={step}
      min={min}
      className={`w-full px-3 py-2 text-sm border rounded-lg bg-white text-slate-800 focus:outline-none focus:ring-2 transition ${
        error
          ? "border-red-400 bg-red-50 focus:ring-red-300"
          : "border-gray-200 focus:ring-indigo-400"
      }`}
    />
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);

const ProductForm: FC<ProductFormProps> = ({
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
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-slate-800">
            {isAddOrEditProduct ? "Add New Product" : "Edit Product"}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition p-1 rounded-lg hover:bg-slate-100">
            <FiX size={20} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-6 py-4">
          {thumbnail && (
            <div className="mb-4 rounded-xl overflow-hidden border border-gray-100 bg-slate-50 h-36 flex items-center justify-center">
              <img
                src={thumbnail}
                alt="Product preview"
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          )}
          {!thumbnail && (
            <div className="mb-4 rounded-xl border border-dashed border-gray-200 bg-slate-50 h-24 flex flex-col items-center justify-center text-slate-400 gap-1">
              <FiImage size={24} />
              <span className="text-xs">Image preview will appear here</span>
            </div>
          )}

          <div className="space-y-4">
            <Field
              label="Product Name"
              name="title"
              value={title}
              error={errors.title}
              onChange={handleInputChange as (e: React.ChangeEvent<HTMLInputElement>) => void}
              placeholder="e.g. Wireless Headphones"
            />

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Description</label>
              <textarea
                name="description"
                value={description}
                onChange={handleInputChange}
                rows={3}
                placeholder="Brief product description..."
                className={`w-full px-3 py-2 text-sm border rounded-lg bg-white text-slate-800 focus:outline-none focus:ring-2 transition resize-none ${
                  errors.description
                    ? "border-red-400 bg-red-50 focus:ring-red-300"
                    : "border-gray-200 focus:ring-indigo-400"
                }`}
              />
              {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field
                label="Price ($)"
                name="price"
                value={price}
                error={errors.price}
                onChange={handleInputChange as (e: React.ChangeEvent<HTMLInputElement>) => void}
                type="number"
                placeholder="0.00"
                step="0.01"
                min="0"
              />
              <Field
                label="Stock"
                name="stock"
                value={stock}
                error={errors.stock}
                onChange={handleInputChange as (e: React.ChangeEvent<HTMLInputElement>) => void}
                type="number"
                placeholder="0"
                min="0"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field
                label="Discount (%)"
                name="discountPercentage"
                value={discountPercentage}
                error={errors.discountPercentage}
                onChange={handleInputChange as (e: React.ChangeEvent<HTMLInputElement>) => void}
                type="number"
                placeholder="0"
                min="0"
                step="0.1"
              />
              <Field
                label="Rating (0–5)"
                name="rating"
                value={rating}
                error={errors.rating}
                onChange={handleInputChange as (e: React.ChangeEvent<HTMLInputElement>) => void}
                type="number"
                placeholder="0"
                min="0"
                step="0.1"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field
                label="Brand"
                name="brand"
                value={brand}
                error={errors.brand}
                onChange={handleInputChange as (e: React.ChangeEvent<HTMLInputElement>) => void}
                placeholder="e.g. Sony"
              />
              <Field
                label="Category"
                name="category"
                value={category}
                error={errors.category}
                onChange={handleInputChange as (e: React.ChangeEvent<HTMLInputElement>) => void}
                placeholder="e.g. Electronics"
              />
            </div>

            <Field
              label="Image URL"
              name="thumbnail"
              value={thumbnail}
              error={errors.thumbnail}
              onChange={handleInputChange as (e: React.ChangeEvent<HTMLInputElement>) => void}
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
          <button
            type="button"
            onClick={onSaveProduct}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-full transition text-sm">
            {isAddOrEditProduct ? "Add Product" : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-full transition text-sm">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;