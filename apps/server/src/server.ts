import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

import { Hono } from "hono";
import { createServer } from "http";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";

interface Message {
  id: string;
  userId: string;
  content: string;
}

const app = new Hono();

// HTTP route
app.get("/", (c) => c.text("Hono + Socket.IO Chat Server"));

// Create Node HTTP server
const httpServer = createServer(async (req, res) => {
  try {
    // Use Hono fetch adapter
    const response = await app.fetch(req as any);
    res.writeHead(response.status, Object.fromEntries(response.headers));
    const buffer = Buffer.from(await response.arrayBuffer());
    res.end(buffer);
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
});

// Attach Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

// Socket.IO events
// --- Inside io.on("connection") ---
let connectedUsers = 0;
let totalMessagesSent = 0;
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  connectedUsers++;

  const room = "main"; // default room
  socket.join(room);

  // Broadcast join message to the room (excluding self)
  socket.to(room).emit("serverMessage", {
    id: uuidv4(),
    userId: "server",
    content: `User ${socket.id} joined the chat`,
  } as Message);

  socket.on("sendMessage", (msg: { content: string }) => {
    const message: Message = {
      id: uuidv4(),
      userId: socket.id,
      content: msg.content,
    };
    totalMessagesSent++;

    // Emit to everyone in the room
    io.to(room).emit("receiveMessage", message);
  });

  socket.on("deleteMessage", (messageId: string) => {
    io.to(room).emit("deleteMessage", messageId);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    connectedUsers--;
    socket.to(room).emit("serverMessage", {
      id: uuidv4(),
      userId: "server",
      content: `User ${socket.id} left the chat`,
    } as Message);
  });
});

const PORT = Number(process.env.PORT_SERVER) || 8000;
httpServer.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
