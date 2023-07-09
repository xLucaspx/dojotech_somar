const path = require("node:path");
const fs = require("node:fs");
const Services = require("./Services");
const { ConflictError } = require("../errors");

class MidiaServices extends Services {
  constructor() {
    super("Midia");
  }

  async cadastraMidia(idProjeto, midia) {
    try {
      const filePath = path.join(__dirname, `../../public/img/projetos/${idProjeto}/${midia.name}`);

      if (fs.existsSync(filePath)) {
        throw new ConflictError(
          `Erro ao cadastrar arquivo ${midia.name}:\nEste arquivo já existe no diretório do projeto!`
        );
      }
      midia.mv(path.join(filePath));

      return await this.criaRegistro({
        id_projeto: idProjeto,
        nome: midia.name,
        tipo: midia.mimetype,
        url: filePath,
        alt: "",
      });
    } catch (error) {
      throw error;
    }
  }

  async deletaMidias(idProjeto) {
    try {
      const filePath = path.join(__dirname, `../../public/img/projetos/${idProjeto}`);

      if (fs.existsSync(filePath)) fs.rmSync(filePath, { recursive: true, force: true });

      await this.deletaRegistro({ id_projeto: idProjeto });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = MidiaServices;
