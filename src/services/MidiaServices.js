const Services = require("./Services");
const fs = require("fs");
const path = require("path");

class MidiaServices extends Services {
  constructor() {
    super("Midia");
  }

  async cadastraMidia(idProjeto, midia) {
    try {
      const filePath = `../../img/projetos/${idProjeto}/${midia.name}`;
      midia.mv(path.join(__dirname, filePath));

      return await this.criaRegistro({
        id_projeto: idProjeto,
        nome: midia.name,
        url: filePath,
        alt: "",
      });
    } catch (error) { 
      throw error;
    }
  }
}

module.exports = MidiaServices;
