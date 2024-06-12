'use client'
import LoadingComponent from "@/components/LoadingComponent";
import "../globals.css";
import React from "react";
import { Spinner } from "@material-tailwind/react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      {/* <LoadingComponent /> */}
      <Spinner/>
    </div>
  );
};

export default Loading;
