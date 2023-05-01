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
      console.log(error);
      throw new Error(error.response?.data?.message || error.message);
    }
  }

  async cadastra(dados) {
    try {
      return await axios.post(this.url, dados);
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  }
}
