/* FRONTEND */
const msgList = document.querySelector("ul");
const nicknameForm = document.querySelector("#nickname");
const chatForm = document.querySelector("#chat");
const appSocket = new WebSocket(`ws://${window.location.host}`);


function makeMsg(type, payload) {
  const msg = {type, payload};
  return JSON.stringify(msg);
}

appSocket.addEventListener("open", () => {
  console.log("✅ Connected to Server ");
});

appSocket.addEventListener("message", (msg) => {
  const li = document.createElement("li");
  li.innerText = msg.data;
  msgList.append(li);
  // console.log("💬 New message: ", msg.data);
});

appSocket.addEventListener("close", () => {
  console.log("❌ Disconnected from Server");
});

// setTimeout(() => {
//   appSocket.send("hello from the browser")
// }, 10000)


function handleNicknameSubmit(event) {
  event.preventDefault();
  const input = nicknameForm.querySelector("input");
  appSocket.send(makeMsg("nickname", input.value));
  input.value = "";
}

function handleChatSubmit(event) {
  event.preventDefault();
  const input = chatForm.querySelector("textarea");
  appSocket.send(makeMsg("new_msg", input.value));
  input.value = "";   // clear textarea space
}

nicknameForm.addEventListener("submit", handleNicknameSubmit);
chatForm.addEventListener("submit", handleChatSubmit);