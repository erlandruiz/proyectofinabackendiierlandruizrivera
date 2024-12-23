import { cartDao } from "../dao/mongo/cart.dao.js";
import { productDao } from "../dao/mongo/product.dao.js";
import { cartService } from "../services/cart.service.js";
import { productService } from "../services/product.service.js";
import { ticketService } from "../services/ticket.service.js";

export class CartController {
  async createCart(req, res) {
    try {
      const cart = await cartService.createCart();

      res.status(201).json({ status: "success", cart });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: "Erro", msg: "Error interno del servidor" });
    }
  }

  async getAllCarts(req, res) { 
    try {
      const carts = await cartDao.getAll();
      res.status(200).json({ status: "success", carts });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: "Erro", msg: "Error interno del servidor" });
    }
  }

  async getCartByID(req, res) {
    try {
      const { cid } = req.params;
      const cart = await cartService.getCartByID(cid);
      if (!cart)
        return res
          .status(404)
          .json({ status: "Error", msg: "Carrito no encontrado" });

      res.status(200).json({ status: "success", cart });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: "Erro", msg: "Error interno del servidor" });
    }
  }

  async addProductToCart(req, res) {
    try {
      const { cid, pid } = req.params;
      const product = await productService.getProductById(pid)
      if (!product)
        return res
          .status(404)
          .json({
            status: "Error",
            msg: `No se encontró el producto con el id ${pid}`,
          });
      const cart = await cartService.addProductToCart(cid, pid)
      if (!cart)
        return res
          .status(404)
          .json({
            status: "Error",
            msg: `No se encontró el carrito con el id ${cid}`,
          });

      // const cartUpdate = await cartDao.addProductToCart(cid, pid);

      res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: "Erro", msg: "Error interno del servidor" });
    }
  }

  async deleteProductToCart(req, res) {
    try {
      const { cid, pid } = req.params;
      const product = await productService.getProductById(pid)
      if (!product)
        return res
          .status(404)
          .json({
            status: "Error",
            msg: `No se encontró el producto con el id ${pid}`,
          });
      const cart = await cartService.getCartByID(cid)
      if (!cart)
        return res
          .status(404)
          .json({
            status: "Error",
            msg: `No se encontró el carrito con el id ${cid}`,
          });

      const cartUpdate = await cartService.deleteProductToCart(cid, pid);

      res.status(200).json({ status: "success", payload: cartUpdate });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: "Erro", msg: "Error interno del servidor" });
    }
  }
  async updateProductQuantityInCart(req, res)  {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
  
      const product = await productService.getProductById(pid)
      if (!product) return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
      const cart = await cartService.getCartByID(cid)
      if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });
  
      const cartUpdate = await cartService.updateProductQuantityInCart(cid, pid, Number(quantity));
  
      res.status(200).json({ status: "success", payload: cartUpdate });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
    }
  }

  async clearProductsToCart(req, res) {
    try {
      const { cid } = req.params;
      const cart = await cartService.clearProductsToCart(cid);
      if (!cart) return res.status(404).json({ status: "Error", msg: "Carrito no encontrado" });
  
      res.status(200).json({ status: "success", cart });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
    }
  }

  async purchaseCart (req, res){
    try {
      const {cid} = req.params;

      const cart = await cartService.getCartByID(cid)
      if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });



      const total = await cartService.purchaseCart(cid);
      
      if(total ===0) return res.status(400).json({status: "error", msg: "No stock suficiente para comprar los productos"});

      const ticket = await ticketService.createTicket(total, req.user.email);
      res.status(200).json({status:"success", ticket})
      
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
    }
  }



}
