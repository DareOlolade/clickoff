const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const router = require("./routes/authRoutes");
const roomHandler = require("./socket/roomHandler")

dotenv.config();

const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

connectDB();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/auth", router);


io.on("connection", (socket) => {
  console.log("a user connected");
  roomHandler(io, socket);
  
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
server.listen(port, console.log(`Listening on: ${port}`));
