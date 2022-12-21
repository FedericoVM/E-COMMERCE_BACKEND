const UserModel = require("../models/user");
const bcrypt = require('bcrypt');
const util_jwt = require('../utils/jwt');
const Token = require('../models/token');
const crypto = require("crypto");
const nodemailer = require('../utils/nodemailer')

const getUsuarios = async(req, res) => {
    try {
        const usuarios = await UserModel.find();
        if(usuarios){
            return res.status(200).send(usuarios)
        } else {
            return res.status(200).send([])
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({msg:"Error en la base al traer objetos"})
    }
}

const registrarUsuario = async(req, res) => {
    const {nombre, apellido, email, password, edad, avatar} = req.body;

    if(!email) return res.status(400).send({msg: "Email obligatorio"});
    if(!password) return res.status(400).send({msg:"Password obligatorio"});

    const newUser = new UserModel({
        nombre,
        apellido,
        email,
        password,
        edad,
        avatar,
        carrito : [],
        role : "admin"
    })
    newUser.email = email.toLowerCase()
    const saltos = bcrypt.genSaltSync(Number(process.env.SALT));
    const passwordHash = bcrypt.hashSync(password, saltos);
    newUser.password = passwordHash;

    try {
        const user = await newUser.save();
        const token = await Token({
            userId:user._id,
            token: crypto.randomBytes(32).toString("hex"),
        })

        await token.save();
        
        const url = `<a href="${process.env.URL_API}/api/users/${user._id}/verificar/${token.token}" style={{color: "red"}}>Click para verificar cuenta`;

        //await nodemailer.enviarEmail(user.email, "willy14msn@gmail.com", url)
        console.log(user)
        return res.status(200).send(user)
    } catch (error) {
        console.log(error)
        return res.status(500).send({msg:"Error en la base de datos al crear usuario"})
    }
}

const loginUsuario = async(req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        return res.status(400).send({msg:"Todos los campos son requeridos"});
    }

    const emailLowerCase = email.toLowerCase();

    try {
        const buscarUsuario = await UserModel.findOne({email: emailLowerCase});
        if(buscarUsuario) {
            const isMatch = bcrypt.compareSync(password, buscarUsuario.password);
            if(isMatch){
                if(!buscarUsuario.active){
                    return res.status(400).send({msg: "Usuario no verificado"})
                }
               res.status(200).send({token: util_jwt.crearToken(buscarUsuario)});
            } else {
                return res.status(400).send({msg:"Email o password incorrectos"})
            }
        } else {
            return res.status(404).send({msg:"No se encontro al usuario"})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({msg:"Error en el servidor al logearse"})
    }
}

const verificarToken = async(req, res) => {
    const {id, token} = req.params;

    try {
        const usuario = await UserModel.findOne({_id: id});
        if(usuario === null) {
            return res.status(404).send({msg:"Usuario no encontrado"})
        }
console.log(token, id, usuario._id)
        const tokenverificado = await Token.findOne({token: token});
        console.log(tokenverificado)
        if(tokenverificado === null) {
            return res.status(404).send({msg:"Token no encontrado"})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({msg:"No se pudo buscar al usuario"})
    }

    try {
        await UserModel.findByIdAndUpdate({ _id: id}, {active: true});
        return res.status(200).send({msg:"Su usuario fue verificado correctamente"})
    } catch (error) {
        console.log(error)
        return res.status(500).send({msg:"No se verifico el token"})
    }
}

module.exports = {
    getUsuarios,
    registrarUsuario,
    loginUsuario,
    verificarToken
}