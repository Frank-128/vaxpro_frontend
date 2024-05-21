import LoadingComponent from "@/components/LoadingComponent";
import "../globals.css";
import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <LoadingComponent />
    </div>
  );
};

export default Loading;
