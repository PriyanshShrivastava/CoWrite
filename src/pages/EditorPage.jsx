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
  const [clients, setClients] = useState([]);

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

      // listening for joined socket event
      socketRef?.current.on(
        Actions.JOINED,
        ({ allClients, userName, userSocketId }) => {
          // checking for current userName
          console.log(allClients);

          if (userName !== location.state?.userName) {
            toast.success(`Welcome ${userName} to the room`);
          }
          setClients(allClients);
        }
      );

      //listening for disconnection
      socketRef?.current.on(Actions.DISCONNECTED, ({ userName, socketId }) => {
        // checking for current userName
        toast(`${userName} left the room`, {
          icon: "😢",
        });
        setClients(
          (prev) => {
            return prev.filter((client) => client.userSocketId !== socketId);
          },
          () => [console.log(clients)]
        );
      });
    };

    initialize();

    return () => {
      socketRef.current.disconnect();
      // socket io event unsubscribe
      socketRef.current.off(Actions.JOINED);
      socketRef.current.off(Actions.DISCONNECTED);
    };
  }, []);

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
