import React, { useState } from "react";
import ClientBox from "./ClientBox";

const EditorAside = ({ clients }) => {
  const [showParticipant, setShowParticipant] = useState(false);

  const handleShowParticipants = () => {
    setShowParticipant((prev) => !prev);
  };
  return (
    <div className="flex flex-row md:flex-col justify-between bg-slate-800 w-full h-16 md:w-60 md:h-screen transition-all duration-100 md:px-4 md:py-2 px-4 items-center relative">
      <div className="flex flex-row space-x-6 md:space-x-0 md:flex-col md:space-y-6 items-center">
        <div>
          <div className="w-full flex justify-start space-x-2 items-center ">
            <i className="fa-solid fa-dna text-md md:text-2xl text-green-300"></i>
            <h1 className="text-lg md:text-3xl font-semibold text-white font-josefin mt-2">
              CoWrite
            </h1>{" "}
          </div>
        </div>
        <div
          className="h-6 w-1 md:w-1/2 md:h-1 rounded-sm bg-slate-300 mx-auto "
          id="divider"
        ></div>
        <div className="flex flex-col space-y-4">
          <h3 className="text-md md:text-lg font-josefin hidden md:inline-block mr-auto text-white">
            {" "}
            Participants :
          </h3>
          <div
            id="user-connected"
            className="hidden md:flex gap-8 flex-wrap  items-start "
          >
            {clients.map((client) => (
              <ClientBox key={client.socketId} username={client.userName} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-row space-x-4 md:flex-col md:space-y-6 md:space-x-0 md:w-full relative">
        <button className="bg-slate-300 font-josefin text-sm md:text-md rounded-md shadow-md px-2 md:py-2">
          {" "}
          <i className="fa-regular fa-clipboard"></i> Room ID
        </button>
        <button className="bg-red-400 font-josefin text-sm md:text-md rounded-md shadow-md px-2 md:py-2 ">
          {" "}
          Leave
        </button>

        {/* Mobile navigation  */}

        <i
          className="fa-solid fa-bars text-2xl text-white md:hidden"
          onClick={handleShowParticipants}
        ></i>
        {showParticipant && (
          <div className="bg-slate-500 px-4 w-60 rounded-md py-6 absolute top-12 right-1 overflow-y-scroll flex gap-6 flex-wrap ">
            {clients.map((client) => (
              <ClientBox key={client.socketId} username={client.userName} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorAside;
