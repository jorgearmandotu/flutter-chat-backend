const express = require('express');
const path = require('path');
require('dotenv').config();


//DB config
require('./database/config').dbConection();

//app de express
const app = express();

//lectura y parseo del body
app.use( express.json() );

//node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

//path publico
const publicPath = path.resolve( __dirname, 'public');
app.use( express.static(publicPath));

//Mis rutas
app.use('/api/login', require('./routes/auth'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/mensajes', require('./routes/mensajes'));

server.listen( process.env.PORT, (err) => {
    if( err ) throw new Error(err);
    console.log('servidor corriendo en puerto = ', process.env.PORT );
});