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
    console.log(`New Websocket Connections ${socket.id}`);
    socket.on("joinroom", (room) => {
      console.log("Join room", room);
      socket.join(room);
    });

    socket.on("chatMessage",(data) => {
      io.to(data.Room).emit("messages",data);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
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

// export const startServer = async() => {
//   const app = next({ dev, hostname, port });
//   const handler = app.getRequestHandler();
  
//   await app.prepare();

//   const httpServer = createServer(handler);
//   const io = new Server(httpServer);

//   io.on("connection", (socket) => {
//     console.log(`New Websocket Connections ${socket.id}`);
//     socket.on("joinroom", (room) => {
//       console.log("Join room", room);
//       socket.join(room);
//     });

//     socket.on("disconnect", () => {
//       console.log("user disconnected");
//     });
//   });

//   httpServer
//     .once("error", (err) => {
//       console.error(err);
//       process.exit(1);
//     })
//     .listen(port, () => {
//       console.log(`> Ready on http://${hostname}:${port}`);
//     });

//   return io;  
// }

// startServer();