import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const RoomForm = () => {
  const [roomID, setRoomId] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const createRoom = (event) => {
    event.preventDefault();
    const newRoom = uuidv4();
    setRoomId(newRoom);
    toast.success("New room id generated");
  };

  const handleJoin = () => {
    if (!roomID || !userName) {
      toast.error("Room ID and UserName needed ");
      return;
    }

    //Implementing navigation
    navigate(`/editor/${roomID}`, {
      state: {
        userName,
      },
    });
  };

  const handleEnter = (event) => {
    if (event.code == "Enter") {
      handleJoin();
    }
  };

  return (
    <div className="px-8 py-4 rounded-md flex flex-col space-y-4 bg-slate-600 text-white w-10/12 md:1/2 lg:w-1/3  transition-all duration-200">
      <div
        className="w-full flex justify-start space-x-2 items-center"
        id="logo-box"
      >
        <i className="fa-solid fa-dna text-3xl text-green-300"></i>
        <h1 className="text-4xl font-semibold text-white font-josefin mt-2">
          CoWrite
        </h1>
      </div>
      <p>Paste room id below:</p>
      <div className="flex flex-col space-y-4 w-full">
        <input
          type="text"
          placeholder="Room Id"
          name="roomId"
          className="px-3 md:px-6 py-2 rounded-md shadow-sm font-josefin text-black hover:outline-none hover:ring-2 ring-green-300 active:outline-none active:ring-2 focus:outline-none focus:ring-2 text-md md:text-lg"
          value={roomID}
          onChange={(event) => {
            const value = event.target.value;
            setRoomId(value);
          }}
          onKeyDown={handleEnter}
        />
        <input
          type="text"
          placeholder="UserName"
          name="username"
          className="px-3 md:px-6 py-2 rounded-md shadow-sm font-josefin text-black hover:outline-none hover:ring-2 ring-green-300 active:outline-none active:ring-2 focus:outline-none focus:ring-2 text-md md:text-lg"
          value={userName}
          onChange={(event) => {
            const value = event.target.value;
            setUserName(value);
          }}
          onKeyDown={handleEnter}
        />
      </div>
      <div className="w-full text-right">
        <button
          className="w-1/3 px-4 py-2 bg-teal-400 rounded-md shadow-md font-josefin hover:bg-teal-500 font-semibold"
          onClick={handleJoin}
        >
          {" "}
          Join
        </button>
      </div>
      <p className="font-josefin text-sm md:text-lg text-center md:text-right">
        {" "}
        Do not have a room id?{" "}
        <span
          className="text-teal-400 underline underline-offset-2 cursor-pointer text-md md:text-lg"
          onClick={createRoom}
        >
          create room
        </span>
      </p>
    </div>
  );
};

export default RoomForm;
