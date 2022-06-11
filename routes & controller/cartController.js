const DB = require("../db/db.js");
const productController = require("./productController");

class CartController {
  constructor() {
    this.db = new DB("./db/carritos.txt");
  }

  //Obtener ID del item
  async getId() {
    return await this.db.getNextId();
  }

  //Obtener un item por su ID
  async getProductsByCartID(id) {
    const carrito = await this.db.getById(id);
    if (carrito) {
      return carrito.productos;
    }
    throw new Error("No existe el carrito buscado");
  }

  // Actualizo el carrito quitando un producto
  async deleteProduct(carritoId, productId) {
    const carrito = await this.db.getById(carritoId);
    const oldProducts = carrito.productos;
    const newProducts = oldProducts.filter(
      (product) => product.id !== productId
    );
    carrito.productos = newProducts;
    await this.db.updateItem(carrito);
  }

  // Validacion solo para el carrito
  validateCartData(newDatos) {
    if (!newDatos.id || !newDatos.stock) {
      const error = new Error("Ingrese la totalidad de los datos requeridos.");
      throw error;
    }
    return newDatos;
  }

  //Agregar un item
  async createCart() {
    const newCarrito = {
      timestamp: Date.now(),
      productos: [],
    };
    return await this.db.save(newCarrito);
  }

  // Agrega productos al carrito
  async addProducts(id, datosRecibidos) {
    // Valido que los datos enviados son los esperados, id y stock
    const productsAAgregar = datosRecibidos.map((dato) =>
      this.validateCartData(dato)
    );

    // Busco el carrito a actualizar por ID
    const carrito = await this.db.getById(id);

    // Aca voy a guardar los productos con toda la info
    const products = [];

    // Por cada dato recibido, busco el producto por ID y lo guardo arriba
    for (const x of productsAAgregar) {
      const product = await productController.getById(x.id);
      product.stock = x.stock;
      products.push(product);
    }

    // Actualizo el carrito con toda la informacion
    carrito.productos = products;
    carrito.timestamp = Date.now();
    await this.db.updateItem(carrito);
  }

  //Eliminar un item por su id (se utilizará para método DELETE)
  async deleteItem(id) {
    await this.db.deleteById(id);
  }
}

module.exports = new CartController();
