import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import cookieParser from "cookie-parser";
import path from "path";
// connection to database
import { sequelize, connectDB } from "./config/db.js";
import { User } from "./model/userModel.js";
import { Message } from "./model/messageModel.js";

// import routes
import userRoute from "./route/userRoute.js";
import messageRoute from "./route/messageRoute.js";

// Sync the database (create tables if they don't exist)
connectDB()
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((error) => {
    console.error("Error creating database & tables:", error);
  });

const app = express();
const server = http.createServer(app);

// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join("public"))); // serve static files from public directory

// set view engine

// routes
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
  console.log("Serving signup page...");
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.use("/user", userRoute);
app.use("/messages", messageRoute);

// socket.io setup
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Socket 

io.on('connection', (socket) => {
    console.log('Connected...', socket.id)
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id)
    })
})

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
