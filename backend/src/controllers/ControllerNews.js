const { Op } = require("sequelize");
const News = require("../models/News");
const path = require("path");
const fs = require("fs");

class NewsController {
  static async createNews(req, res) {
    try {
      const { title, content, subTitle } = req.body;

      if (req.files === null)
        return res.status(400).json({
          error: [{ path: ["image"], message: "Gambar harus diisi" }],
        });
      const file = req.files.image;
      const filesize = file.data.length;
      const ext = path.extname(file.name);
      const filename = Date.now() + ext;
      const allowedTypes = [".png", ".jpg", ".jpeg"];
      if (!allowedTypes.includes(ext.toLowerCase()))
        return res.status(400).json({
          error: [{ path: ["image"], message: "Format tidak didukung!" }],
        });
      if (filesize > 2000000)
        return res.status(400).json({
          error: [{ path: ["image"], message: "Ukuran terlalu besar!" }],
        });

      const path_image = `${req.protocol}://${req.get(
        "host"
      )}/public/news/${filename}`;

      file.mv(`public/news/${filename}`);
      const news = await News.create({
        title,
        content,
        path_image,
        sub_title: subTitle,
        image: filename,
      });

      return res
        .status(201)
        .json({ message: `${news?.title} berhasil dibuat!` });
    } catch (error) {
      return res.status(500).json({ message: "Failed to create news" });
    }
  }

  static async getAllNews(req, res) {
    try {
      const { page = 1, limit = 10, search = "" } = req.query;
      const offset = (page - 1) * limit;

      const { count: totalRows, rows: news } = await News.findAndCountAll({
        where: {
          title: {
            [Op.like]: `%${search}%`,
          },
        },
        offset: offset,
        limit: 10,
        order: [["title", "ASC"]],
      });

      const totalPages = Math.ceil(totalRows / limit);

      return res.status(200).json({ news, totalPages, totalRows, page });
    } catch (error) {
      return res.status(500).json({ message: "Failed to get all news" });
    }
  }

  static async getNewsId(req, res) {
    try {
      const { id } = req.params;
      const response = await News.findByPk(id);

      return res.status(200).json({ response });
    } catch (error) {
      return res.status(500).json({ message: "Failed to get news by id" });
    }
  }

  static async updateNews(req, res) {
    try {
      const { title, content, subTitle } = req.body;
      const { id } = req.params;
      if (req?.files === null) {
        await News.update(
          {
            title,
            content,
            sub_title: subTitle,
          },
          {
            where: {
              id,
            },
          }
        );
      } else {
        const file = req.files.image;
        const filesize = file.data.length;
        const ext = path.extname(file.name);
        const filename = Date.now() + ext;
        const allowedTypes = [".png", ".jpg", ".jpeg"];
        if (!allowedTypes.includes(ext.toLowerCase()))
          return res.status(400).json({
            error: [{ path: ["image"], message: "Format tidak didukung!" }],
          });
        if (filesize > 2000000)
          return res.status(400).json({
            error: [{ path: ["image"], message: "Ukuran terlalu besar!" }],
          });
        const path_image = `${req.protocol}://${req.get(
          "host"
        )}/public/news/${filename}`;
        file.mv(`public/news/${filename}`);
        const checkImage = await News.findOne({
          where: {
            id,
          },
        });
        if (checkImage?.image !== null) {
          fs.unlinkSync(`public/news/${checkImage.image}`);
        }
        await News.update(
          {
            title,
            content,
            path_image,
            sub_title: subTitle,
            image: filename,
          },
          {
            where: {
              id,
            },
          }
        );
      }
      return res.status(200).json({ message: "Berhasil mengupdate berita" });
    } catch (error) {
      return res.status(500).json({ message: "Failed to update news" });
    }
  }

  static async deleteNews(req, res) {
    try {
      const { id } = req.params;
      const checkNews = await News.findOne({
        where: {
          id,
        },
      });

      if (checkNews?.image !== null) {
        fs.unlinkSync(`public/news/${checkNews.image}`);
      }

      await News.destroy({
        where: {
          id,
        },
      });

      return res
        .status(200)
        .json({ message: `${checkNews?.title} berhasil di hapus!` });
    } catch (error) {
      return res.status(500).json({ message: "Failed to delete news!" });
    }
  }

  static async getNewsFromHome(req, res) {
    try {
      const response = await News.findAll({
        limit: 5,
        order: [["createdAt", "DESC"]],
      });

      return res.status(200).json({ response });
    } catch (error) {
      return res.status(500).json({ message: error?.message });
    }
  }
}

module.exports = NewsController;
