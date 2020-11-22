// Chat_Papum v0.0.1

const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log(`Usuario (${socket.id}) se conectou`);

  socket.on("disconnect", () => {
    console.log(`Usuario (${socket.id}) se desconectou`);
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);

    console.log(`mensagem (${socket.id}): ${msg}`);
  });
});

http.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});
