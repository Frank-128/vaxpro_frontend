"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import clsx from "clsx";
import { useInitial } from "@/constants/functions";
import { useIdle } from "react-use";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import globalUser from "@/store/user";

function Main({ children }) {
  const {initialRequest,getInitialUsers} = useInitial();
  const [openSidebar, setOpenSidebar] = useState(true);
  const isIdle = useIdle(1000*60*60*2)
  const route = useRouter()
  const loggedInUser = globalUser(state=>state.loggedInUser)
  
  useEffect(() => {
      
    initialRequest();
  }, [initialRequest]);
  
  useEffect(()=>{
    getInitialUsers()
  },[getInitialUsers])

  

  useEffect(()=>{
    if(isIdle){
      Cookies.remove('USER_TOKEN')
      route.push('/signin')
    }
  },[isIdle,route])

  // console.log(loggedInUser)
  return (
    <main>
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <section
        className={clsx("z-10 p-5 max-h-[calc(100vh-80px)] overflow-y-scroll", {
          "ml-[280px]": openSidebar,
          "ml-0": !openSidebar,
        })}
      >
        {children}
        
      </section>
    </main>
  );
}

export default Main;
