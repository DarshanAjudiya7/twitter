import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port: Number(port) });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log(`[Socket] User connected: ${socket.id}`);

    // Join a specific channel
    socket.on("join_channel", (channelId) => {
      socket.join(channelId);
      console.log(`[Socket] ${socket.id} joined channel ${channelId}`);
    });

    // Leave a specific channel
    socket.on("leave_channel", (channelId) => {
      socket.leave(channelId);
      console.log(`[Socket] ${socket.id} left channel ${channelId}`);
    });

    // Handle new message
    socket.on("send_message", (messageData) => {
      console.log(`[Socket] New message in ${messageData.channelId}`);
      // Broadcast to all clients in the channel
      io.to(messageData.channelId).emit("new_message", messageData);
    });

    // Typing indicators
    socket.on("typing", (data) => {
      socket.to(data.channelId).emit("user_typing", data);
    });

    socket.on("disconnect", () => {
      console.log(`[Socket] User disconnected: ${socket.id}`);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
