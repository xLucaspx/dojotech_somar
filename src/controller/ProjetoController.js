const { Op, ValidationError } = require("sequelize");
const { ProjetoServices, MidiaServices } = require("../services");
const { NotFoundError, ConflictError } = require("../errors");

const projetoServices = new ProjetoServices();
const midiaServices = new MidiaServices();

class ProjetoController {
  static async buscaProjetos(req, res) {
    try {
      const projetos = await projetoServices.buscaRegistros();
      return res.status(200).json(projetos);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async buscaProjetoPorId(req, res) {
    const { id } = req.params;

    try {
      const projeto = await projetoServices.buscaProjetoPorId(id);
      return res.status(200).json(projeto);
    } catch (error) {
      return res
        .status(error instanceof NotFoundError ? 404 : 500)
        .json({ message: error.message });
    }
  }

  static async buscaProjetosPorUsuario(req, res) {
    const { idUsuario } = req.query;

    try {
      const projetos = await projetoServices.buscaRegistros({
        id_usuario: idUsuario,
      });
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
        projetos = await projetoServices.buscaRegistros({
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

  static async cadastraMidias(req, res) {
    const { idProjeto } = req.body;

    try {
      for await (const key of Object.keys(req.files)) {
        await midiaServices.cadastraMidia(idProjeto, req.files[key]);
      }

      return res.status(204).json({});
    } catch (error) {
      return res
        .status(error instanceof ConflictError ? 409 : 500)
        .json({ message: error.message });
    }
  }

  static async atualizaProjeto(req, res) {
    const { id } = req.params;
    const { projeto, ods } = req.body;

    try {
      // mídias são excluídas para serem re-cadastradas:
      await midiaServices.deletaMidias(id);
      await projetoServices.atualizaProjeto(projeto, id);
      await projetoServices.atualizaOds(id, ods);

      return res.status(200).json({ id });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async deletaProjeto(req, res) {
    const { id } = req.params;

    try {
      await midiaServices.deletaMidias(id);
      await projetoServices.deletaProjeto(id);

      return res.status(204).json({});
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = ProjetoController;
