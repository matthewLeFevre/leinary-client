import React, { useContext } from "react";
// import socketio from "socket.io-client";
// import { SOCKET_URL } from "./config";

// export const socket = socketio.connect(SOCKET_URL);
// export const SocketContext = React.createContext();

export const ProjectContext = React.createContext();
export const ProjectsContext = React.createContext();
export const UserContext = React.createContext();

export const useProjectCTX = () => {
  return useContext(ProjectContext);
};
export const useProjectsCTX = () => {
  return useContext(ProjectsContext);
};
export const useUserCTX = () => {
  return useContext(UserContext);
};
