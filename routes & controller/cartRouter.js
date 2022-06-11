// Importamos
const { Router } = require("express");
const carritoController = require("./cartController");
const cartRouter = Router();

// GET '/api/carrito/:id' -> devuelve un carrito según su id.

cartRouter.get("/:id/productos", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const datos = await carritoController.getProductsByCartID(id);
    res.send(datos);
  } catch (error) {
    next(error);
  }
});

// POST '/api/carrito/:id' -> recibe productos y actualiza un carrito según su id.

cartRouter.post("/:id/productos", async (req, res, next) => {
  try {
    const carritoID = parseInt(req.params.id);
    const productos = req.body;
    carritoController.addProducts(carritoID, productos);
    res.json({ producto: "se ha actualizado el carrito" });
  } catch (error) {
    next(error);
  }
});

// POST '/api/carrito' -> crea un nuevo carrito, y lo devuelve con su id asignado.

cartRouter.post("/", async (req, res, next) => {
  try {
    const id = await carritoController.createCart();
    res.json({ producto: "Se ha agregado un nuevo carrito con id: " + id });
  } catch (error) {
    next(error);
  }
});
// DELETE '/api/carrito/:id' -> elimina un producto según su id.

cartRouter.delete("/:id", async (req, res, next) => {
  try {
    const carritoId = parseInt(req.params.id);
    carritoController.deleteItem(carritoId);
    res.json({ producto: "se ha eliminado el carrito" });
  } catch (error) {
    next(error);
  }
});

// Eliminar un producto del carrito
cartRouter.delete("/:id/productos/:productoId", async (req, res, next) => {
  try {
    const productoId = parseInt(req.params.productoId);
    const carritoId = parseInt(req.params.id);
    carritoController.deleteProduct(carritoId, productoId);
    res.json({ producto: "se ha eliminado el producto del carrito" });
  } catch (error) {
    next(error);
  }
});

// ERRORS

cartRouter.use((err, req, res, next) => {
  res.status(500).send({ error: err.message });
});

module.exports = cartRouter;
