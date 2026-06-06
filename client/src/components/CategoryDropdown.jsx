/* eslint-disable react/prop-types */
import { FiSearch } from "react-icons/fi";

const CategoryDropdown = ({ categories, selectedCategory, onSelectCategory, searchQuery, setSearchQuery }) => {
  return (
    <div className="my-5 w-full flex flex-row bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div className="flex items-center pl-4 text-slate-400">
        <FiSearch size={16} />
      </div>
      <input
        className="flex-1 bg-transparent px-3 py-2.5 focus:outline-none text-sm text-slate-700 placeholder:text-slate-400"
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="border-l border-gray-200 flex items-center">
        <select
          value={selectedCategory}
          onChange={(e) => onSelectCategory(e.target.value)}
          className="bg-transparent text-sm text-slate-700 hover:cursor-pointer py-2.5 px-3 focus:outline-none pr-8"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CategoryDropdown;