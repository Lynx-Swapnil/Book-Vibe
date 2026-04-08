import React from 'react';
import Navbar from '../components/Nabbar/Navbar';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <div className="pt-24">
            <Navbar />
            <Outlet />
        </div>
    );
};

export default MainLayout;