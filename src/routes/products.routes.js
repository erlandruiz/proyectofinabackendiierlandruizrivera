import { Router } from "express";
import { checkProductData } from "../middlewares/checkProductData.middleware.js";
import { productDao } from "../dao/mongo/product.dao.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";
import { authorization } from "../middlewares/authorization.middleware.js";
import { passportCall } from "../middlewares/passport.middleware.js";
import { ProductController } from "../controllers/product.controller.js";

const productController = new ProductController();
const router = Router();

router.use(passportCall("jwt")); // Middleware a nivel rutas

// router.get("/", isAdmin, async (req, res) => {
router.get("/", authorization("admin"), productController.getAllProducts);
// router.get("/", productController.getAllProducts); //se activa solo para react

router.get("/:pid", authorization("user"),productController.getProductById);

router.delete("/:pid", authorization("admin"), productController.deleteOneProduct);
// router.delete("/:pid", passportCall('jwt') ,authorization("admin"), productController.deleteOneProduct); // es para probar sin middleware a nivel rutas 

router.put("/:pid",authorization("admin"), productController.updateProduct );

router.post("/",authorization("admin"), checkProductData, productController.createProduct );
export default router;
