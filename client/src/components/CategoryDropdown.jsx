/* eslint-disable react/prop-types */
const CategoryDropdown = ({ categories, selectedCategory, onSelectCategory, searchQuery, setSearchQuery }) => {

    return (
        <div className="my-5 w-full flex flex-row border border-white/75 rounded-full">
            <input
                className="w-full bg-white bg-opacity-50 rounded-l-full px-3 focus:outline-none"
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="flex flex-row items-center justify-center text-black">
                <div className="p-1 pr-3 rounded-full">
                    <select
                        value={selectedCategory}
                        onChange={(e) => onSelectCategory(e.target.value)}
                        className="block text-black bg-transparent hover:cursor-pointer rounded-full py-2 px-3 focus:outline-none sm:text-sm"
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
        </div>
    );
}

export default CategoryDropdown;
