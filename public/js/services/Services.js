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
      if (error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw error;
      }
    }
  }

  async cadastra(dados) {
    try {
      return await axios.post(this.url, dados);
    } catch (error) {
      if (error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw error;
      }
    }
  }
}
