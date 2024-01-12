var express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "20mb" }));
app.use(cors());
const dotenv = require("dotenv");
dotenv.config();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./swaggerOptions");

const port = 3000;

const {
  usersRoutes,
  adsRoutes,
  companyfavouritesRoutes,
  chatchannelsRoutes,
  ordersRoutes,
  quotesRoutes,
} = require("./routes");
const fbAuth = require("./util/fbAuth");

const specs = swaggerJsdoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api/quotes", fbAuth, quotesRoutes);
app.use("/api/ads", fbAuth, adsRoutes);
app.use("/api/users", fbAuth, usersRoutes);
app.use("/api/companyfavourites", fbAuth, companyfavouritesRoutes);
app.use("/api/chats", fbAuth, chatchannelsRoutes);
app.use("/api/orders", fbAuth, ordersRoutes);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get an example
 *     description: Retrieve a sample response.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { message: 'Hello, World!' }
 */

app.get("/", (req, res) => {
  res.send("Welcome to barenemt node js");
});

io.on("connection", (socket) => {
  // ...
  socket.on("login", () => {
    // console.log('welcome ',userName, "let log you in")
  });

  socket.on("joinRoom", ({ InboxId }) => {
    socket.join(InboxId);
  });

  socket.on("chat", (msg, InboxId) => {
    const socketsInRoom = io.sockets.adapter.rooms.get(InboxId);

    if (socketsInRoom && socketsInRoom.size > 1) {
      // At least one other socket is connected, emit the chat message
      io.to(InboxId).emit("chat", msg);
    } else {
      if (msg.recipient !== undefined && msg.Message !== null) {
        //  const path = __dirname + '/controllers/templates/chat.html'
        //  mailOperation.sendEmail(path, msg, 'Chat Notification')
      }
      // No other sockets in the room, send notification
      // mailOperation.notification(body);
      // send email notification
    }
  });

  socket.on("disconnect", () => {
    // console.log('goodbye ')
  });
});

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

httpServer.listen(port);
