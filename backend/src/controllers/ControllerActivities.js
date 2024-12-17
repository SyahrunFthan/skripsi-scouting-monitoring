const { Op } = require("sequelize");
const Activities = require("../models/Activities");

class ActivitiesController {
  static async GetActivities(req, res) {
    try {
      const page = parseFloat(req.query.page) || 1;
      const limit = parseFloat(req.query.limit) || 10;
      const search = req.query.search || "";
      const offset = (page - 1) * limit;

      const { count: totalRow, rows: response } =
        await Activities.findAndCountAll({
          where: {
            name: {
              [Op.like]: `%${search}%`,
            },
          },
          offset: offset,
          limit: limit,
          order: [["name", "ASC"]],
        });

      const totalPage = Math.ceil(totalRow / limit);

      return res.status(200).json({ response, totalPage, totalRow, page });
    } catch (error) {
      return res.status(500).json({ error: error?.message });
    }
  }

  static async GetActivitiesID(req, res) {
    try {
      const { id } = req.params;

      const response = await Activities.findOne({
        where: {
          id_activity: id,
        },
      });

      return res.status(200).json({ response });
    } catch (error) {
      return res.status(500).json({ error: error?.message });
    }
  }

  static async CreateActivities(req, res) {
    try {
      const { name, point, scale } = req.body;

      const checkActivities = await Activities.findAll({
        where: {
          name: name,
        },
      });

      if (checkActivities[0])
        return res.status(400).json({
          error: [{ path: ["name"], message: "Kegiatan sudah terdaftar!" }],
        });

      await Activities.create({
        name: name,
        points: point,
        scale_activity: scale,
      });

      return res.status(201).json({ message: "Berhasil" });
    } catch (error) {
      return res.status(500).json({ error: error?.message });
    }
  }

  static async updateActivities(req, res) {
    try {
      const { name, point, scale } = req.body;

      await Activities.update(
        {
          name: name,
          scale_activity: scale,
          points: point,
        },
        {
          where: {
            id_activity: req.params.id,
          },
        }
      );

      return res.status(200).json({ message: "Berhasil." });
    } catch (error) {
      return res.status(500).json({ message: error?.message });
    }
  }

  static async deleteActivities(req, res) {
    try {
      await Activities.destroy({
        where: {
          id_activity: req.params.id,
        },
      });

      return res.status(200).json({ message: "Berhasil" });
    } catch (error) {
      return res.status(500).json({ message: error?.message });
    }
  }
}

module.exports = ActivitiesController;
