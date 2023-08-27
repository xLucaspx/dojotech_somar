const { ProjetoServices, MidiaServices } = require("../services");
const { BadRequestError, UnauthorizedError } = require("../errors");
const { Op } = require("sequelize");
const verificaJwt = require("../utils/token/verificaJwt");

const projetoServices = new ProjetoServices();
const midiaServices = new MidiaServices();

class ProjetoController {
  static async buscaProjetos(req, res) {
    try {
      const projetos = await projetoServices.buscaRegistros();
      return res.status(200).json(projetos);
    } catch (error) {
      return res.status(error.status || 500).json({ error: error.message });
    }
  }

  static async buscaProjetoPorId(req, res) {
    const { id } = req.params;

    try {
      const projeto = await projetoServices.buscaProjetoPorId(id);
      return res.status(200).json(projeto);
    } catch (error) {
      return res.status(error.status || 500).json({ error: error.message });
    }
  }

  static async buscaProjetosPorUsuario(req, res) {
    const { idUsuario } = req.query;

    try {
      const token = verificaJwt(req.headers.authorization);

      if (!token)
        throw new BadRequestError(
          "Não é possível listar projetos de um usuário sem um token de autorização!"
        );
      if (idUsuario != token.id)
        throw new UnauthorizedError(
          "Não é possível listar projetos de outros usuários!"
        );

      const projetos = await projetoServices.buscaRegistros({
        id_usuario: idUsuario,
      });
      return res.status(200).json(projetos);
    } catch (error) {
      return res.status(error.status || 500).json({ error: error.message });
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
      return res.status(error.status || 500).json({ error: error.message });
    }
  }

  static async cadastraProjeto(req, res) {
    const { projeto, ods } = req.body;

    try {
      const token = verificaJwt(req.headers.authorization);

      if (!token)
        throw new BadRequestError(
          "Não é possível cadastrar um projeto sem um token de autorização!"
        );
      if (!projeto.id_usuario)
        throw new BadRequestError(
          "Não é possível cadastrar um projeto sem id de usuário!"
        );
      if (projeto.id_usuario != token.id)
        throw new UnauthorizedError(
          "Não é possível cadastrar um projeto para outros usuários!"
        );
      if (!ods || !Array.isArray(ods) || ods.length === 0)
        throw new BadRequestError(
          "Não é possível cadastrar um projeto sem nenhum ODS!"
        );

      const projetoCadastrado = await projetoServices.cadastraProjeto(projeto);
      ods.forEach(async (ods) => await projetoCadastrado.addOds(ods));

      return res.status(201).json(projetoCadastrado);
    } catch (error) {
      return res.status(error.status || 500).json({ error: error.message });
    }
  }

  static async cadastraMidias(req, res) {
    const { idProjeto } = req.params;

    try {
      const token = verificaJwt(req.headers.authorization);

      if (!token)
        throw new BadRequestError(
          "Não é possível cadastrar mídias em um projeto sem um token de autorização!"
        );

      const { id_usuario } = await projetoServices.buscaProjetoPorId(idProjeto);

      if (id_usuario != token.id)
        throw new UnauthorizedError(
          "Não é possível cadastrar mídias no projeto de outros usuários!"
        );

      if (!req.files || req.files.length == 0)
        throw new BadRequestError(
          "Não foram encontradas mídias para serem cadastradas!"
        );

      for await (const key of Object.keys(req.files)) {
        await midiaServices.cadastraMidia(idProjeto, req.files[key]);
      }

      return res.status(204).json({});
    } catch (error) {
      return res.status(error.status || 500).json({ error: error.message });
    }
  }

  static async atualizaProjeto(req, res) {
    const { id } = req.params;
    const { projeto, ods } = req.body;

    try {
      const token = verificaJwt(req.headers.authorization);

      if (!token)
        throw new BadRequestError(
          "Não é possível editar um projeto sem um token de autorização!"
        );
      if (!ods || !Array.isArray(ods) || ods.length === 0)
        throw new BadRequestError(
          "Não é possível editar um projeto sem nenhum ODS!"
        );

      const projetoAtualizado = await projetoServices.atualizaProjeto(
        projeto,
        ods,
        id,
        token.id
      );
      // mídias são deletadas para serem recadastradas:
      await midiaServices.deletaMidias(id);

      return res.status(200).json(projetoAtualizado);
    } catch (error) {
      return res.status(error.status || 500).json({ error: error.message });
    }
  }

  static async deletaProjeto(req, res) {
    const { id } = req.params;

    try {
      const token = verificaJwt(req.headers.authorization);

      if (!token)
        throw new BadRequestError(
          "Não é possível excluir um projeto sem um token de autorização!"
        );

      await projetoServices.deletaProjeto(id, token.id);
      await midiaServices.deletaMidias(id);

      return res.status(204).json({});
    } catch (error) {
      return res.status(error.status || 500).json({ error: error.message });
    }
  }

  static async geraRelatorio(req, res) {
    try {
      if (!verificaJwt(req.headers.authorization))
        throw new BadRequestError(
          "Não é possível gerar um relatório de projetos sem um token de autorização!"
        );

      await projetoServices.criaRelatorioProjetos();
      return res.status(204).json({});
    } catch (error) {
      return res.status(error.status || 500).json({ error: error.message });
    }
  }
}

module.exports = ProjetoController;
