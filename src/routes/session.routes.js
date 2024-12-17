import { Router } from "express";
import { userDao } from "../dao/mongo/user.dao.js";
import { checkEmail } from "../middlewares/checkEmail.middleware.js";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import passport from "passport";
import { createToken, verifyToken } from "../utils/jwt.js";
import { passportCall } from "../middlewares/passport.middleware.js";
import { authorization } from "../middlewares/authorization.middleware.js";
import { SessionController } from "../controllers/session.controller.js";

const sessionController = new SessionController()
const router = Router();

router.post("/register", passportCall("register"), sessionController.registerUser);

router.post("/login", passportCall("login"), sessionController.loginUser);

router.get("/logout", sessionController.logout);

router.get("/current", passportCall("jwt"), authorization("user"),sessionController.current );

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"],
    session: false,
  }),
  (req, res) => {
    res.status(200).json({ status: "success", payload: req.user });
  }
);



export default router;
