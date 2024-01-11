const { comprobarJWT } = require('../helpers/jwt');
const{ io } = require('../index');
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');

//mensajes de sockets 
io.on('connection', client => {
    
    const[ valido, uid ] = comprobarJWT(client.handshake.headers['x-token']);
    

    //VALIDAR SI CLIENTE ESTA AUTENTICADO
    if( !valido ) { 
        return client.disconnect(); 
    }

    //cliente autenticado
    usuarioConectado(uid);

    // Ingresar al usuario a una sala en particular
    // Sala golabal, client.id, uid_mongo
    client.join(uid);

    //Escuchr del cliente el mensaje personal
    client.on('mensaje-personal', async( payload ) => {
        
        await grabarMensaje( payload );
        io.to( payload.para ).emit( 'mensaje-personal', payload);
    });
  
    client.on('disconnect', () => {
        usuarioDesconectado( uid );
    });
  
/*     client.on('mensaje', (payload) => {
        console.log('mensaje', payload);
  
        io.emit('mensaje', {admin: 'nuevo msaj'});//a todos los clientes conectados
        client.emit('mensaje', {admin: 'solo a cliente'});//solo al cliente que escucha
    });
 */  
  });