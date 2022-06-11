// Importamos
const express = require('express');
const app = express()
const cartRouter = require('./routes & controller/cartRouter.js')
const productRouter = require('./routes & controller/productRouter.js')

// Settings
//seteo puerto definido por servicio cloud, o establezco 8080 por defecto
app.set ('port', process.env.PORT || 8080)

// Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Ruta
app.use("/api/productos", productRouter)
app.use("/api/carrito", cartRouter)
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

// Server
app.listen(8080, () => {
    console.log(`Escuchando en puerto ${app.get('port')}`);
})
