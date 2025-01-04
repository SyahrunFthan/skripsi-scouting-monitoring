const { Op } = require("sequelize");
const Activities = require("../models/Activities");
const Contributions = require("../models/Contributions");
const Schools = require("../models/Schools");
const path = require("path");
const fs = require("fs");
const Images = require("../models/Images");

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

      // Cek file yang diunggah
      if (!req.files || !req.files.image1) {
        return res.status(400).json({
          error: [{ path: ["image1"], message: "Foto kegiatan harus diisi!" }],
        });
      }

      const { image1, image2, image3 } = req.files;

      // Generate nama file
      const generateFilename = (file) =>
        `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(
          file.name
        )}`;

      const filename1 = generateFilename(image1);
      const filename2 = image2 ? generateFilename(image2) : null;
      const filename3 = image3 ? generateFilename(image3) : null;

      // Pindahkan file
      await image1.mv(`public/contributions/${filename1}`);
      if (image2) await image2.mv(`public/contributions/${filename2}`);
      if (image3) await image3.mv(`public/contributions/${filename3}`);

      // Simpan data kontribusi
      const contribution = await Contributions.create({
        school_id: school,
        activity_id: activity,
      });

      // Simpan data gambar
      const imagesData = [
        {
          contribution_id: contribution.id_contribution,
          image_name: filename1,
          image_path: `${req.protocol}://${req.get(
            "host"
          )}/public/contributions/${filename1}`,
        },
      ];
      if (filename2)
        imagesData.push({
          contribution_id: contribution.id_contribution,
          image_name: filename2,
          image_path: `${req.protocol}://${req.get(
            "host"
          )}/public/contributions/${filename2}`,
        });
      if (filename3)
        imagesData.push({
          contribution_id: contribution.id_contribution,
          image_name: filename3,
          image_path: `${req.protocol}://${req.get(
            "host"
          )}/public/contributions/${filename3}`,
        });

      await Images.bulkCreate(imagesData);

      return res
        .status(201)
        .json({ message: "Berhasil menambahkan kontribusi!" });
    } catch (error) {
      console.error("Error:", error);
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
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

  static async patchDataDashboard(req, res) {
    try {
      // Ambil semua sekolah terlebih dahulu
      const schools = await Schools.findAll();

      // Total kegiatan wajib yang harus diikuti oleh sekolah (misalnya 12)
      const totalWajibKegiatan = 12;

      // Ambil semua kontribusi yang ada
      const contributions = await Contributions.findAll({
        include: [
          {
            model: Schools,
            as: "school",
            foreignKey: "school_id",
          },
        ],
      });

      const schoolActivities = {};

      // Tambahkan semua sekolah terlebih dahulu
      schools.forEach((school) => {
        schoolActivities[school.id_school] = {
          total_kehadiran: 0,
          total_kegiatan: 0,
          name: school.name,
          logo: school.path_image,
          numberGudep: school.number_gudep,
        };
      });

      // Sekarang, update data sekolah berdasarkan kontribusi yang ada
      contributions.forEach((item) => {
        const schoolId = item?.school_id;
        if (schoolActivities[schoolId]) {
          schoolActivities[schoolId].total_kehadiran++;
          schoolActivities[schoolId].total_kegiatan++;
        }
      });

      // Mengubah objek menjadi array
      const objectData = Object.keys(schoolActivities).map((key) => ({
        school_id: key,
        name: schoolActivities[key].name,
        numberGudep: schoolActivities[key].numberGudep,
        logo: schoolActivities[key].logo,
        ...schoolActivities[key],
      }));

      // Menentukan status aktif atau tidak aktif berdasarkan persentase kegiatan yang diikuti
      const labeledData = objectData.map((d) => {
        // Hitung persentase kegiatan yang diikuti
        const persentaseKegiatan =
          (d.total_kegiatan / totalWajibKegiatan) * 100;

        // Tentukan status berdasarkan persentase
        const aktif = persentaseKegiatan >= 70 ? 1 : 0; // Jika ≥ 50%, aktif

        return {
          ...d,
          aktif: aktif,
          persentaseKegiatan: persentaseKegiatan.toFixed(2), // Menambahkan persentase kegiatan
        };
      });

      // Sortir data berdasarkan total kegiatan secara menurun
      labeledData.sort((a, b) => b.total_kegiatan - a.total_kegiatan);

      // Pisahkan sekolah aktif dan tidak aktif
      const activeSchools = labeledData.filter((item) => item.aktif === 1);
      const inactiveSchools = labeledData.filter((item) => item.aktif === 0);

      const topActiveSchools = activeSchools.slice(0, 4);
      const topInactiveSchools = inactiveSchools.slice(0, 4);

      const totalSchool = await Schools.count();
      const totalActivity = await Activities.count();
      const totalContribution = await Contributions.count();

      return res.status(200).json({
        activeSchools: topActiveSchools,
        inactiveSchools: topInactiveSchools,
        totalSchool,
        totalActivity,
        totalContribution,
      });
    } catch (error) {
      return res.status(500).json({ message: error?.message });
    }
  }

  static async detailContribution(req, res) {
    try {
      const { id } = req.params;
      const response = await Images.findAll({
        where: { contribution_id: id },
      });

      if (!response[0])
        return res
          .status(400)
          .json({ message: "Foto kegiatan tidak ditemukan" });

      return res.status(200).json({ response });
    } catch (error) {
      return res.status(500).json({ message: error?.message });
    }
  }
}

module.exports = ContributionController;
