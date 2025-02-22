import { io } from "socket.io-client";

// Replace with your backend URL
const SOCKET_SERVER_URL = "https://job-task1-server.onrender.com";

const socket = io(SOCKET_SERVER_URL, {
  transports: ["websocket"], // Ensure it uses WebSockets
  withCredentials: true, // Allow credentials if needed
});

export default socket;
