"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import clsx from "clsx";

function Main({ children }) {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <main>
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <section className={clsx("z-10 px-5 max-h-[calc(100vh-80px)] overflow-y-scroll",{"ml-[300px]":openSidebar, "ml-0":!openSidebar})}>{children}</section>
    </main>
  );
}

export default Main;
