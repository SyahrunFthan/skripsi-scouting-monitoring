const Users = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class AuthController {
  static async Login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({
        where: {
          email: email,
        },
      });

      if (!user)
        return res.status(400).json({
          error: [
            {
              path: ["email", "password"],
              message: "Email atau password anda salah!",
            },
          ],
        });

      const match = await bcrypt.compare(password, user?.password);
      if (!match)
        return res.status(400).json({
          error: [
            {
              path: ["email", "password"],
              message: "Email atau password anda salah!",
            },
          ],
        });

      const userId = user?.id_user;
      const name = user?.name;

      const token = jwt.sign({ userId, name }, process.env.SECRET_TOKEN, {
        expiresIn: "1d",
      });

      await Users.update({ token }, { where: { id_user: userId } });

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({ userId, token });
    } catch (error) {
      return res.status(500).json({ message: error?.message });
    }
  }

  static async Register(req, res) {
    try {
      const { name, email, password } = req.body;

      const checkEmail = await Users.findOne({ where: { email } });

      if (checkEmail)
        return res.status(400).json({
          error: [{ path: ["email"], message: "Email sudah terdaftar!" }],
        });

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const filename = "default.png";
      const pathFile = `${req.protocol}://${req.get(
        "host"
      )}/public/${filename}`;

      await Users.create({
        name: name,
        email: email,
        password: hashedPassword,
        image: filename,
        path_image: pathFile,
      });

      return res.status(201).json({ message: "Admin berhasil di buat!" });
    } catch (error) {
      return res.status(500).json({ message: error?.message });
    }
  }

  static async RemoveToken(req, res) {
    try {
      const userId = req.params.id;
      const user = await Users.findOne({ where: { id_user: userId } });
      if (!user)
        return res.status(404).json({ message: "User tidak ditemukan!" });

      await Users.update({ token: null }, { where: { id_user: userId } });

      res.clearCookie("token");

      return res.status(200).json({ message: "Berhasil!" });
    } catch (error) {
      return res.status(500).json({ message: error?.message });
    }
  }

  static async patchUserLogin(req, res) {
    try {
      const { id } = req.params;

      const response = await Users.findOne({
        where: {
          id_user: id,
        },
        attributes: ["name", "email", "path_image"],
      });

      return res.status(200).json({ response });
    } catch (error) {
      return res.status(500).json({ message: error?.message });
    }
  }
}

module.exports = AuthController;
