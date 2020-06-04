
const fs = require('fs');

const server = require('http').createServer(handler);
const io = require('socket.io')(server)

server.listen(80);


// -------------------------------------------------
// Serving Client Code

function handler(req, res) {
  fs.readFile(__dirname + '/index.html',
  (err, data) => {
    if (err) {
      res.writeHead(500);
      return res.end("error loading index.html");
    }

    res.writeHead(200);
    res.end(data);
  });
}

// -------------------------------------------------






io.on('connection', (socket) => {
  console.log("User has connected");
  socket.nickname = socket.id

  socket.on('create-nickname', (nickname) => {
    socket.nickname = nickname
  });

  socket.on('join-room', (room_id) => {
    socket.join(room_id, () => {
      io.to(room_id).emit("new-user", 'hello', socket.nickname)
    });
  });


  socket.on('disconnect', () => {
    console.log("User has disconnected");
  })
});
