const Activities = require("../models/Activities");
const Contributions = require("../models/Contributions");
const ImagesContribution = require("../models/Images");

class ImageController {
  static async getContributionImage(req, res) {
    try {
      const response = await ImagesContribution.findAll({
        include: [
          {
            model: Contributions,
            as: "contributions",
            foreignKey: "contribution_id",
            include: [
              {
                model: Activities,
                as: "activity",
                foreignKey: "activity_id",
              },
            ],
          },
        ],
        limit: 5,
        order: [["createdAt", "DESC"]],
      });

      return res.status(200).json({ response });
    } catch (error) {
      return res.status(500).json({ message: error?.message });
    }
  }
}

module.exports = ImageController;
