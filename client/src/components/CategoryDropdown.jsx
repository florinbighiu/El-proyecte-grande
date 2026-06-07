/* eslint-disable react/prop-types */
import { FiSearch, FiFilter, FiChevronDown } from "react-icons/fi";

const CategoryDropdown = ({ categories, selectedCategory, onSelectCategory, searchQuery, setSearchQuery }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative w-full sm:w-52">
        <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={15} />
        <input
          className="w-full bg-white border border-gray-200 rounded-full pl-10 pr-4 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition shadow-sm"
          type="text"
          placeholder="Search products..."
          aria-label="Search products"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="relative w-full sm:w-40">
        <FiFilter className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={13} />
        <select
          value={selectedCategory}
          onChange={(e) => onSelectCategory(e.target.value)}
          aria-label="Filter by category"
          className="w-full appearance-none bg-white border border-gray-200 rounded-full pl-9 pr-8 py-2 text-sm text-slate-700 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition shadow-sm capitalize"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category} className="capitalize">
              {category}
            </option>
          ))}
        </select>
        <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={13} />
      </div>
    </div>
  );
};

export default CategoryDropdown;
