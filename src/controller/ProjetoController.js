const { ValidationError } = require("sequelize");
const { ProjetoServices } = require("../services");

const projetoServices = new ProjetoServices();

class ProjetoController {
  static async buscaProjetos(req, res) {
    try {
      const projetos = await projetoServices.buscaRegistros();
      return res.status(200).json(projetos);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async cadastraProjeto(req, res) {
    const { projeto, ods } = req.body;

    try {
      const projetoCadastrado = await projetoServices.criaRegistro(projeto);
      ods.forEach(async (ods) => await projetoCadastrado.addOds(ods));
      return res.status(201).json(projetoCadastrado);
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).json({
          message:
            "Por favor, verifique se os campos estão preenchidos corretamente!",
        });
      }
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = ProjetoController;
