"use client";
import React, { useEffect } from "react";
import { Menu } from "@mui/icons-material";
import { Input } from "@material-tailwind/react";

function Navbar({ openSidebar, setOpenSidebar }) {

  
  return (
    <nav
      className={`bg-white sticky left-0 top-0 p-2  h-20 z-10  flex items-center w-screen justify-between border-b-[0.5px] border-[#494747] transition-all duration-300 ${
        openSidebar
          ? "md:left-[280px] md:w-[calc(100vw-280px)] "
          : "md:left-0  "
      }`}
    >
      <div className="flex gap-2 items-center ">
        <Menu onClick={() => setOpenSidebar(!openSidebar)} />
        <Input label="search" />
      </div>

      <div>
        <h1 className=" md:block hidden">Welcome,</h1>
      </div>
    </nav>
  );
}

export default Navbar;
