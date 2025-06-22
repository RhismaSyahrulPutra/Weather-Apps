const SearchBar = ({ showSuggestions, setShowSuggestions, suggestions }) => (
  <div className="max-w-3xl mx-auto mb-8 relative">
    <input
      type="text"
      placeholder="Cari kota..."
      className="w-full p-3 rounded-xl bg-white/10 placeholder-white text-white focus:outline-none shadow-lg"
      onFocus={() => setShowSuggestions(true)}
      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
    />
    {showSuggestions && (
      <ul className="absolute z-10 w-full bg-white text-black rounded-xl mt-1 shadow-md">
        {suggestions.map((city, index) => (
          <li
            key={index}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          >
            {city}
          </li>
        ))}
      </ul>
    )}
  </div>
);
export default SearchBar;
