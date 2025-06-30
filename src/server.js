/* BACKEND */

import http from "http";
import express from "express";
import {Server} from "socket.io";


const app = express();

app.set('view engine', "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));   // Catch-all URL

const handleListen = () => console.log("Listening on http://localhost:3000");
// app.listen(3000, handleListen);

// http server와 webSocket server를 생성(http server는 필요에 따라 생성)
// 같은 포트에서 두 개의 서버를 처리(http, ws(http 위에서 동작, http에서 동작하는 기능을 사용하기 위함))
const httpServer = http.createServer(app);
// const wss = new WebSocketServer({ server });
const wsServer = new Server(httpServer);

wsServer.on("connection", (socket) => {
  socket.on("enter_room", (msg) => console.log(msg));
})


httpServer.listen(3000, handleListen);