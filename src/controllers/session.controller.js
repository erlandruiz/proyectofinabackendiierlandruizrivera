import { userDao } from "../dao/mongo/user.dao.js";
import { UserResponseDto } from "../dto/userResponse.dto.js";
import { createToken } from "../utils/jwt.js";

export class SessionController {
  async registerUser(req, res) {
    try {
      res.status(201).json({ status: "success", msg: "Usuario Registrado" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: "Error", msg: "Error interno del servidor" });
    }
  }

  async loginUser(req, res) {
    try {
      // Generamos el token
      const token = createToken(req.user);

      // Guardamos el token en una cookie
      res.cookie("token", token, { httpOnly: true });

      //TODO para hacer DTO
      // const userFornat = new UserResponseDto(req.user)
      // res.status(200).json({ status: "success", payload: userFornat });
      //TODO end  para hacer DTO

      res.status(200).json({ status: "success", payload: req.user });

      
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: "Error", msg: "Error interno del servidor" });
    }
  }

  async logout(req, res) {
    try {
      req.session.destroy();
      res.status(200).json({ status: "success", msg: "Session cerrada" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: "Error", msg: "Error interno del servidor" });
    }
  }

  async current(req, res) {
    try {
      const user = await userDao.getById(req.user.id);
      res.status(200).json({ status: "success", payload: user });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: "Error", msg: "Error interno del servidor" });
    }
  }
}
