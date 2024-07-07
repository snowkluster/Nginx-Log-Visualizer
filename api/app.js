import express from "express";
import mongoose from "mongoose"
import helmet from "helmet";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from 'node:http';

const port = 3001;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://admin.localhost",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

mongoose.set('strictQuery', true);
const conn = mongoose.connection;

main().catch(err => console.log(err));
main().then(() => {
  console.log("mongo connection established");
});

const logSchema = new mongoose.Schema({
  remote: String,
  host: String,
  user: String,
  method: String,
  path: String,
  code: String,
  size: String,
  referer: String,
  agent: String,
  time: Date
});

const Log = mongoose.model('logs', logSchema);

async function main() {
    await mongoose.connect('mongodb://mongodb:27017/admin');
}

conn.on('error', console.error.bind(console, 'connection error:'));

app.use(helmet());
app.use(cors());

io.on("connection", (socket) => {
  console.log("Socket connected");

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });

  socket.on("getLogs", async () => {
    try {
      const logs = await Log.find();
      io.emit("logs", logs);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  });
});

server.listen(port, () => {
  console.log(`server running on ${port}`);
});
