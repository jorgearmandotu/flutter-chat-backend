/*
    path: api/login
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { crearUsuario, login, renewtoken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email no es valido').isEmail().normalizeEmail(),
    check('password', 'La contraseña debe ser de minimo 6 caracteres').isLength({min: 6}),
    validarCampos
], crearUsuario) ;

router.post('/', [
    check('email', 'El email no es valido').isEmail().normalizeEmail(),
    check('password', 'La contraseña no es valida').isLength({min: 6}),
    validarCampos
], login);

router.get('/renew', validarJWT, renewtoken);

module.exports = router;