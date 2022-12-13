const { Router } = require('express');
const { validationResult, check } = require('express-validator');
const Usuario = require('../models/Usuario');
const bycript = require('bcryptjs');
const { validarJWT } = require('../middlewares/validar-jwt.js');
const { validarRolAdmin } = require('../middlewares/validar-rol-admin');

const router = Router();


router.post('/',[
    check('nombre','invalid.nombre').not().isEmpty(),
    check('email','invalid.email').isEmail(),
    check('rol','invalid.rol').isIn([ 'ADMIN', 'OBSERVADOR' ]),
    check('contrasena','invalid.contrasena').not().isEmpty(),
    validarJWT,
    validarRolAdmin
], async function(req, res){
    try {
        console.log(req.body);

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ mensaje: errors.array() });
        }


        const existeEmail = await Usuario.findOne({ email: req.body.email });
        if (existeEmail){
            return res.status(400).json({ mensaje: 'Email exists' });
        }

        let usuario = new Usuario();
        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.rol = req.body.rol;

        const salt = bycript.genSaltSync();
        const contrasena = bycript.hashSync(req.body.contrasena, salt);
        usuario.contrasena = contrasena;

        usuario.fechaCreacion = new Date();
        usuario.fechaActualizacion = new Date();

        usuario = await usuario.save();

        res.send(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).json({mensaje: 'Internal server error'});
    }
});


router.get('/', [ validarJWT ], async function(req, res){
    try {

        const usuarios = await Usuario.find();
        res.send(usuarios);
    } catch (error) {
        console.log(error);
        res.status(500).send({ mensaje: 'Internal error server' })
    }
});

module.exports = router;