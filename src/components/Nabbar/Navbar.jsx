import React from 'react';
import { NavLink } from 'react-router';

const Navbar = () => {
  const navLinkClass = ({ isActive }) =>
    `rounded-lg border px-4 py-2 text-sm font-semibold transition ${isActive
      ? 'border-green-500 text-green-600'
      : 'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700'
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
    <div className="w-11/12 max-w-6xl mx-auto pt-8">
      <div className="navbar bg-transparent px-0">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              {links}
            </ul>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Book Vibe</h2>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 px-1">
            {links}
          </ul>
        </div>
        <div className="navbar-end gap-4">
          <button className="btn h-12 min-h-12 rounded-lg border-0 bg-green-500 px-7 text-white hover:bg-green-600">Sign In</button>
          <button className="btn h-12 min-h-12 rounded-lg border-0 bg-cyan-400 px-7 text-white hover:bg-cyan-500">Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;