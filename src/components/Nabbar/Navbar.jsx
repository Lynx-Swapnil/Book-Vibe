import React from 'react';
import { NavLink } from 'react-router';

const Navbar = () => {
  const navLinkClass = ({ isActive }) =>
    `rounded-full border px-4 py-2 text-sm font-semibold transition ${isActive
      ? 'border-orange-300 bg-orange-50 text-orange-700'
      : 'border-transparent text-gray-600 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-700'
    }`;

  const links = (
    <>
      <li>
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/books" className={navLinkClass}>
          Listed Books
        </NavLink>
      </li>
      <li>
        <NavLink to="/page-to-read" className={navLinkClass}>
          Pages to Read
        </NavLink>
      </li>
    </>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#f2dccb] bg-white/85 backdrop-blur-lg">
      <div className="w-11/12 max-w-6xl mx-auto py-3">
      <div className="navbar rounded-2xl surface-card px-3 lg:px-4">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost rounded-full lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content z-1 mt-3 w-56 rounded-2xl border border-orange-100 bg-white p-2 shadow-xl">
              {links}
            </ul>
          </div>
          <h2 className="title-font text-2xl font-black uppercase text-[#2f2118] lg:text-3xl">Book Vibe</h2>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 px-1">
            {links}
          </ul>
        </div>
        <div className="navbar-end gap-2 md:gap-3">
          <button className="btn h-10 min-h-10 rounded-full border border-orange-200 bg-white px-5 text-orange-700 hover:bg-orange-50">Sign In</button>
          <button className="btn h-10 min-h-10 rounded-full border-0 bg-teal-600 px-5 text-white hover:bg-teal-700">Sign Up</button>
        </div>
      </div>
    </div>
    </header>
  );
};

export default Navbar;