import React from 'react';
import bookImg from './../../../assets/hero_img.jpg';
import { Link } from 'react-router';

const Banner = () => {
  return (
    <div className="w-11/12 max-w-6xl mx-auto my-8">
      <div className="hero rounded-3xl border border-[#f2dccb] bg-linear-to-br from-[#fff5eb] via-[#fffaf6] to-[#e8f8f4] px-6 py-12 shadow-[0_20px_40px_rgba(100,62,30,0.12)] lg:px-14 lg:py-14">
        <div className="hero-content w-full flex-col-reverse justify-between gap-12 px-0 lg:flex-row-reverse lg:items-center">
          <img
            src={bookImg}
            alt="Book cover"
            className="w-52.5 rounded-2xl object-contain drop-shadow-2xl lg:w-70"
          />
          <div className="max-w-xl text-center lg:text-left">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-orange-700">Book Vibe Collection</p>
            <h1 className="title-font text-4xl font-black leading-tight text-[#2f2118] sm:text-5xl lg:text-6xl">
              Books to refresh
              <br />
              your shelf mood
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#654b3a]">
              Discover thoughtful picks, track your reading journey, and build a wishlist you will actually finish.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Link to="/books" className="btn h-11 min-h-11 rounded-full border-0 bg-orange-500 px-7 text-white hover:bg-orange-600">
                View The List
              </Link>
              <Link to="/page-to-read" className="btn h-11 min-h-11 rounded-full border border-teal-600 bg-white px-7 text-teal-700 hover:bg-teal-50">
                Pages to Read
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;