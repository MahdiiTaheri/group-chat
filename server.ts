import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.broadcast.emit("serverMessage", {
      userId: "server",
      content: `A new user connected to session with ID: ${socket.id}`,
    });

    socket.on("sendMessage", (message) => {
      io.emit("receiveMessage", {
        userId: socket.id,
        content: message.content,
      });
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);

      io.emit("serverMessage", {
        userId: "server",
        content: `User with ID: ${socket.id} has disconnected.`,
      });
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
