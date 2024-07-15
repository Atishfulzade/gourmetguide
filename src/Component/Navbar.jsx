import React, { useCallback, useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import { socialIcon } from "../constant";
import { Link, useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const Navbar = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [filter, setFilter] = useState({ category: "", area: "" });
  const navigate = useNavigate();
  useGSAP(() => {
    gsap.from("#nav", {
      y: -70,
    });
  }, []);

  const fetchData = useCallback(async () => {
    if (!input) return;
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`
      );
      const data = await response.json();
      setResults(data.meals || []);
    } catch (e) {
      console.log(e);
    }
  }, [input]);

  useEffect(() => {
    fetchData();
  }, [input, fetchData]);

  const handleSearch = (event) => {
    event.preventDefault();
    fetchData();
  };

  const filterData = results.filter((meal) => {
    return (
      (filter.category ? meal.strCategory === filter.category : true) &&
      (filter.area ? meal.strArea === filter.area : true)
    );
  });

  return (
    <>
      <div
        className="w-full md:h-20 h-16 flex justify-between px-6 items-center relative"
        id="nav"
      >
        <h1
          className="logo text-red-600 cursive md:text-3xl text-[18px] select-none"
          id="logo"
        >
          Gourmet<span className="text-black cursive">Guide</span>
        </h1>
        <SearchInput
          input={input}
          setInput={setInput}
          onSearch={handleSearch}
        />
        <div className="hidden md:flex md:gap-3" id="social-List">
          <Link to="/" className="mr-10 text-red-500">
            Home
          </Link>
          <p className="hidden md:block">Follow</p>
          {socialIcon.map((val) => (
            <Link
              key={val.title}
              to={val.link}
              className="text-gray-900 md:text-xl hover:text-red-600 transition-all"
              id="social"
            >
              {val.icon}
            </Link>
          ))}
        </div>
      </div>
      {input && (
        <div className="absolute bg-white w-full h-screen overflow-x-hidden flex-col transition-all  z-20 border">
          <div className="flex gap-2 my-5 items-center pl-2">
            <p>Filter by : </p>
            <select
              name="filter"
              id="categoryFilter"
              className="p-2 border m-2"
              value={filter.category}
              onChange={(e) =>
                setFilter({ ...filter, category: e.target.value })
              }
            >
              <option value="">All Category</option>
              <option value="Seafood">Seafood</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Dessert">Dessert</option>
              <option value="Beef">Beef</option>
              <option value="Chicken">Chicken</option>
              <option value="Lamb">Lamb</option>
              <option value="Miscellaneous">Miscellaneous</option>
              <option value="Pasta">Pasta</option>
              <option value="Pork">Pork</option>
              <option value="Side">Side</option>
              <option value="Starter">Starter</option>
              <option value="Vegan">Vegan</option>
              <option value="Side">Side</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Goat">Goat</option>
            </select>
            <select
              name="filter"
              id="areaFilter"
              className="p-2 border m-2"
              value={filter.area}
              onChange={(e) => {
                setFilter({ ...filter, area: e.target.value });
              }}
            >
              <option value="">All areas</option>
              <option value="American">American</option>
              <option value="British">British</option>
              <option value="Canadian">Canadian</option>
              <option value="Chinese">Chinese</option>
              <option value="Croatian">Croatian</option>
              <option value="Dutch">Dutch</option>
              <option value="Egyptian">Egyptian</option>
              <option value="Filipino">Filipino</option>
              <option value="French">French</option>
              <option value="Greek">Greek</option>
              <option value="Indian">Indian</option>
              <option value="Irish">Irish</option>
              <option value="Italian">Italian</option>
              <option value="Jamaican">Jamaican</option>
              <option value="Japanese">Japanese</option>
              <option value="Kenyan">Kenyan</option>
              <option value="Malaysian">Malaysian</option>
              <option value="Mexican">Mexican</option>
              <option value="Moroccan">Moroccan</option>
              <option value="Polish">Polish</option>
              <option value="Portuguese">Portuguese</option>
              <option value="Russian">Russian</option>
              <option value="Spanish">Spanish</option>
              <option value="Thai">Thai</option>
              <option value="Tunisian">Tunisian</option>
              <option value="Turkish">Turkish</option>
              <option value="Ukrainian">Ukrainian</option>
              <option value="Unknown">Unknown</option>
              <option value="Vietnamese">Vietnamese</option>
            </select>
          </div>
          <div className="flex flex-col">
            {filterData.length > 0 ? (
              filterData.map((meal, index) => (
                <div
                  key={index}
                  onClick={() => {
                    navigate(`/post/${meal.strMeal}`);
                    setInput("");
                  }}
                  className="flex justify-start gap-3 h-14 hover:bg-red-200 font-poppin cursor-pointer border-gray-800 hover:bg-white/50 items-center px-3"
                >
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    loading="lazy"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <h4 className="mb-0 pb-0 w-40">{meal.strMeal}</h4>
                </div>
              ))
            ) : (
              <p className="mt-48 mx-auto text-2xl">No recipe found !</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
