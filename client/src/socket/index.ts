import { io, ManagerOptions, SocketOptions } from "socket.io-client";

export const socketInit = () => {
  const options: Partial<ManagerOptions & SocketOptions> = {
    forceNew: true,
    reconnectionAttempts: Infinity,
    timeout: 10000,
    transports: ["websocket"],
  };

  return io(import.meta.env.VITE_API_URL, options);
};
