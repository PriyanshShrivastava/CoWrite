import React, { useState } from "react";
import EditorAside from "../components/EditorAside";

const EditorPage = () => {
  const [clients, setClients] = useState([
    { socketId: 1, userName: "Priyansh Shrivastava" },
    { socketId: 2, userName: "Aditya Gupta" },
  ]);
  return (
    <div className="flex h-screen w-full relative">
      <EditorAside clients={clients} />
    </div>
  );
};

export default EditorPage;
