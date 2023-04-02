import React, { useEffect, useRef, useState } from "react";
import EditorAside from "../components/EditorAside";
import MainEditor from "../components/MainEditor";
import { initSocket } from "../socketSetup";
// importing actions
import Actions from "../EventActions";
import { useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate, useParams, Navigate } from "react-router-dom";

const EditorPage = () => {
  const location = useLocation();
  const reactNavigator = useNavigate();
  const { id } = useParams();
  const socketRef = useRef(null);

  useEffect(() => {
    const initialize = async () => {
      socketRef.current = await initSocket();

      socketRef.current.on("connect_error", (err) => handleError(err));
      socketRef.current.on("connect_failed", (err) => handleError(err));

      // emitting join event
      const handleError = (err) => {
        console.error("Socket error", err);
        toast.error("Connection failed, redirecting..");
        reactNavigator("/");
      };

      socketRef.current.emit(Actions.JOIN, {
        id,
        userName: location.state?.userName,
      });
    };

    initialize();
  }, []);
  const [clients, setClients] = useState([
    { socketId: 1, userName: "Priyansh Shrivastava" },
    { socketId: 2, userName: "Aditya Gupta" },
  ]);

  if (!location.state) {
    return <Navigate to="/" />;
  }
  return (
    <div className="flex flex-col md:flex-row h-screen w-full relative">
      <EditorAside clients={clients} />
      <MainEditor />
    </div>
  );
};

export default EditorPage;
