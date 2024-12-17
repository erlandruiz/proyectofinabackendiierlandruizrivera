import { Router } from "express";
import { cartDao } from "../dao/mongo/cart.dao.js";
import { authorization } from "../middlewares/authorization.middleware.js";
import { productDao } from "../dao/mongo/product.dao.js";
import { passportCall } from "../middlewares/passport.middleware.js";
import { CartController } from "../controllers/cart.controller.js";

const cartController = new CartController()
const router = Router();

router.use(passportCall("jwt")); // Middleware a nivel rutas

router.post("/", authorization("admin"), cartController.createCart);

router.get("/", authorization("admin"), cartController.getAllCarts)

router.get("/:cid", authorization("user"), cartController.getCartByID);

router.post("/:cid/product/:pid", authorization("user"), cartController.addProductToCart );

router.post("/:cid/purchase", authorization("user") , cartController.purchaseCart);

//REmove product from a cart
router.delete("/:cid/product/:pid", authorization("user"), cartController.deleteProductToCart);

router.put("/:cid/product/:pid", authorization("user"), cartController.updateProductQuantityInCart);

router.delete("/:cid", authorization("admin"), cartController.clearProductsToCart);

export default router;
