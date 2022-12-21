const mercadopago = require("mercadopago")
const ProductosModel = require("../models/product")

const checkout = async (req, res) => {
    const {productos} = req.body;
    let productos_total = [];
    const promise = productos.map(async({_id}) => {
        const produ = await ProductosModel.findById(_id)
        if(produ !== null) return produ
    });
    await Promise.all(promise).then(values => {
        productos_total = values;
    })

    const preferences = {
        items : [],
        back_urls:{
            success:"http://localhost:3000/pago-excitoso",
            failure:"http://localhost:3000/pago-fallido",
            pending:"http://localhost:3000/pago-pendiente",
        },
        auto_return : "approved"
    }
console.log(productos)
console.log(productos_total)
    if(productos_total.length === productos.length){
       productos_total.map( producto => {
        preferences.items.push({
            id: producto._id,
            title: producto.nombre,
            description: producto.descripcion,
            category_id: producto.categoria,
            quantity:1,
            currency_id:"ARS",
            unit_price: producto.precio
        })
       })

       try {
           const pago = await mercadopago.preferences.create(preferences)
           return res.status(pago.status).json({ redirectUrl : pago.body.init_point})
       } catch (error) {
        console.log(error);
        res.status(500).send({failure: error.message})
       }
    }
    
}

module.exports = {
    checkout
}