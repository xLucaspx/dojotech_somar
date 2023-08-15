export class Controller {
  baseUrl = "http://localhost:3000";

  constructor(resource) {
    this.url = this.baseUrl + resource;
  }

  async buscaDados(token = "") {
    try {
      const res = await fetch(this.url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      return await res.json();
    } catch (error) {
      console.error(error);
    }
  }

  async buscaPorId(id, token = "") {
    try {
      const res = await fetch(`${this.url}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      return await res.json();
    } catch (error) {
      console.log("deu pau aqui mano");
      alert(`Erro ao buscar dados:\n${error.message}`);
    }
  }
}
