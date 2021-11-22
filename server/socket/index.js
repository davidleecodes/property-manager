const jwt = require("jsonwebtoken");
const socket = require("socket.io");
const socketCookieParser = require("socket.io-cookie-parser");

exports.appSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  io.use(socketCookieParser());

  // jwt authentication
  io.use((socket, next) => {
    const requestedToken = socket.request.cookies["token"];
    if (!requestedToken) {
      return next(new Error(`There is no token Found!`));
    } else {
      try {
        const accessToken = jwt.verify(requestedToken, process.env.JWT_SECRET);
        return next();
      } catch (error) {
        console.log(error);
      }
    }
  });

  io.on("connection", (socket) => {
    console.log("User", socket.id, "Connected");

    socket.on("notification", ({ type, sender, recipient }) => {
      socket.broadcast.emit("notification", {
        type,
        from: sender,
        to: recipient,
      });
    });

    socket.on("clearNotification", ({ type, sender, recipient }) => {
      socket.emit("notification", {
        type,
        from: sender,
        to: recipient,
      });
    });

    socket.on("message", ({ sender, recipient }) => {
      socket.broadcast.emit("message", {
        from: sender,
        to: recipient,
      });
    });
  });
};
