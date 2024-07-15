import React, { useCallback, useContext, useEffect, useState } from "react";
import Testinomy from "../Component/Testinomy";
import FestiveSlider from "../Component/FestiveSlider";
import Slider from "../Component/Slider";
import Footer from "../Component/Footer";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { SizeContext } from "../context/SizeContext";

const Home = () => {
  const [highLights, setHighLights] = useState([]);
  const [randomData, setRandomData] = useState([]);
  const [singlePost, setSinglePost] = useState({});
  const [recipe, setRecipe] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobileDevice = useContext(SizeContext);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true); // Set loading to true at the start of the fetch
      try {
        const [categoriesResponse, randomResponse, searchResponse] =
          await Promise.all([
            fetch("https://www.themealdb.com/api/json/v1/1/categories.php"),
            fetch("https://www.themealdb.com/api/json/v1/1/random.php"),
            fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=a"),
          ]);

        const categoriesData = await categoriesResponse.json();
        const randomData = await randomResponse.json();
        const searchData = await searchResponse.json();

        setHighLights(categoriesData.categories);
        setSinglePost(randomData.meals[0]);

        const suffle = [...categoriesData.categories].sort(
          () => 0.5 - Math.random()
        );
        const randomMeal = [...searchData.meals].sort(
          () => 0.5 - Math.random()
        );
        setRecipe(randomMeal.slice(0, 4));
        setRandomData(suffle.slice(0, isMobileDevice ? 4 : 5));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    console.log(recipe);
    fetchAllData();
  }, [setLoading]);

  const callback = useCallback(() => {}, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <main className="h-fit w-full bg-white overflow-x-hidden">
      <header className="md:h-[calc(100vh-80px)] w-full h-[calc(100vh-40px)] bg-slate-300 relative">
        <img
          src="./Food-and-Culture.jpg"
          alt="Header image"
          className="h-full w-full object-cover md:object-center object-[20%]"
        />
        <h2 className="absolute md:top-96 md:text-10xl md:left-10 lg:top-72 lg:left-80  top-60 mr-2 text-7xl text-right ">
          Your favourite food <br />
          Make it good
        </h2>
      </header>

      <section>
        <div className="heading">Highlights</div>
        <div className="flex flex-wrap md:justify-between flex-col md:flex-row items-center w-full h-fit gap-6">
          {randomData.map((item) => (
            <div
              className="h-58 lg:shadow-none shadow-md rounded-md p-5 lg:p-0"
              key={item.idCategory}
            >
              <img
                src={item.strCategoryThumb}
                alt={item.strCategory}
                className="h-40 w-40 object-contain "
              />
              <h4 className="text-center text-[18px] font-poppin font-medium text-slate-800">
                {item.strCategory}
              </h4>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="h-screen w-full mt-20 relative">
          <img
            src={singlePost?.strMealThumb}
            alt={singlePost.strMeal}
            className="md:h-[80vh] md:w-[60vw] h-[400px] object-cover rounded-3xl"
          />
          <div className="md:h-[450px] md:w-[450px] right-0 flex flex-col gap-3 justify-center items-center p-10 bg-red-200 absolute mr-0 rounded-3xl md:top-14 top-32">
            <h4 className="font-poppin font-semibold text-2xl mb-5">
              {singlePost.strMeal}
            </h4>
            <p className="font-normal text-xl line-clamp-[7]">
              {singlePost.strInstructions}
            </p>
            <button
              onClick={() => {
                navigate(`/post/${singlePost?.strMeal}`);
              }}
              className="text-[19px] px-5 py-2 mt-5 bg-red-600 text-white"
            >
              View recipe...
            </button>
          </div>
        </div>
      </section>

      <Slider
        isMobileDevice={isMobileDevice}
        recipe={recipe}
        callback={callback}
      />
      <Testinomy />
      <FestiveSlider recipe={recipe} />

      <section>
        <div className="heading">Popular Recipes</div>
        <div className="flex flex-wrap md:gap-3 gap-10 justify-between overflow-hidden w-full overflow-y-hidden py-10">
          {recipe.map((val) => (
            <div
              key={val.idMeal}
              onClick={() => navigate(`/post/${val.strMeal}`)}
              className="h-40 shadow-md cursor-pointer hover:scale-105 transition-all rounded-3xl md:w-[500px] w-96 lg:w-[48%] flex justify-start items-center p-3 gap-3"
            >
              <img
                src={val.strMealThumb}
                alt={val.strCategory}
                className="md:h-32 md:w-32 h-28 w-28 object-cover rounded-full"
              />
              <div className="flex flex-col">
                <h3 className="md:text-xl font-medium text-[18px]">
                  {val.strMeal}
                </h3>
                <p>{val.strCategory}</p>
                <p className="text-sm line-clamp-2">{val.strInstructions}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
