import "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";

export class Services {
  constructor(url) {
    this.url = `http://localhost:3000/${url}`;
  }

  async cadastra(dados) {
    try {
      return await axios.post(this.url, dados);
    } catch (error) {
      console.log({ error });
      throw new Error(error.response.data.message);
    }
  }
}
