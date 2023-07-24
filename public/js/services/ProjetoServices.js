import { Services } from "./Services.js";

export class ProjetoServices extends Services {
  constructor() {
    super("projetos/");
  }

  async cadastraMidias(idProjeto, data) {
    const url = this.url + `${idProjeto}/midias`;

    try {
      // await this.cadastra(data, url);
      return await axios.post(url, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  }

  async filtraProjetos(query) {
    const filtro = Object.keys(query)[0];
    const url = this.url + `filtro?${filtro}=${query[filtro]}`;

    try {
      const projetos = await axios.get(url);
      return projetos.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  }

  async buscaPorUsuario(idUsuario) {
    const url = this.url + `usuario?idUsuario=${idUsuario}`;

    try {
      return await this.buscaDados(url);
    } catch (error) {
      throw error;
    }
  }
}
