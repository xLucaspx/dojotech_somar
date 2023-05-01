const { Op, ValidationError } = require("sequelize");
const { ProjetoServices } = require("../services");

const projetoServices = new ProjetoServices();

class ProjetoController {
  static async buscaProjetos(req, res) {
    try {
      const projetos = await projetoServices.buscaProjetosComOds();
      return res.status(200).json(projetos);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async buscaProjetosComFiltro(req, res) {
    const query = req.query;
    const filtro = Object.keys(query)[0];
    let projetos;

    try {
      if (filtro === "ods") {
        // busca o projeto pelo id - nome da ODS
        projetos = await projetoServices.buscaProjetosPorOds(query[filtro]);
      } else {
        // select padrão SQL onde [filtro] é o nome da coluna onde se quer aplicar o where
        projetos = await projetoServices.buscaProjetosComOds({
          [filtro]: { [Op.like]: `%${query[filtro]}%` },
        });
      }
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
