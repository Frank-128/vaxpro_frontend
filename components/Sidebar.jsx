"use client";
import React from "react";

function Sidebar({ openSidebar, setOpenSidebar }) {
  return (
    <div className="w-screen   top-0 left-0">
      <div
        className={`w-[90%] md:w-[300px] z-50 transition-all duration-300  fixed h-screen bg-[#212b36] ${
          openSidebar ? "left-0" : "-left-[90%] "
        } md:block   `}
      >
        <div>
          <h1
            onClick={() => setOpenSidebar(false)}
            className="font-monte-1 text-white text-3xl text-center p-2"
          >
            VaxPro
          </h1>
        </div>
      </div>
      <div
        onClick={() => setOpenSidebar(false)}
        className={
          !openSidebar
            ? "-left-[300px]"
            : "bg-black/25 md:hidden transition-all duration-300 fixed top-0 z-50 left-[90%] w-[calc(100vh-90%)] h-screen"
        }
      ></div>
    </div>
  );
}

export default Sidebar;
