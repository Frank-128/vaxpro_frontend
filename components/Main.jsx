"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import clsx from "clsx";
import { useInitial } from "@/constants/functions";
import { useIdle } from "react-use";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import globalAlert from "@/store/alert";
import { Alert } from "@material-tailwind/react";
import { Error, Verified } from "@mui/icons-material";


function Main({ children }) {
  const {initialRequest,getInitialUsers} = useInitial();
  const [openSidebar, setOpenSidebar] = useState(true);
  const isIdle = useIdle(1000*60*60*2)
  const route = useRouter()
  const alertObj = globalAlert((state)=>state.alert)
  
  
  
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

  console.log(alertObj)
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
      <Alert
      open={alertObj.visible}
      icon={alertObj.type == "success" ?<Verified /> : <Error />} 
      animate={{
        mount: { y: 0 },
        unmount: { y: 100 },
      }}
      color={alertObj.type =="success"?'green':"red"}
      className={"rounded-sm  absolute top-1 right-1 z-[90]   w-1/3 font-medium text-white"}
    >
      {alertObj.message}
     
    </Alert>
    </main>
  );
}

export default Main;
