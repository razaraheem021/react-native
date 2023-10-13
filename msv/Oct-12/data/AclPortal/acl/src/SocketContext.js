import React, { createContext, useEffect, useState } from "react";
import io from "socket.io-client";

// Create a new Socket.IO instance
const socket = io("http://localhost:5050");

// Create a context for the Socket.IO connection and notifications
export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Listen for incoming notifications from the server
    socket.on("notification", (notification) => {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        notification,
      ]);
    });

    return () => {
      // Clean up the event listener when the component unmounts
      socket.off("notification");
    };
  }, []);

  return (
    <SocketContext.Provider value={notifications}>
      {children}
    </SocketContext.Provider>
  );
};
