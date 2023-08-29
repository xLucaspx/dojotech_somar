const path = require("node:path");
const fs = require("node:fs");
const Services = require("./Services");

class MidiaServices extends Services {
  constructor() {
    super("Midia");
  }

  async cadastraMidia(idProjeto, midia) {
    try {
      const filePath = `../../public/img/projetos/${idProjeto}/${midia.name}`;
      const fullPath = path.join(__dirname, filePath);

      // excluindo arquivo caso já exista:
      this.deletaMidia(idProjeto, midia.name);

      midia.mv(fullPath);

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

  async deletaMidia(idProjeto, nome) {
    try {
      const midiaPath = path.join(
        __dirname,
        `../../public/img/projetos/${idProjeto}/${nome}`
      );

      if (!fs.existsSync(midiaPath)) return;

      fs.rmSync(midiaPath);
      await this.deletaRegistro({ id_projeto: idProjeto, nome });
    } catch (error) {
      throw error;
    }
  }

  async deletaMidias(idProjeto) {
    try {
      const dirPath = path.join(
        __dirname,
        `../../public/img/projetos/${idProjeto}`
      );

      if (!fs.existsSync(dirPath)) return;

      fs.rmSync(dirPath, { recursive: true, force: true });
      await this.deletaRegistro({ id_projeto: idProjeto });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = MidiaServices;
