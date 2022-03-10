const { comprobarJWT } = require('../helpers/jwt');
const{ io } = require('../index');
const { usuarioConectado, usuarioDesconectado } = require('../controllers/socket');

//mensajes de sockets 
io.on('connection', client => {
    console.log('cliente conectado');

    //console.log(client.handshake.headers);
    const[ valido, uid ] = comprobarJWT(client.handshake.headers['x-token']);

    //VALIDAR SI CLIENTE ESTA AUTENTICADO
    if( !valido ) {return client.disconnect(); }

    //cliente autenticado
    usuarioConectado(uid);
    console.log('cliente conectado'+uid);
  
    client.on('disconnect', () => {
        usuarioDesconectado(uid);
        console.log('cliente desconectado'+uid);
    });
  
/*     client.on('mensaje', (payload) => {
        console.log('mensaje', payload);
  
        io.emit('mensaje', {admin: 'nuevo msaj'});//a todos los clientes conectados
        client.emit('mensaje', {admin: 'solo a cliente'});//solo al cliente que escucha
    });
 */  
  });