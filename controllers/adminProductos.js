const ProductosModel = require("../models/product");
const UsuarioModel = require("../models/user");

const crearProducto = async(req, res) => {
    const {codigo, nombre, marca, precio, categoria, descripcion, imagen, stock} = req.body;
    if (!nombre) return res.status(400).send({msg:"Nombre requerido"});
    if (!codigo) return res.status(400).send({msg:"Codigo requerido"});
    if (!imagen) return res.status(400).send({msg:"Url de imagen requerido"});
    if (!precio) return res.status(400).send({msg:"Precio requerido"});

    const newProduct = new ProductosModel({
        codigo,
        nombre,
        marca,
        precio,
        categoria,
        descripcion,
        imagen,
        stock
    })

    try {
        const producto = await newProduct.save();
        console.log(producto)
        return res.status(200).send({msg:"Producto creado correctamente"})
    } catch (error) {
        console.log(error)
        return res.status(500).send({msg:"Error en la base de datos al crear producto"})
    }
}

const obtenerProductos = async(req, res) => {
    try {
        const productos = await ProductosModel.find();
        if(productos) {
            return res.status(200).send(productos)
        } else {
            return res.status(200).send([])
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({msg:"Error en la base de datos al traer productos"})
    }
}

const editarProducto = async(req,res) => {
    const {id} = req.params;

    const productoData = req.body

    try {
        await ProductosModel.findByIdAndUpdate(id, productoData);
        return res.status(200).send({msg:"Producto editado correctamente"})
    } catch (error) {
        console.log(error)
        return res.status(400).send({msg:"Error en la base de datos al editar producto"})
    }
}

const eliminarProducto = async(req, res) => {
    const {id} = req.params

    try {
        await ProductosModel.findByIdAndDelete(id);
        return res.status(200).send({msg:"Producto eliminado correctamente"})
    } catch (error) {
        return res.status(500).send({msg:"Error en la base de datos al eliminar producto"})
    }
}

const eliminarUsuario = async(req, res) => {
    const {id} = req.params

    try {
        await UsuarioModel.findByIdAndDelete(id);
        return res.status(200).send({msg:"Usuario eliminado correctamente"})
    } catch (error) {
        console.log(error)
        return res.status(500).send({msg:"Error en la base de datos al eliminar usuario"})
    }
}
module.exports = {
    crearProducto,
    obtenerProductos,
    eliminarProducto,
    editarProducto,
    eliminarUsuario
}