// Importamos
const { Router } = require("express");
const productosController = require("./productController");
const validarAdmin = require("../middlewares/validarAdmin");
const productRouter = Router();

// GET '/api/productos' -> devuelve todos los productos.

productRouter.get("/", async (req, res, next) => {
  try {
    const datos = await productosController.getAll();
    res.json(datos);
  } catch (error) {
    next(error);
  }
});

// GET '/api/productos/:id' -> devuelve un producto según su id.

productRouter.get("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const datos = await productosController.getById(id);
    res.send(datos);
  } catch (error) {
    next(error);
  }
});

// POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.

productRouter.post("/", validarAdmin, async (req, res, next) => {
  try {
    const datos = req.body;
    await productosController.addItem(datos);
    res.json({ producto: "Se ha agregado un nuevo producto" });
  } catch (error) {
    next(error);
  }
});

// PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.

productRouter.put("/:id", validarAdmin, async (req, res) => {
  try {
    const productoId = parseInt(req.params.id);
    const datos = req.body;
    await productosController.updateItem(productoId, datos);
    res.json({ producto: "se ha actualizado el producto" });
  } catch (error) {
    next(error);
  }
});

// DELETE '/api/productos/:id' -> elimina un producto según su id.

productRouter.delete("/:id", validarAdmin, async (req, res) => {
  try {
    const productoId = parseInt(req.params.id);
    await productosController.deleteItem(productoId);
    res.json({ producto: "se ha eliminado el producto" });
  } catch (error) {
    next(error);
  }
});

// ERRORS

productRouter.use((err, req, res, next) => {
  res.status(500).send({ error: err.message });
});

module.exports = productRouter;
