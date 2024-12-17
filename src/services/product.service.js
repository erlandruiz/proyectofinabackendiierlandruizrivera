import { productDao } from "../dao/mongo/product.dao.js";
import { ProductResponseDto } from "../dto/productResponse.dto.js";

class ProductService {
  async getAllProducts(query, options) {
    return await productDao.getAll(query, options);
  }

  async getProductById(id) {
    const product = await productDao.getById(id);

    if (!product) return null;
    //Todo para hacer DTO
    const productFormat = new ProductResponseDto(product);
    //Todo  end para hacer DTO
    return productFormat;
  }

  async deleteOneProduct(id) {
    const product = await productDao.getById(id);
    if (!product) return null;
    await productDao.deleteOne(id);
    return true;
  }

  async updateProduct(id, data) {
    const product = await productDao.getById(id);
    if(!product) return null;
    const productUpdate = await productDao.update(id, data);
    return productUpdate;
  }

  async createProduct(data) {
    const product = await productDao.create(data);
    return product;
  }
}

export const productService = new ProductService(); //PATRON SINGLETON
