const { response } = require( 'express' );
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const res = require('express/lib/response');


const crearUsuario = async (req, res = response ) => {

    const {email, password} = req.body;
    try {

        const existeEmail = await Usuario.findOne({ email });
        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const usuario = new Usuario(req.body);

        //encryptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();

        //crear jwt
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'contacte al administrador',
        });
    }

    
}

const login = async (req, res = response ) => {
    const { email, password } = req.body;

    //console.log(email);
    //console.log(password);
    //console.log(req);
    try {
        const usuarioDB = await Usuario.findOne({ email });
        if(!usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        //validar password
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña no es correcta'
            });
        }

        //generar JWT
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok:true,
            usuario: usuarioDB,
            token
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contacte al administrador'
        })
    }
    /*return res.json({
        ok:true,
        msg: 'login'
    })*/
}

const renewtoken = async (req, res = response) => {

    const uid = req.uid;

    //generar nuevo JWT
    const token = await generarJWT(uid);
    
    const usuario = await Usuario.findById(uid);

    res.json({
        ok:true,
        usuario: usuario,
        token: token
    })
}

module.exports = {
    crearUsuario,
    login,
    renewtoken,
}