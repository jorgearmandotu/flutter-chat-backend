const usuario = require('../models/usuario');
const Usuario = require('../models/usuario');

const usuarioConectado = async ( uid = '' ) => {

    const usuario = await Usuario.findById( uid );
    usuario.online = true;
    await usuario.save();
    return usuario;
    /*const update = {online : true};
    await Usuario.findByIdAndUpdate(uid, update)
    return usuario;*/
}

const usuarioDesconectado = async( uid = '' ) => {
    /*const usuario = await Usuario.findById( uid );
    usuario.online = false;
    await usuario.save();*/
    await Usuario.findByIdAndUpdate(uid, {online : false} )
    return usuario;
}

module.exports = {
    usuarioConectado,
    usuarioDesconectado,
}