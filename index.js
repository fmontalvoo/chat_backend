require('dotenv').config()

const express = require('express');
const path = require('path')

const { connection } = require('./database/config');
connection();

const public = path.resolve(__dirname, 'public')
const port = process.env.PORT;

const app = express();

// Serializacion
app.use(express.json());

app.use(express.static(public));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));

// Socket server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket')

server.listen(port, (error) => {
    if (error) throw new Error(error);

    console.log(`Servidor ejecutandose en el puerto ${port}`);
})