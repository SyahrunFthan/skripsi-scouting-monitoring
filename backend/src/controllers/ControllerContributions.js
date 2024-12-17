const { Op } = require("sequelize");
const Activities = require("../models/Activities");
const Contributions = require("../models/Contributions");
const Schools = require("../models/Schools");

class ContributionController {
  static async patchDataContribution(req, res) {
    try {
      const page = parseFloat(req.query.page) || 1;
      const limit = parseFloat(req.query.limit) || 10;
      const search = req.query.search || "";

      const offset = (page - 1) * limit;

      const { count: totalRows, rows: contributions } =
        await Contributions.findAndCountAll({
          include: [
            {
              model: Schools,
              as: "school",
            },
            {
              model: Activities,
              as: "activity",
            },
          ],
          where: {
            [Op.or]: [
              { "$school.name$": { [Op.like]: `%${search}%` } },
              { "$activity.name$": { [Op.like]: `%${search}%` } },
            ],
          },
          offset: offset,
          limit: limit,
          order: [["createdAt", "ASC"]],
        });

      const totalPages = Math.ceil(totalRows / limit);

      return res
        .status(200)
        .json({ contributions, totalPages, totalRows, page });
    } catch (error) {
      return res.status(500).json({ message: error?.message });
    }
  }

  static async patchSchoolAndActivities(req, res) {
    try {
      const schools = await Schools.findAll();
      const activities = await Activities.findAll();

      return res.status(200).json({ schools, activities });
    } catch (error) {
      return res.status(500).json({ message: error?.message });
    }
  }

  static async patchContributionById(req, res) {
    try {
      const { id } = req.params;

      const response = await Contributions.findByPk(id);

      return res.status(200).json({ response });
    } catch (error) {
      return res.status(500).json({ message: error?.message });
    }
  }

  static async createContribution(req, res) {
    try {
      const { school, activity } = req.body;

      const checkSuitable = await Contributions.findOne({
        where: {
          school_id: school,
          activity_id: activity,
        },
      });

      if (checkSuitable)
        return res.status(400).json({
          error: [
            {
              path: ["school"],
              message: "Sekolah sudah mengikuti kegiatan ini!",
            },
          ],
        });

      await Contributions.create({
        school_id: school,
        activity_id: activity,
      });

      return res
        .status(201)
        .json({ message: "Berhasil menambahkan kontribusi!" });
    } catch (error) {
      return res.status(500).json({ message: error?.message });
    }
  }

  static async deleteContribution(req, res) {
    try {
      const { id } = req.params;

      await Contributions.destroy({
        where: {
          id_contribution: id,
        },
      });

      return res.status(200).json({ message: "Hapus data berhasil!" });
    } catch (error) {
      return res.status(500).json({ message: error?.message });
    }
  }

  static async updateContribution(req, res) {
    try {
      const { id } = req.params;
      const { school, activity } = req.body;

      await Contributions.update(
        {
          school_id: school,
          activity_id: activity,
        },
        {
          where: {
            id_contribution: id,
          },
        }
      );

      return res.status(200).json({ message: "Data berhasil di ubah!" });
    } catch (error) {
      return res.status(500).json({ message: error?.message });
    }
  }
}

module.exports = ContributionController;
