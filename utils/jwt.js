const jwt = require("jsonwebtoken");

const crearToken = (usuario) => {
    const expToken = new Date();
    expToken.setHours(expToken.getHours() + 3)
    console.log(usuario)

    const payload = {
        usuario_id: usuario._id,
        iat: Date.now(),
        exp: expToken.getTime(),
        role: usuario.role,
        active: usuario.active,
        avatar: usuario.avatar,
        carrito: usuario.carrito,
        nombre: usuario.nombre
    }
    console.log(payload)
    return jwt.sign(payload, process.env.JWT_SECRET_KET)
}

const decoded = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET_KET)
}

module.exports = {
    crearToken,
    decoded
}