import express from "express";
import dotenv from "dotenv";
import { Server, Socket } from "socket.io";
import { createServer } from "http";

// Config
dotenv.config();

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Node.js!");
});

// Socket Setup
io.on("connection", (socket:Socket) => {
  console.log("User Is Connected", socket.id);

  // Example: Listen to a 'message' event
  socket.on("message",(data) => {
    console.log("Recieved Message On the server==> ",data)

     io.emit("message",data)
  })

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
  });
});

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
