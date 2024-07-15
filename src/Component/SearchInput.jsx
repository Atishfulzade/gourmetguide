import React from "react";
import { GoSearch } from "react-icons/go";

const SearchInput = ({ input, setInput, onSearch }) => {
  return (
    <div className="md:h-10 lg:w-[20%] md:w-[500px] w-48 h-7 border rounded relative">
      <form className="h-full" onSubmit={onSearch}>
        <input
          type="text"
          placeholder="Search recipes..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="h-full w-full focus:outline-gray-400 bg-transparent px-3 font-poppin text-sm text-slate-700"
        />
        <button type="submit" className="absolute md:top-2 top-1 right-3">
          <GoSearch className="text-slate-600 md:text-xl cursor-pointer" />
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
