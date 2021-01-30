"use strict";

function sendMessage() {
  if (messageInput.value == "") return;
  socket.emit("message", messageInput.value);
  messageInput.value = "";
}

function drawMessage(msg, id, name) {
  if (id == socket.id) {
    messages.innerHTML += "<li class='messageMy'>" + msg + "</li>";
  } else {
    messages.innerHTML +=
      "<li class='messageYour'><div class='messageName'>" +
      name +
      "</div>" +
      msg +
      "</li>";
  }
}

function initMessages (innerHTML) {
  var containerMessages = document.querySelector("#containerMessages");

  containerMessages.innerHTML = innerHTML;
  containerMessages.classList = "";
  
  var messageInput = document.querySelector("#messageInput");
  var messages = document.querySelector("#messages");

  messageInput.addEventListener("keydown", function (e) {
    if (e.which == 13) {
      sendMessage();
    }
  });
}

var socket = io();

socket.on("init", initMessages);
socket.on("message", drawMessage);
