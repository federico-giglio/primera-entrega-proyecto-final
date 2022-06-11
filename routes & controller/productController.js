const DB = require("../db/db.js");
class ProductsController {
  constructor() {
    this.db = new DB("./db/productos.txt");
  }

  async getAll() {
    return await this.db.getAll();
  }

  //Obtener ID del item
  async getId() {
    return await this.db.getNextId();
  }

  //Obtener un item por su ID
  async getById(id) {
    try {
      return await this.db.getById(id);
    } catch (error) {
      return error;
    }
  }

  validateProductData(newDatos) {
    if (
      !newDatos.nombre ||
      !newDatos.precio ||
      !newDatos.foto ||
      !newDatos.descripcion ||
      !newDatos.stock ||
      !newDatos.codigo
    ) {
      const error = new Error("Ingrese la totalidad de los datos requeridos.");
      throw error;
    }
    return newDatos;
  }
  //Agregar un item
  async addItem(item) {
    const newItem = this.validateProductData(item);
    this.db.save(newItem);
  }

  //Actualizar un item (se utilizará para método PUT)
  async updateItem(id, newDatos) {
    const validatedData = this.validateProductData(newDatos);
    const item = await this.getById(id);
    for (let x in item) {
      if (x !== "id") item[x] = validatedData[x];
    }
    item.timestamp = Date.now();
    await this.db.updateItem(item);
  }

  //Eliminar un item por su id (se utilizará para método DELETE)
  async deleteItem(id) {
    await this.db.deleteById(id);
  }
}

module.exports = new ProductsController();
