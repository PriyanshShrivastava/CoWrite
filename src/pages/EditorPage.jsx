import React, { useEffect, useRef, useState } from "react";
import EditorAside from "../components/EditorAside";
import MainEditor from "../components/MainEditor";
import { initSocket } from "../socketSetup";

const EditorPage = () => {
  const socketRef = useRef(null);

  useEffect(() => {
    const initialize = async () => {
      socketRef.current = await initSocket();
    };
  }, []);
  const [clients, setClients] = useState([
    { socketId: 1, userName: "Priyansh Shrivastava" },
    { socketId: 2, userName: "Aditya Gupta" },
  ]);
  return (
    <div className="flex flex-col md:flex-row h-screen w-full relative">
      <EditorAside clients={clients} />
      <MainEditor />
    </div>
  );
};

export default EditorPage;
