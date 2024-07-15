import React, { useEffect } from "react";

const Ingredient = () => {
  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}
            `);
  }, []);
  return <div className="h-[500px] w-[500px] bg-red-100">hwllo</div>;
};

export default Ingredient;
