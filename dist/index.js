"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
// Config
dotenv_1.default.config();
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
    },
});
app.get("/", (req, res) => {
    res.send("Hello, TypeScript with Node.js!");
});
// Socket Setup
io.on("connection", (socket) => {
    console.log("User Is Connected", socket.id);
    // Example: Listen to a 'message' event
    socket.on("message", (data) => {
        console.log("Recieved Message On the server==> ", data);
        io.emit("message", data);
    });
    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);
    });
});
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
