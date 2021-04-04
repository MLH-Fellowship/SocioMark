import React from "react";
import "../../Styles/loader.css";
export const Loading = () => {
  return (
    <div>
      <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center">
        <div className="bg-white border py-2 px-5 rounded-lg flex items-center flex-col">
          <div className="loader-dots block relative w-20 h-5 mt-2">
            <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-blue-500"></div>
            <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-blue-500"></div>
            <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-blue-500"></div>
            <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-blue-500"></div>
          </div>
          <div className="text-gray-500 text-xs font-light mt-2 text-center">
            Please wait...
          </div>
        </div>
      </div>
    </div>
  );
};

export const FullLoading = ({ color = "gray-200" }) => {
  return (
    <div
      className={`h-screen w-full items-center flex flex-col justify-center overflow-hidden bg-${color}`}
    >
      <Loading />
    </div>
  );
};
