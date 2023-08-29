const { OdsServices } = require("../services");

const odsServices = new OdsServices();

class OdsController {
  static async buscaOds(req, res) {
    try {
      const ods = await odsServices.buscaRegistros();
      return res.status(200).json(ods);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = OdsController;
