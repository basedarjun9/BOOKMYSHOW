import app from "./app";
import {config} from "./config/config"
import connectDB from "./config/db"
import cookieParser from "cookie-parser";
import "./config/redis"
import http from 'http'
import { Server } from "socket.io";
import { registerSocketHandlers } from "./socket/sockethandlers";

app.use(cookieParser());

const startServer = async () => {
  const port = config.port;

 await connectDB()



 const httpServer = http.createServer(app)

 const io = new Server(httpServer,{
  cors:{
    origin:"http://localhost:5173",
    methods:["GET","POST"],
    credentials: true
  }
 })

 io.on("connection", (socket)=>{
  console.log("✅User Connected:", socket.id)
  registerSocketHandlers(socket,io)

  socket.on("disconnect",(reason)=>{
    console.log("❌User disconnected:", socket.id,"Reason", reason)
  })
 })

  httpServer.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
};

startServer();