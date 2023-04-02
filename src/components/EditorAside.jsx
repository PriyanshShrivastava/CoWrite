import React from "react";

const EditorAside = () => {
  return (
    <div className="flex flex-row md:flex-col justify-between md:justify-normal md:space-y-8 bg-slate-800 w-full h-16 md:w-60 md:h-screen transition-all duration-100 md:px-4 md:py-2 items-center md:items-start ">
      <div className="">
        <div className="w-full flex justify-start space-x-2 items-center ">
          <i className="fa-solid fa-dna text-md md:text-2xl text-green-300"></i>
          <h1 className="text-lg md:text-3xl font-semibold text-white font-josefin mt-2">
            Code Along
          </h1>
        </div>
      </div>
      <h3 className="text-md md:text-lg font-josefin hidden md:inline-block mr-auto text-white">
        {" "}
        Participants :
      </h3>
      <div id="user-connected"></div>
    </div>
  );
};

export default EditorAside;
