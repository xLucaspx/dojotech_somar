import "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";

export class Services {
  constructor(url) {
    this.url = `http://localhost:3000/${url}`;
  }

  async buscaDados() {
    try {
      const dados = await axios.get(this.url);
      return dados.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  }

  async buscaPorId(id) {
    try {
      const dados = await axios.get(this.url + id);
      return dados.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  }

  async cadastra(dados, url = this.url) {
    try {
      const cadastro = await axios.post(url, dados);
      return cadastro.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  }
}
