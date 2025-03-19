import React from "react";
import SideNav from "./SideNav";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex w-full h-screen overflow-hidden">
      <SideNav />
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
