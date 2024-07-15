import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Controller, Autoplay } from "swiper/modules";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import "swiper/css";
import { useNavigate } from "react-router-dom";
const Slider = ({ isMobileDevice, recipe, callback }) => {
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
  useEffect(() => {
    callback();
  }, []);
  return (
    <section>
      <div className="heading">Our latest recipe</div>
      <div className=" h-[400px] relative">
        <Swiper
          spaceBetween={50}
          modules={[Navigation, Autoplay]}
          navigation
          ref={sliderRef}
          autoplay={{ delay: 3000 }}
          slidesPerView={isMobileDevice ? 1 : 3}
        >
          {recipe?.map((list, i) => {
            return (
              <SwiperSlide
                key={i}
                className="h-[400px] shadow rounded-md overflow-hidden w-72 flex flex-col bg-gray-50 relative"
                onClick={() => navigate(`/post/${list.strMeal}`)}
              >
                <img
                  src={list?.strMealThumb}
                  alt={list?.strMeal}
                  className="h-[65%] w-100% object-cover"
                />
                <div className="h-fit text-center w-fit max-w-64  text-wrap font-medium bg-white absolute bottom-[120px] rounded shadow-sm text-red-600  px-5 py-2 self-center">
                  {list?.strMeal}
                </div>
                <p className=" line-clamp-2 px-3 text-xm font-poppin text-red-800 mt-8 z-10">
                  {list.strInstructions}
                </p>
                <div className="flex gap-3 w-full px-3 font-normal mt-2 ">
                  {!list.strTags
                    ? ""
                    : list.strTags.split(",").map((tag, i) => (
                        <span
                          className="px-5 py-1 border rounded-[30px] text-slate-800"
                          key={i}
                        >
                          {tag}
                        </span>
                      ))}
                </div>
              </SwiperSlide>
            );
          })}
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

export default React.memo(Slider);
