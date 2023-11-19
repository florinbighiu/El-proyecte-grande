/* eslint-disable react/prop-types */
function CategoryDropdown({ categories, selectedCategory, onSelectCategory, searchQuery, setSearchQuery }) {
    
    return (
        <div className="my-5 flex flex-row border border-white/50 shadow-md rounded-lg">
            <input
                className="w-full bg-white bg-opacity-25 rounded-l-lg px-3 focus:outline-none"
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
              <select
                value={selectedCategory}
                onChange={(e) => onSelectCategory(e.target.value)}
                className="block text-black bg-white bg-opacity-25 border border-gray-50/50 hover:cursor-pointer rounded-r-lg shadow-md py-2 px-3 focus:outline-none sm:text-sm"
            >
                <option value="">All Categories</option>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default CategoryDropdown;
