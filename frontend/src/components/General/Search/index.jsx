import React from "react";
import { FaSearch } from "react-icons/fa";

const InputSearch = ({ search, setSearch }) => {
  return (
    <div className="flex items-center w-full md:w-[35%] lg:w-[25%] relative text-gray-300">
      <div className="absolute left-2">
        <FaSearch size={16} />
      </div>
      <input
        type="text"
        className="outline-none border border-gray-200 w-full pl-10 py-2 text-sm rounded-md bg-white pr-4 text-black"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default InputSearch;
