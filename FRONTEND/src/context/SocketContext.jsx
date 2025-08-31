import React, { createContext, useEffect } from 'react';
import io from "socket.io-client";

export const socketDataContext = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`);

const SocketContext = ({ children }) => {

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected to server");
        });
        socket.on("disconnect", () => {
            console.log("Disconnected from server");
        });
    }, []);

  return (
    <>
        <socketDataContext.Provider value={{ socket }}>
            {children}
        </socketDataContext.Provider>
    </>
  )
}

export default SocketContext;
