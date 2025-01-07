/* BACKEND */

import http from "http";
import  { WebSocketServer } from "ws";
import express from "express";


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
const server = http.createServer(app);
const wss = new WebSocketServer({ server });


const sockets = [];

wss.on("connection", (serverSocket) => { 
  sockets.push(serverSocket);
  serverSocket["nickname"] = "Anonymous"    // nickname의 초기값 설정
  console.log("✅ Connected to Browser");

  serverSocket.on("close", () => console.log("❌ Disconnected from the Browser"))
  // WebSocket에서 데이터를 기본적으로 binary buffer 형태로 전달(문자열 변환 필요)
  serverSocket.on("message", (msg) => {
    const message = JSON.parse(msg)
    switch(message.type) {
      case "nickname":
        serverSocket["nickname"] = message.payload;
        break;
      case "new_msg":
        sockets.forEach((aSocket) => aSocket.send(
          `${serverSocket.nickname}: ${message.payload}`
        ));
        break;
    }
  });
  // serverSocket.send("hello, socket");   // socket.data, send data from BACKEND to FRONTEND
});


server.listen(3000, handleListen);