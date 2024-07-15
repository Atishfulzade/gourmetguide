import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaChevronCircleRight } from "react-icons/fa";
import FestiveSlider from "../Component/FestiveSlider";
import Loading from "./Loading";
import Sidebar from "../Component/Sidebar";
import Ingredient from "../Component/Ingredient";
import { SizeContext } from "../context/SizeContext";

const Post = () => {
  const { name } = useParams();
  const [myData, setMyData] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const navigate = useNavigate();
  const isMobileDevice = useContext(SizeContext);
  const embedUrl = myData?.strYoutube
    ? myData.strYoutube.replace("watch?v=", "embed/")
    : "";
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
        );

        const data = await response.json();
        setMyData(data.meals[0]); // Set to the first (and only) meal in the array
      } catch (error) {
        console.error("Error fetching recipe data:", error);
      }
    };

    fetchRecipe();
  }, [name]);

  if (!myData) {
    return <Loading />;
  }
  return (
    <div className="flex justify-between w-full  h-fit bg-red-200">
      <div className="flex  flex-col w-full md:w-[80%] relative overflow-hidden lg:px-20 px-3">
        <h1 className="heading  ">{myData.strMeal}</h1>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-[50%] w-[100%] flex lg:h-[500px]  h-[300px] flex-col md:flex-row justify-center">
            <div className="relative lg:h-[400px] h-[300px] w-full rounded-3xl shadow-md  bg-slate-700 ">
              <img
                src={myData.strMealThumb}
                alt={myData.strMeal}
                loading="lazy"
                className="h-full w-full object-cover rounded-3xl "
              />
              <img
                src={myData.strMealThumb}
                alt={myData.strMeal}
                loading="lazy"
                className="rounded-full absolute hidden md:block top-48  border-white border-4 right-[-100px] shadow-md h-[300px] w-[300px] object-cover"
              />
              <h3 className="px-3 py-1 md:mt-32 lg:mt-10 font-medium  shadow-md bg-white text-slate-800 w-fit rounded-full text-sm mt-7">
                Origin : {myData.strArea}
              </h3>
              <h3 className="px-3 py-1 font-medium shadow-md bg-white text-slate-800 w-fit rounded-full text-sm mt-3">
                Category : {myData.strCategory}
              </h3>
            </div>
          </div>
          <div className="md:w-[50%]  flex-col md:h-fit max-h-fit md:pl-28 flex p-3 md:mt-0 mt-28 rounded-xl">
            <h3 className="text-xl font-medium">Ingredients</h3>
            <div className="flex flex-col">
              {Array(20)
                .fill("")
                .map((_, i) =>
                  !myData[`strIngredient${i + 1}`] ? (
                    ""
                  ) : (
                    <>
                      <h5
                        key={i}
                        className="text-[18px] flex items-center gap-2 relative"
                      >
                        <FaChevronCircleRight
                          className="text-red-300"
                          onClick={() =>
                            navigate(
                              `/post/ingredients/${myData.strIngredient[i + 1]}`
                            )
                          }
                        />
                        {myData[`strIngredient${i + 1}`]} :{" "}
                        {myData[`strMeasure${i + 1}`]}
                      </h5>
                    </>
                  )
                )}
            </div>
          </div>
        </div>
        {!myData.strTags ? (
          ""
        ) : (
          <div className="flex gap-2 md:mt-10 items-center">
            <p>Tags :</p>
            {myData.strTags.split(",").map((tag, index) => (
              <h5
                key={index}
                className="px-4 py-1 text-sm border border-slate-500 text-slate-500 rounded-full"
              >
                {tag}
              </h5>
            ))}
          </div>
        )}
        <div className="flex mt-5  indent-10 w-full p-3">
          {myData.strInstructions}
        </div>
        {!isMobileDevice.isMobileDevice ? (
          ""
        ) : (
          <div className="flex justify-end flex-col w-full p-3 border-t-2">
            <h2 className=" whitespace-nowarp mb-3 text-xl font-medium">
              Watch Recipe
            </h2>
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title="YouTube video"
                className="w-full h-64"
                allowFullScreen
              ></iframe>
            ) : (
              <p>No video available</p>
            )}
          </div>
        )}
      </div>

      {!isMobileDevice.isMobileDevice ? <Sidebar myData={myData} /> : ""}
    </div>
  );
};

export default Post;
