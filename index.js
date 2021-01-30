// Chat_Papum v0.0.2

const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;

// Remover quando possível
const initHTML = '<div class="messageHUD" id="messageHeader">Chat Papum:</div> <ul id="messages"></ul> <div class="messageHUD" id="messageInputs"> <input id="messageInput" autocomplete="off" placeholder="Digite uma mensagem" /> <button id="messageSend" onclick="sendMessage();"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#bdd7ff" width="25px" height="25px" > <path d="M0 0h24v24H0z" fill="none" /> <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /> </svg> </button> </div>';

io.on("connection", async (socket) => {
  console.log(`Usuario (${socket.id}) se conectou`);

  socket.join(socket.id);

  io.to(socket.id).emit("init", initHTML);

  socket.on("disconnect", () => {
    console.log(`Usuario (${socket.id}) se desconectou`);
  });

  socket.on("message", (msg) => {
    io.emit("message", msg, socket.id, "Bruna");

    console.log(`Mensagem de ${socket.id}: ${msg}`);
  });
});


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/front/html/index.html");
});

app.get("/front/*", (req, res) => {
  res.sendFile(__dirname + req.url);
});

http.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});
