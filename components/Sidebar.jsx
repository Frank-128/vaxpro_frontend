"use client";
import { navlinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import globalUser from "@/store/user";
import { Spinner } from "@material-tailwind/react";
import {Loading} from '../app/(vaccination)/loading';
import LoadingComponent from "./LoadingComponent";

function Sidebar({ openSidebar, setOpenSidebar }) {
  const pathname = usePathname();
  const [openSublinks, setOpenSublinks] = useState("");
  const loggedInUser = globalUser((state) => state.loggedInUser);
  const [filteredNavlinks, setFilteredlinks] = useState([]);

  useEffect(() => {
    const filteredNavlinks = navlinks.filter((navlink) => {
      return (

        (navlink?.role?.includes(loggedInUser.role?.role) &&
          navlink.account_type.includes(loggedInUser?.role?.account_type)) ||

        navlink.account_type?.includes("default")
      );
    });
    setFilteredlinks(filteredNavlinks);
  }, [loggedInUser]);
  return (
    <div className="w-screen top-0 left-0 ">
      <div
        className={`w-[90%] md:w-[280px] z-50 transition-all duration-300  fixed h-screen bg-blue-900 ${
          openSidebar ? "left-0" : "-left-[90%] "
        } md:block   `}
      >
        <div>
          <h1
            onClick={() => setOpenSidebar(false)}
            className="font-monte-1 text-white text-xl h-20 text-center p-2"
          >
            VaxPro
          </h1>

          {loggedInUser ? (
            <div className="flex flex-col gap-8 items-start justify-around">
              {filteredNavlinks.map(
                ({ name, link, icon, sublinks, suffixIcon, role }, index) => (
                  <Link
                    className={`${
                      link === pathname ? "text-white" : "text-[#8e8888]"
                    } p-2 w-full hover:text-white`}
                    key={index}
                    href={link || "#"}
                  >
                    <div
                      className="flex gap-x-2 items-center justify-between bg-yellow-30 w-full"
                      onClick={() => {
                        openSublinks == ""
                          ? setOpenSublinks(name)
                          : setOpenSublinks("");
                      }}
                    >
                      <div className="flex gap-3">
                        {icon}
                        <span>{name}</span>
                      </div>
                      <div className="">{suffixIcon}</div>
                    </div>
                    {sublinks &&
                      openSublinks === name &&
                      sublinks.map(
                        (item, i) =>
                          item.account_type.includes(
                            loggedInUser.role.account_type
                          ) && (
                            <Link
                              className={`${
                                item.link === pathname
                                  ? "text-white"
                                  : "text-[#8e8888]"
                              } py-2 pr-2 pl-16 flex flex-start hover:text-white capitalize`}
                              key={i}
                              href={item.link}
                            >
                              <div className="flex gap-2 ">
                                <span className="overflow-hidden ">{item.name}</span>
                              </div>
                            </Link>
                          )
                      )}
                  </Link>
                )
              )}
            </div>
          ) : (
            <div className="flex h-[34rem] justify-center items-center">
              {/* <LoadingComponent/> */}
              <Spinner/>
            </div>
          )}
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
