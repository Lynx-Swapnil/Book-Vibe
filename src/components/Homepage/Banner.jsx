import React from 'react';
import bookImg from './../../../assets/hero_img.jpg';

const Banner = () => {
  return (
    <div className="w-11/12 max-w-6xl mx-auto my-8">
      <div className="hero rounded-2xl bg-[#f2f2f2] px-6 py-14 lg:px-14 lg:py-16">
        <div className="hero-content w-full flex-col-reverse justify-between gap-12 px-0 lg:flex-row-reverse lg:items-center">
          <img
            src={bookImg}
            alt="Book cover"
            className="w-[210px] object-contain drop-shadow-xl lg:w-[280px]"
          />
          <div className="max-w-xl text-center lg:text-left">
            <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Books to freshen up
              <br />
              your bookshelf
            </h1>
            <button className="btn mt-8 h-12 min-h-12 rounded-lg border-0 bg-green-500 px-8 text-white hover:bg-green-600">
              View The List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;