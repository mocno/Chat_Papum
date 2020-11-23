
var socket = io();

document.getElementById('containerMessages').innerHTML = '<div class="messageHUD" id="messageHeader">Chat Papum:</div> <ul id="messages"></ul> <div class="messageHUD" id="messageInputs"> <input id="messageText" autocomplete="off" placeholder="Digite uma mensagem" /> <button id="messageSend" onclick="sendMessage();"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#bdd7ff" width="25px" height="25px"> <path d="M0 0h24v24H0z" fill="none" /> <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /> </svg> </button> </div>'

messageText = document.getElementById("messageText");
messages = document.getElementById("messages");

messageText.addEventListener("keydown", function(e) {
    if (e.which == 13) {sendMessage();}
})

function sendMessage() {
    if (messageText.value == "") return;
    socket.emit("message", messageText.value);
    messageText.value = "";
}

socket.on("message", function (msg, id, name) {
    if (id == socket.id) {
    messages.innerHTML +=
        "<li class='messageMy'>" + msg + "</li>";
    } else {
    messages.innerHTML +=
        "<li class='messageYour'><div class='messageName'>" + name + "</div>" + msg + "</li>";
    }
});