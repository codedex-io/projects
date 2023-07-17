// imports required for server
import { uniqueNamesGenerator, colors, names } from "unique-names-generator";
import express from "express";
import http from "http";

// import the socket.io library

// initializing the servers: HTTP as well as Web Socket

// create the chat history array for storing messages

// listen for new web socket connections
io.on("connection", function callback(socket) {
  // generate a random, unique username

  // send the chat history to the client

  // listen for new messages from the client
  socket.on("post-message", function receiveMessages(data) {
    // update the chat history with the message and username

    // send the updated chat history to all clients
  });

  // listen for disconnects and log them
});

// Boilerplate code as well as Bonus section
// HTTP server setup to serve the page assets
app.use(express.static(process.cwd() + "/frontend"));

// HTTP server setup to serve the page at / route
app.get("/", (req, res) => {
  return res.sendFile(process.cwd() + "/frontend/index.html");
});

// start the HTTP server to serve the page
server.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});

// helper functions
// get all messages in the order they were sent
function getAllMessages() {
  return Array.from(chatHistory).reverse();
}

// generate a unique username for each user
function getUniqueUsername() {
  return uniqueNamesGenerator({
    dictionaries: [names, colors],
    length: 2,
    style: "capital",
    separator: " ",
  });
}