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
      let filePath = `../../public/img/projetos/${idProjeto}/${midia.name}`;

      if (fs.existsSync(filePath)) {
        throw new ConflictError(
          `Erro ao cadastrar arquivo ${midia.name}:\nEste arquivo já existe no diretório do projeto!`
        );
      }
      midia.mv(path.join(__dirname, filePath));

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
}

module.exports = MidiaServices;
