const server = require('server')
const lobby = new (require('./lib/lobbystore'))()
const { get, post, socket, error } = server.router
const { status, header } = server.reply
const PORT = process.env.PORT || 3000

const cors = [
  ctx => header('Access-Control-Allow-Origin', '*'),
  ctx => header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'),
  ctx => ctx.method.toLowerCase() === 'options' ? 200 : false
]

// clean lobbystore
setInterval(() => {
  lobby.lobbies.forEach(l => {
    l.players.forEach(p => {
      if ((new Date() - p.updated) > 10) {
        l.removePlayer(p.name)
      }
    })
  })
}, 10000)
// Launch server with options and a couple of routes
server({ port: PORT, public: './web/dist', security: { csrf: false } }, cors, [
  get('/lobby', ctx => lobby.lobbies),
  post('/lobby', ctx => {
    console.log(ctx.data)
    const id = lobby.getFreeId()
    lobby.addLobby(id)
    return { id }
  }),
  // Receive a message from a single socket
  socket('message', ctx => {
    // Send the message to every socket
    ctx.io.emit('message', ctx.data)
  }),
  socket('connect', ctx => {
    console.log('client connected', Object.keys(ctx.io.sockets.sockets))
    ctx.io.emit('count', {msg: 'HI U', count: ctx.io.sockets.sockets.length})
  }),
  socket('joinLobby', ctx => {
    const {id, playerId, name: playerName} = ctx.data
    let l = lobby.getLobby(id)
    console.log(l)
    if (!l) { // in case a non-existant lobby was opened via web link
      console.log('creating lobby', l)
      lobby.addLobby(id)
      l = lobby.getLobby(id)
    }
    l.addPlayer(ctx.socket.id, playerId, playerName)
    const players = l.players
    console.log(players)
    l.players.map(p => p.socketId).forEach(s => ctx.io.sockets.sockets[s].emit('lobbyUpdate', players))
  }),
  error(ctx => status(500).send(ctx.error.message))
])
  .then(() => console.log(`Server started at http://localhost:${PORT}`))
