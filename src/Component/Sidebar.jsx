import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ myData }) => {
  const [area, setArea] = useState([]);
  // Convert the YouTube URL to an embed URL
  const embedUrl = myData?.strYoutube
    ? myData.strYoutube.replace("watch?v=", "embed/")
    : "";
  useEffect(() => {
    const fetchMyData = async () => {
      try {
        const data = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?a=${myData.strArea}`
        );
        const response = await data.json();
        let randomVal = response.meals.sort(() => 0.5 * Math.random());
        setArea(randomVal.slice(0, 4)); // Fetch 3 random recipes from the area
      } catch (error) {
        console.log(error, "Error fetching");
      }
    };
    fetchMyData();
  }, []);
  return (
    <div className="w-[30%] h-screen sticky top-0 border-l-2  border-red-300 mt-5  p-5 pt-0">
      <div className="flex flex-col h-fit w-full mb-3 text-xl font-medium text-slate-800">
        <h4 className="mb-3">Play on YouTube</h4>
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
      <div className="flex flex-col h-fit gap-2 w-full mb-3 text-xl font-medium text-slate-800">
        <h4 className="mt-0">Suggested recipe</h4>
        {area.map((item) => (
          <Link
            to={`/post/${item.strMeal}`}
            key={item.idMeal}
            className="h-18 w-full bg-white flex p-2 rounded-md hover:bg-red-100"
          >
            <img
              src={item?.strMealThumb}
              loading="lazy"
              alt={item.strMeal}
              className="h-16 w-16 rounded-full"
            />
            <div className="flex flex-col ml-3">
              <h4>{item.strMeal}</h4>
              <p className="text-sm ">Origin : {myData.strArea}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
