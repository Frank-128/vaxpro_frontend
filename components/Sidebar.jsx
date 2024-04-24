"use client";
import { navlinks } from "@/constants";
import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

function Sidebar({ openSidebar, setOpenSidebar }) {
  const pathname = usePathname();
  const [openSublinks, setOpenSublinks] = useState("");

  return (
    <div className="w-screen   top-0 left-0">
      <div
        className={`w-[90%] md:w-[280px] z-50 transition-all duration-300  fixed h-screen bg-[#212b36] ${
          openSidebar ? "left-0" : "-left-[90%] "
        } md:block   `}
      >
        <div>
          <h1
            onClick={() => setOpenSidebar(false)}
            className="font-monte-1 text-white text-3xl h-20 text-center p-2"
          >
            VaxPro
          </h1>

          <div className="flex flex-col gap-8 items-start justify-around">
            {navlinks.map(
              ({ name, link, icon, sublinks, suffixIcon }, index) => (
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
                    openSublinks == name &&
                    sublinks.map((item, i) => (
                      <Link
                        className={`${
                          item.link === pathname
                            ? "text-white"
                            : "text-[#8e8888]"
                        } p-2 flex justify-center hover:text-white`}
                        key={i}
                        href={item.link}
                      >
                        <div className="flex gap-x-2 items-center">
                          <span>{item.name}</span>
                        </div>
                      </Link>
                    ))}
                </Link>
              )
            )}
          </div>
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
