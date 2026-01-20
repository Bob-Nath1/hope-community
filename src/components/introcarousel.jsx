import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const IntroCarousel = ({ onGetStarted }) => {
  return (
    <div className="h-screen w-full bg-gray-50 overflow-hidden">
      <Swiper spaceBetween={0} slidesPerView={1} direction="horizontal">
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative flex flex-col items-center justify-center h-screen text-center bg-blue-900">
            <img
              src="/photo_6019360463520910443_y.jpg"
              alt="Money background"
              className="absolute inset-0 w-full h-full  opacity-30"
            />
            <div className="relative z-10 px-6 pt-84">
              <h1 className="text-3xl font-bold text-white mb-4">
                Save Together, Grow Together
              </h1>
              <p className="text-white font-semibold">
                Join our community and save with friends and family towards your
                financial goals.
              </p>
            </div>

             <div className="w-9 h-[4px] bg-gradient-to-r from-yellow-300 via-white to-yellow-400 rounded-full mr-66 opacity-85 mt-17 "></div>
           <div className="w-3 h-[4px] bg-white rounded-full mr-49 -mt-1 opacity-85"></div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative flex flex-col items-center justify-center h-screen text-center bg-blue-900">
            <img
              src="/photo_6019360463520910443_y.jpg"
              alt="Money background"
              className="absolute inset-0 w-full h-full opacity-40"
            />
            <div className="relative z-10 px-6 pt-84">
              <h1 className="text-3xl font-bold text-white mb-4">
                Borrow Smart, Repay Easy
              </h1>
              <p className="text-white font-semibold mb-7">
                Get instant loans with flexible repayment options to cover
                unexpected expenses or achieve your goal.
              </p>
              <button
  onClick={onGetStarted}
  className="bg-gradient-to-r from-yellow-300 via-white to-yellow-200 hover:from-yellow-300 hover:via-white hover:to-yellow-300 text-gray-900 font-semibold py-3 px-10 rounded-2xl shadow-xl transition-all duration-300 ml-27"
>
  Get Started
</button>

            </div>
           <div className="w-9 h-[4px] bg-gradient-to-r from-yellow-300 via-white to-yellow-400 rounded-full mr-56 opacity-85 -mt-7 "></div>
           <div className="w-3 h-[4px] bg-white rounded-full mr-74 -mt-1 opacity-85"></div>

          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default IntroCarousel;
