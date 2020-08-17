const express = require('express');
const projectRouter = require('./data/projects/projectRouter')
const actionRouter = require('./data/actions/actionRouter');

const server = express()
server.use(express.json())

server.use('/api/projects', projectRouter)
server.use('/api/actions', actionRouter)

server.get('/', (req, res) => {
   res.send(`<h1>Welcome to node-api-challenge</h1>`)
});

function errorHandler(err, req, res, next) {
   res.status(err.status || 500).json({
      message: err.message || "Internal Server Error"
   })
}

server.use(errorHandler)

module.exports = server;