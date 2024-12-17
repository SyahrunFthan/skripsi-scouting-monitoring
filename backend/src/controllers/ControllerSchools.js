const { Op } = require("sequelize");
const Schools = require("../models/Schools");
const path = require("path");
const fs = require("fs");

class SchoolControllers {
  static async getSchoolsData(req, res) {
    try {
      const page = parseFloat(req.query.page) || 1;
      const limit = parseFloat(req.query.limit) || 10;
      const search = req.query.search || "";

      const { count: totalRow, rows: schools } = await Schools.findAndCountAll({
        where: {
          name: {
            [Op.like]: `%${search}%`,
          },
        },
        offset: (page - 1) * limit,
        limit: limit,
        order: [["createdAt", "ASC"]],
      });

      const totalPage = Math.ceil(totalRow / limit);

      return res.status(200).json({ schools, totalPage, totalRow, page });
    } catch (error) {
      return res.status(500).json({ message: error?.messages });
    }
  }

  static async createSchools(req, res) {
    try {
      const { name, noGudep, total, address } = req.body;

      const checkSchool = await Schools.findOne({
        where: {
          number_gudep: noGudep,
        },
      });

      if (checkSchool)
        return res.status(400).json({
          error: [
            { path: ["noGudep"], message: "Nomor Gudep Sudah Terdaftar!" },
          ],
        });

      if (req.files == null) {
        await Schools.create({
          name: name,
          number_gudep: noGudep,
          total_participant: total,
          address: address,
        });
      } else {
        const file = req.files.file;
        const filesize = file.data.length;
        const ext = path.extname(file.name);
        const filename = Date.now() + ext;
        const filepath = `${req.protocol}://${req.get(
          "host"
        )}/public/schools/${filename}`;
        const allowedType = [".png", ".jpg", ".jpeg"];
        if (!allowedType.includes(ext.toLowerCase()))
          return res.status(400).json({
            error: [
              { path: ["image"], message: "Format gambar tidak di dukung!" },
            ],
          });

        if (filesize > 3000000)
          return res.status(400).json({
            error: [
              {
                path: ["image"],
                message: "Ukuran gambar harus di bawah 3 MB!",
              },
            ],
          });

        file.mv(`public/schools/${filename}`);

        await Schools.create({
          name: name,
          number_gudep: noGudep,
          total_participant: total,
          address: address,
          image: filename,
          path_image: filepath,
        });
      }

      return res.status(201).json({ message: "Berhasil" });
    } catch (error) {
      return res.status(500).json({ message: error?.messages });
    }
  }

  static async createImporData(req, res) {
    try {
      const { data } = req.body;
      const checkSchool = await Schools.findAll({
        attributes: ["name"],
      });

      const schoolList = checkSchool.map((school) => school.name);

      const schoolSet = new Set();
      const duplicateSchool = [];

      data.forEach((item) => {
        if (schoolSet.has(item?.name)) {
          duplicateSchool.push(item?.name);
        } else {
          schoolSet.add(item?.name);
        }
      });

      if (duplicateSchool.length > 0)
        return res.status(400).json({ message: "Ada sekolah yang duplikat!" });

      const duplicateSchoolInDB = data.filter((item) =>
        schoolList.includes(item?.name)
      );

      if (duplicateSchoolInDB.length > 0)
        return res
          .status(400)
          .json({ message: "Ada data yang sama dalam database!" });
      
      for(const row of data){
        await Schools.create({
          name: row?.name,
          number_gudep: row?.numberGudep,
          total_participant: row?.total,
          address: row?.address
        })
      }

      return res.status(201).json({message: "Data berhasil di upload!"})
    } catch (error) {
      return res.status(500).json({ message: error?.message });
    }
  }

  static async updateSchools(req, res) {
    try {
      const { name, noGudep, total, address } = req.body;

      if (req.files == null) {
        await Schools.update(
          {
            name: name,
            number_gudep: noGudep,
            total_participant: total,
            address: address,
          },
          {
            where: {
              id_school: req.params.id,
            },
          }
        );
      } else {
        const file = req.files.file;
        const filesize = file.data.length;
        const ext = path.extname(file.name);
        const filename = Date.now() + ext;
        const filepath = `${req.protocol}://${req.get(
          "host"
        )}/public/schools/${filename}`;
        const allowedType = [".png", ".jpg", ".jpeg"];
        if (!allowedType.includes(ext.toLowerCase()))
          return res.status(400).json({
            error: [
              { path: ["image"], message: "Format gambar tidak di dukung!" },
            ],
          });

        if (filesize > 3000000)
          return res.status(400).json({
            error: [
              {
                path: ["image"],
                message: "Ukuran gambar harus di bawah 3 MB!",
              },
            ],
          });

        file.mv(`public/schools/${filename}`);

        const checkImageSchool = await Schools.findOne({
          where: {
            id_school: req.params.id,
          },
        });

        if (checkImageSchool?.image !== null) {
          fs.unlinkSync(`public/schools/${checkImageSchool.image}`);
        }

        await Schools.update(
          {
            name: name,
            number_gudep: noGudep,
            total_participant: total,
            address: address,
            image: filename,
            path_image: filepath,
          },
          {
            where: {
              id_school: req.params.id,
            },
          }
        );
      }

      return res.status(200).json({ message: "Berhasil" });
    } catch (error) {
      return res.status(500).json({ message: error?.messages });
    }
  }

  static async getSchoolById(req, res) {
    try {
      const { id } = req.params;

      const response = await Schools.findOne({ where: { id_school: id } });

      return res.status(200).json({ response });
    } catch (error) {
      return res.status(500).json({ message: error?.messages });
    }
  }

  static async deleteSchool(req, res) {
    try {
      const { id } = req.params;

      const checkSchool = await Schools.findOne({
        where: {
          id_school: id,
        },
      });

      if (checkSchool?.image !== null) {
        fs.unlinkSync(`public/schools/${checkSchool.image}`);
      }

      await Schools.destroy({
        where: {
          id_school: id,
        },
      });

      return res.status(200).json({ message: "Berhasil" });
    } catch (error) {
      return res.status(500).json({ message: error?.messages });
    }
  }
}

module.exports = SchoolControllers;
