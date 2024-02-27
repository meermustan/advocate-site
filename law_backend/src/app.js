import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { port, serverIP } from "./config/index.js";
import loader from "./loaders/index.js";
import { sendNotification } from "./api/controllers/notification.js";
import Bugsnag from '@bugsnag/js';
import BugsnagPluginExpress from "@bugsnag/plugin-express";

Bugsnag.start({
  apiKey: process.env.BUGSNAG_API_KEY,
  plugins: [BugsnagPluginExpress]
})


const app = express();
var middleware = Bugsnag.getPlugin('express');
app.use(middleware.errorHandler);
app.use(middleware.requestHandler);
loader(app);

const httpServer = createServer(app);
const socketIO = new Server(httpServer, { cors: { origin: "*" } });
const userSockets = [];

socketIO.on("connection", (socket) => {
  socket.on("user-connected", (userID) => {
    console.log(`user just connected!`, userID);
    userSockets.push({ userID, socket, socketID: socket.id });
  });

  socket.on("disconnect", () => {
    const index = userSockets.findIndex((skt) => skt.socketID === socket.id);
    console.log(`user disconnected!`, userSockets[index]?.userID);
    if (index !== -1) {
      userSockets.splice(index, 1);
    }
  });
});

const emitMessage = (receiver, message, chatId, notification, unreadType) => {
  const userSkt = userSockets.find(
    (entry) => entry.userID === String(receiver)
  );
  if (userSkt) {
    userSkt.socket.emit("message", { message, chatId, unreadType });
  } else {
    sendNotification(notification, false);
    console.log("User not connected");
  }
};

const emitNotification = (notification) => {
  const userSkt = userSockets.find(
    (entry) => entry.userID === String(notification.user)
  );
  if (userSkt) {
    userSkt.socket.emit("notification", notification);
  } else {
    console.log("User not connected");
  }
};

httpServer.listen(port, (err) => {
  if (err) {
    console.log(err);
    return process.exit(1);
  }
  console.log(`Server is running on ${serverIP}:${port}`);
});


export default app;
export { emitNotification, emitMessage };
