import React from "react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { testimonials } from "../constant";
const Testinomy = () => {
  return (
    <div className="relative">
      <div className="absolute bg-stone-200 w-full h-[410px] top-[175px]"></div>
      <Swiper
        slidesPerView={1}
        autoplay={{ delay: 4000 }}
        navigation
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} right-0 swiper-pagination-bullet-custom"></span>`;
          },
        }}
        modules={[Navigation, Autoplay, Pagination]}
      >
        <div className="heading absolute top-36 lg:top-56 text-left lg:left-52 md:left-32 left-6   z-40">
          Testimony
        </div>
        {testimonials.map((testi) => (
          <SwiperSlide
            key={testi.name}
            className=" h-[500px] w-full mt-20 lg:px-40 px-7 flex justify-center items-end"
          >
            <div className="absolute top-5 md:right-48 h-40 w-40 md:h-56 md:w-56  lg:h-96 lg:w-96 right-2">
              <img
                src={testi.profilePhoto}
                alt={testi.name}
                loading="lazy"
                className="h-full w-full object-cover rounded-full"
              />
            </div>
            <div className="bg-stone-200 w-full h-[350px] flex justify-center lg:justify-end lg:p-12 pb-10 flex-col rounded">
              <h5 className="font-poppin font-medium inline text-xl text-red-500 mb-4">
                Hi I'm {testi.name}
              </h5>
              <p className="text-[18px] lg:w-1/2 w-full">{testi.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testinomy;
