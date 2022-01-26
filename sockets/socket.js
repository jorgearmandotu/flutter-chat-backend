const{ io } = require('../index');

//mensajes de sockets 
io.on('connection', client => {
    console.log('cliente conectado');
  
    client.on('disconnect', () => {
        console.log('cliente desconectado');
    });
  
/*     client.on('mensaje', (payload) => {
        console.log('mensaje', payload);
  
        io.emit('mensaje', {admin: 'nuevo msaj'});//a todos los clientes conectados
        client.emit('mensaje', {admin: 'solo a cliente'});//solo al cliente que escucha
    });
 */  
  });