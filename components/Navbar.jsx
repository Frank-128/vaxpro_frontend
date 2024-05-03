"use client";
import React, { useEffect } from "react";
import { Menu } from "@mui/icons-material";
import { Button, Input } from "@material-tailwind/react";
import globalUser from "@/store/user";

function Navbar({ openSidebar, setOpenSidebar }) {
  const loggedInUser = globalUser((state) => state.loggedInUser);

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
      <div className="flex gap-6 justify-center items-center capitalize">
        <div className="flex gap-2">
          <p>Level:</p>
          <h1 className=" md:block hidden font-monte-1">
            {" "}
            {loggedInUser.role?.account_type}
          </h1>
        </div>
        {loggedInUser.region_id && (
          <div className="flex gap-2">
            <p>Region:</p>
            <h1 className=" md:block hidden font-monte-1">
              {loggedInUser.region.region_name}
            </h1>
          </div>
        )}
        {loggedInUser.district_id && (
          <div className="text-sm">
            <div className="flex gap-2">
              <p>District:</p>
              <h1 className=" md:block hidden font-monte-1">
                {loggedInUser.district.district_name}
              </h1>
            </div>
            <div className="flex gap-2">
              <p> Region:</p>
              <h1 className=" md:block hidden font-monte-1">  
                {loggedInUser.district.region.region_name}
              </h1>
            </div>
          </div>
        )}
        <div className="flex gap-2">
          <p>Role:</p>
          <h1 className=" md:block hidden font-monte-1">
            {loggedInUser.role?.role}
          </h1>
        </div>
        <Button className="bg-white p-2 text-black border border-black font-monte-3">
          sign out
        </Button>
      </div>
    </nav>
  );
}

export default Navbar;
