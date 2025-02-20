import { io } from "socket.io-client";

// Replace with your backend URL
const SOCKET_SERVER_URL = "http://localhost:5000";

const socket = io(SOCKET_SERVER_URL, {
  transports: ["websocket"], // Ensure it uses WebSockets
  withCredentials: true, // Allow credentials if needed
});

export default socket;
