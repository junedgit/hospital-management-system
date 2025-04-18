import React from "react";
import SideNav from "./SideNav";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Layout = () => {
  const { isLoggedIn, userRole, currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <SideNav />
      <main className="w-full flex flex-col">
        {/* Header with user info and logout */}
        {isLoggedIn && (
          <header className="bg-white border-b border-gray-200 px-4 py-2 flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">Logged in as:</span>
              <span className="text-sm font-medium text-[#0D8E83]">
                {currentUser?.name || 'User'}
                <span className="text-xs text-gray-500 ml-1">({userRole})</span>
              </span>
            </div>
            {/* <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:text-red-800 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button> */}
          </header>
        )}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
