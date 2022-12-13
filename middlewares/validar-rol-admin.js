const validarRolAdmin = (req, res, next) => {
    if(req.payload.rol !== 'ADMIN'){
        return req.status(401).json({ mensaje: 'Error unauthorized' });
    }
    next();
}

module.exports = {
    validarRolAdmin
}