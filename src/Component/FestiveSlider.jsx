import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Controller, Autoplay } from "swiper/modules";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import "swiper/css";
import { useNavigate } from "react-router-dom";
const FestiveSlider = ({ recipe }) => {
  const sliderRef = useRef(null);
  const navigate = useNavigate();
  const nextSlide = () => {
    if (sliderRef.current && sliderRef.current.swiper) {
      sliderRef.current.swiper.slideNext();
    }
  };
  const prevSlide = () => {
    if (sliderRef.current && sliderRef.current.swiper) {
      sliderRef.current.swiper.slidePrev();
    }
  };
  return (
    <section>
      <div className="heading">Our festive recipe</div>
      <div className=" relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          ref={sliderRef}
          autoplay={{ delay: 4000 }}
          slidesPerView={1}
          spaceBetween={20}
        >
          {recipe.map((val) => (
            <SwiperSlide
              key={val.idMeal}
              className="md:h-[400px] h-[300px] shadow rounded-md overflow-hidden  flex  bg-gray-50 relative"
            >
              <img
                src={val.strMealThumb}
                alt={val.strMeal}
                className="h-full w-[50%] object-cover overflow-hidden"
              />

              <div className="flex gap-3 h-full  md:p-10 p-5 flex-col w-[50%] bg-red-200">
                <h3 className="md:text-2xl text-xl z-40 font-medium text-center">
                  {val.strMeal}
                </h3>
                <p className="md:text-xl text-sm line-clamp-6  overflow-hidden">
                  {val.strInstructions}
                </p>
                <button
                  onClick={() => {
                    navigate(`/post/${val.strMeal}`);
                  }}
                  className="bg-red-600 text-[18px] text-white mx-auto  whitespace-nowrap mt-10 w-fit lg:px-7 lg:py-2 px-3 py-1"
                >
                  Read More
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          className="absolute top-[50%] left-[-40px] z-30 text-4xl text-slate-600
          "
          onClick={prevSlide}
        >
          <GrFormPrevious />
        </button>
        <button
          className="absolute top-[50%] right-[-40px] z-30 text-4xl text-slate-600"
          onClick={nextSlide}
        >
          <MdOutlineNavigateNext />
        </button>
      </div>
    </section>
  );
};

export default FestiveSlider;
