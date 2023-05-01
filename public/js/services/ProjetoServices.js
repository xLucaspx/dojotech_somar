import { Services } from "./Services.js";

export class ProjetoServices extends Services {
  constructor() {
    super("projetos/");
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
}
