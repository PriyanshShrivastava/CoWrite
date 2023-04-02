import { io } from "socket.io-client";

export const initSocket = async () => {
  const options = {
    "force new connection": true,
    reconnectionAttempt: "5",
    timeout: 10000,
    transports: ["websocket"],
  };

  //   socket client instance
  return io(`${import.meta.env.VITE_BACKEND_URL}`, options);
};
