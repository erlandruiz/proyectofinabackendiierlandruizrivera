import { cartDao } from "../dao/mongo/cart.dao.js";
import { productDao } from "../dao/mongo/product.dao.js";

class CartService {
  async createCart() {
    return await cartDao.create(); // arquitectura mas limpia para retornar data
  }

  async getCartByID(id) {
    const cart = await cartDao.getById(id);
    if (!cart) return null;
    return cart;
  }

  async addProductToCart(cid, pid) {
    const cart = await cartDao.getById(cid);
    if (!cart) return null;

    const productInCart = cart.products.find(
      (element) => element.product == pid
    );
    if (productInCart) {
      productInCart.quantity++;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    return await cartDao.update(cid, cart);
  }

  async deleteProductToCart(cid, pid) {
    // const product = await productDao.getById(pid);
    // if (!product) return null;

    // const cart = await cartDao.getById(cid);
    // if (!cart) return null;

    

    const products = cart.products.filter((prod) => prod.product != pid);

    return await cartDao.update(cid, { products });
  }

  async updateProductQuantityInCart(cid, pid, quantity) {
    // const product = await productDao.getById(pid);
    // if (!product) return null;

    // const cart = await cartDao.getById(cid);
    // if (!cart) return null;
    const cart = await this.getCartByID(cid);
    const index= cart.products.findIndex((element) => element.product == pid);
    cart.products[index].quantity = quantity;

    return await cartDao.update(cid, cart);
  }

  async clearProductsToCart(cid) {
    const cart = await this.getCartByID(id); // Con este codigo se llama dentro de  la misma clase
    cart.products = [];
    return await cartDao.update(id, cart);
  }

  async purchaseCart(cid) {
    const cart = await this.getCartByID(cid);
    // if(!cart ) return  null
    let total = 0;
    const products = [];
    for (const productCart of cart.products) {
      const prod = await productDao.getById(productCart.product);
      if (prod.stock >= productCart.quantity) {
        total += prod.price * productCart.quantity;
        prod.stock = prod.stock - productCart.quantity;
        await productDao.update(prod._id, { stock: prod.stock });
      } else {
        products.push(productCart);
      }

    }
    
    await cartDao.update(cid, { products });
    return total;
  }
}

export const cartService = new CartService();
